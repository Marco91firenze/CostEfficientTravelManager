import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepIndicator } from '../components/wizard/StepIndicator'
import { EventDetailsStep } from '../components/wizard/EventDetailsStep'
import { OfficeMapStep } from '../components/wizard/OfficeMapStep'
import { ProcessingStep } from '../components/wizard/ProcessingStep'
import { Card } from '../components/ui/Card'
import { runOptimization } from '../engine/optimizer'
import { CITIES } from '../engine/cities'
import type { EventType, Office } from '../types/project'
import type { CandidateCity } from '../types/city'
import type { OptimizationResult } from '../types/results'

const STEPS = ['Event Details', 'Office Mapping', 'Processing']

let nextId = 1
function genId() {
  return `office-${nextId++}`
}

export function NewProjectPage() {
  const navigate = useNavigate()
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

  // Estimate total combinations for the animation
  const candidateCount = CITIES.length - offices.filter((o) => o.cityId).length
  const dateCount = dateStart && dateEnd
    ? Math.max(1, Math.floor((new Date(dateEnd).getTime() - new Date(dateStart).getTime()) / (1000 * 60 * 60 * 24)) + 1)
    : 1
  const totalCombinations = candidateCount * dateCount * offices.filter((o) => o.cityId).length

  const handleProcessingComplete = useCallback(() => {
    const projectId = `proj-${Date.now()}`
    const result: OptimizationResult = runOptimization(
      projectId,
      offices.filter((o) => o.cityId),
      dateStart,
      dateEnd
    )

    // Store result in sessionStorage for the results page
    sessionStorage.setItem(`result-${projectId}`, JSON.stringify(result))
    sessionStorage.setItem(`project-${projectId}`, JSON.stringify({
      id: projectId,
      name,
      eventType,
      dateRangeStart: dateStart,
      dateRangeEnd: dateEnd,
      offices: offices.filter((o) => o.cityId),
      status: 'completed',
      totalParticipants: offices.reduce((s, o) => s + o.participantCount, 0),
      travelBudget,
    }))

    navigate(`/app/projects/${projectId}`)
  }, [offices, dateStart, dateEnd, name, eventType, travelBudget, navigate])

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
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <ProcessingStep
            totalCombinations={totalCombinations}
            onComplete={handleProcessingComplete}
          />
        )}
      </Card>
    </div>
  )
}
