import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'

interface StepIndicatorProps {
  currentStep: number
  steps: string[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((label, index) => {
        const stepNum = index + 1
        const isComplete = stepNum < currentStep
        const isCurrent = stepNum === currentStep

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                  isComplete && 'bg-blue-600 text-white',
                  isCurrent && 'bg-blue-600 text-white ring-4 ring-blue-100',
                  !isComplete && !isCurrent && 'bg-slate-200 text-slate-500'
                )}
              >
                {isComplete ? <Check className="h-5 w-5" /> : stepNum}
              </div>
              <span
                className={cn(
                  'text-xs mt-1.5 font-medium',
                  isCurrent ? 'text-blue-600' : 'text-slate-500'
                )}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-16 sm:w-24 h-0.5 mx-2 mb-5',
                  isComplete ? 'bg-blue-600' : 'bg-slate-200'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
