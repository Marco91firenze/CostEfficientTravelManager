import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepIndicator } from '../components/wizard/StepIndicator'
import { EventDetailsStep } from '../components/wizard/EventDetailsStep'
import { OfficeMapStep } from '../components/wizard/OfficeMapStep'
import { ProcessingStep } from '../components/wizard/ProcessingStep'
import { Card } from '../components/ui/Card'
import { CITIES } from '../engine/cities'
import { isAmadeusConfigured } from '../lib/amadeus'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { EventType, Office } from '../types/project'
import type { CandidateCity } from '../types/city'

const STEPS = ['Event Details', 'Office Mapping', 'Processing']

let nextId = 1
function genId() {
  return `office-${nextId++}`
}

export function NewProjectPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [step, setStep] = useState(1)

  // Step 1 state
  const [name, setName] = useState('')
  const [eventType, setEventType] = useState<EventType>('teambuilding')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [travelBudget, setTravelBudget] = useState(0)

  // Step 2 state
  const [offices, setOffices] = useState<Office[]>([
    { id: genId(), cityId: '', cityName: '', countryCode: '', participantCount: 0 },
    { id: genId(), cityId: '', cityName: '', countryCode: '', participantCount: 0 },
  ])

  // Step 3 state
  const [completedRoutes, setCompletedRoutes] = useState(0)
  const [totalRoutes, setTotalRoutes] = useState(0)
  const [currentCity, setCurrentCity] = useState('')
  const [processingStatus, setProcessingStatus] = useState<'searching' | 'complete' | 'error'>('searching')
  const [processingError, setProcessingError] = useState('')
  const optimizationStarted = useRef(false)

  const addOffice = () => {
    setOffices((prev) => [
      ...prev,
      { id: genId(), cityId: '', cityName: '', countryCode: '', participantCount: 0 },
    ])
  }

  const removeOffice = (id: string) => {
    setOffices((prev) => prev.filter((o) => o.id !== id))
  }

  const updateOffice = (id: string, updates: Partial<Office>) => {
    setOffices((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)))
  }

  const handleCitySelect = (officeId: string, city: CandidateCity) => {
    updateOffice(officeId, {
      cityId: city.id,
      cityName: city.name,
      countryCode: city.countryCode,
    })
  }

  const validOffices = offices.filter((o) => o.cityId)
  const candidateCount = CITIES.length - validOffices.length
  const estimatedRoutes = candidateCount * validOffices.length

  // Run optimization when step 3 is reached
  useEffect(() => {
    if (step !== 3 || optimizationStarted.current) return
    optimizationStarted.current = true

    if (!isAmadeusConfigured()) {
      setProcessingStatus('error')
      setProcessingError('Flight search proxy not configured. Start the proxy server with: npm run dev:proxy')
      return
    }

    setTotalRoutes(estimatedRoutes)

    const run = async () => {
      try {
        const { runOptimization } = await import('../engine/optimizer')
        const result = await runOptimization(
          `proj-${Date.now()}`,
          validOffices,
          dateStart,
          dateEnd,
          travelBudget,
          (completed, total, city) => {
            setCompletedRoutes(completed)
            setTotalRoutes(total)
            setCurrentCity(city)
          }
        )

        setProcessingStatus('complete')

        const savingsVsBudget = Math.max(0, travelBudget - result.totalCost)

        // Persist to Supabase if user logged in
        if (user) {
          await supabase.from('projects').insert({
            id: result.projectId,
            user_id: user.id,
            name,
            event_type: eventType,
            date_start: dateStart,
            date_end: dateEnd,
            travel_budget: travelBudget,
            offices: validOffices,
            status: 'completed',
          })
          await supabase.from('results').insert({
            id: result.projectId,
            data: result,
            savings_vs_budget: savingsVsBudget,
            is_paid: false,
          })
        }

        // Also keep sessionStorage as local fallback
        sessionStorage.setItem(`result-${result.projectId}`, JSON.stringify(result))
        sessionStorage.setItem(`project-${result.projectId}`, JSON.stringify({
          id: result.projectId,
          name,
          eventType,
          dateRangeStart: dateStart,
          dateRangeEnd: dateEnd,
          offices: validOffices,
          status: 'completed',
          totalParticipants: validOffices.reduce((s, o) => s + o.participantCount, 0),
          travelBudget,
        }))

        setTimeout(() => navigate(`/app/projects/${result.projectId}`), 800)
      } catch (err) {
        setProcessingStatus('error')
        setProcessingError(err instanceof Error ? err.message : 'An unexpected error occurred')
      }
    }

    run()
  }, [step, dateStart, dateEnd, estimatedRoutes, eventType, name, navigate, travelBudget, user, validOffices])

  return (
    <div>
      <Card className="p-6 sm:p-8">
        <StepIndicator currentStep={step} steps={STEPS} />

        {step === 1 && (
          <EventDetailsStep
            name={name}
            eventType={eventType}
            dateStart={dateStart}
            dateEnd={dateEnd}
            travelBudget={travelBudget}
            onNameChange={setName}
            onEventTypeChange={setEventType}
            onDateStartChange={setDateStart}
            onDateEndChange={setDateEnd}
            onTravelBudgetChange={setTravelBudget}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <OfficeMapStep
            offices={offices}
            onAddOffice={addOffice}
            onRemoveOffice={removeOffice}
            onUpdateOffice={updateOffice}
            onCitySelect={handleCitySelect}
            onNext={() => {
              optimizationStarted.current = false
              setCompletedRoutes(0)
              setProcessingStatus('searching')
              setProcessingError('')
              setStep(3)
            }}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <ProcessingStep
            completedRoutes={completedRoutes}
            totalRoutes={totalRoutes}
            currentCity={currentCity}
            status={processingStatus}
            error={processingError}
          />
        )}
      </Card>
    </div>
  )
}
