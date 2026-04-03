import { Plus, Trash2, Users } from 'lucide-react'
import { Button } from '../ui/Button'
import { CityAutocomplete } from './CityAutocomplete'
import type { Office } from '../../types/project'
import type { CandidateCity } from '../../types/city'

interface OfficeMapStepProps {
  offices: Office[]
  onAddOffice: () => void
  onRemoveOffice: (id: string) => void
  onUpdateOffice: (id: string, updates: Partial<Office>) => void
  onCitySelect: (officeId: string, city: CandidateCity) => void
  onNext: () => void
  onBack: () => void
}

export function OfficeMapStep({
  offices,
  onAddOffice,
  onRemoveOffice,
  onUpdateOffice,
  onCitySelect,
  onNext,
  onBack,
}: OfficeMapStepProps) {
  const totalParticipants = offices.reduce((sum, o) => sum + o.participantCount, 0)
  const allValid = offices.every(o => o.cityId && o.participantCount > 0)
  const canProceed = offices.length >= 2 && allValid
  const usedCityIds = offices.map(o => o.cityId).filter(Boolean)

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Office Mapping</h2>
      <p className="text-slate-600 mb-6">
        Add every office your participants will travel from. Minimum 2 offices required.
      </p>

      <div className="space-y-3 mb-4">
        {offices.map((office) => (
          <div
            key={office.id}
            className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200"
          >
            <div className="flex-1">
              <CityAutocomplete
                value={office.cityName}
                onSelect={(city) => onCitySelect(office.id, city)}
                placeholder="Select origin city"
                excludeIds={usedCityIds.filter(id => id !== office.cityId)}
              />
            </div>
            <div className="w-32">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  min={1}
                  placeholder="# people"
                  className="w-full px-2 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={office.participantCount || ''}
                  onChange={(e) =>
                    onUpdateOffice(office.id, {
                      participantCount: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <button
              onClick={() => onRemoveOffice(office.id)}
              className="text-slate-400 hover:text-red-500 transition-colors p-1"
              disabled={offices.length <= 2}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={onAddOffice} className="mb-6">
        <Plus className="h-4 w-4 mr-1" />
        Add Another Office
      </Button>

      <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center justify-between">
        <span className="text-sm text-blue-800 font-medium">Total Participants</span>
        <span className="text-2xl font-bold text-blue-900">{totalParticipants}</span>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1" size="lg">
          Back
        </Button>
        <Button onClick={onNext} disabled={!canProceed} className="flex-1" size="lg">
          Analyze Routes
        </Button>
      </div>

      {!canProceed && offices.length < 2 && (
        <p className="text-sm text-amber-600 mt-2 text-center">
          Add at least 2 offices to continue.
        </p>
      )}
    </div>
  )
}
