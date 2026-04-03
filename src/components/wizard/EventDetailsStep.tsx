import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import type { EventType } from '../../types/project'

interface EventDetailsStepProps {
  name: string
  eventType: EventType
  dateStart: string
  dateEnd: string
  onNameChange: (v: string) => void
  onEventTypeChange: (v: EventType) => void
  onDateStartChange: (v: string) => void
  onDateEndChange: (v: string) => void
  onNext: () => void
}

const eventTypeOptions = [
  { value: 'teambuilding', label: 'Team Building' },
  { value: 'incentive', label: 'Incentive Trip' },
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'retreat', label: 'Company Retreat' },
]

export function EventDetailsStep({
  name,
  eventType,
  dateStart,
  dateEnd,
  onNameChange,
  onEventTypeChange,
  onDateStartChange,
  onDateEndChange,
  onNext,
}: EventDetailsStepProps) {
  const canProceed = name.trim() && dateStart && dateEnd && dateEnd >= dateStart

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Event Details</h2>
      <p className="text-slate-600 mb-6">Tell us about your upcoming corporate event.</p>

      <div className="space-y-4">
        <Input
          id="projectName"
          label="Project / Event Name"
          placeholder="e.g. Q3 European Sales Kickoff"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />

        <Select
          id="eventType"
          label="Event Type"
          options={eventTypeOptions}
          value={eventType}
          onChange={(e) => onEventTypeChange(e.target.value as EventType)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="dateStart"
            label="Earliest Date"
            type="date"
            value={dateStart}
            onChange={(e) => onDateStartChange(e.target.value)}
          />
          <Input
            id="dateEnd"
            label="Latest Date"
            type="date"
            value={dateEnd}
            onChange={(e) => onDateEndChange(e.target.value)}
          />
        </div>

        <p className="text-xs text-slate-500">
          We'll evaluate every date in this range to find the cheapest travel day.
        </p>

        <div className="pt-4">
          <Button onClick={onNext} disabled={!canProceed} className="w-full" size="lg">
            Next: Map Your Offices
          </Button>
        </div>
      </div>
    </div>
  )
}
