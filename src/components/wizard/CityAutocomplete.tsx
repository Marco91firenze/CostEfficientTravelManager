import { useState, useRef, useEffect } from 'react'
import { searchCities } from '../../engine/cities'
import type { CandidateCity } from '../../types/city'

interface CityAutocompleteProps {
  value: string
  onSelect: (city: CandidateCity) => void
  placeholder?: string
  excludeIds?: string[]
}

export function CityAutocomplete({ value, onSelect, placeholder = 'Search city...', excludeIds = [] }: CityAutocompleteProps) {
  const [query, setQuery] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<CandidateCity[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (q: string) => {
    setQuery(q)
    const filtered = searchCities(q).filter(c => !excludeIds.includes(c.id))
    setResults(filtered.slice(0, 8))
    setIsOpen(q.length > 0)
  }

  const handleSelect = (city: CandidateCity) => {
    setQuery(city.name)
    setIsOpen(false)
    onSelect(city)
  }

  const handleBlur = () => {
    // Delay so dropdown click fires before we auto-select
    setTimeout(() => {
      if (results.length === 0) return
      const q = query.trim().toLowerCase()
      const exact = results.find(c => c.name.toLowerCase() === q)
      if (exact) {
        handleSelect(exact)
      } else if (results.length === 1) {
        handleSelect(results[0])
      }
    }, 150)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => {
          if (query.length > 0) {
            handleChange(query)
          }
        }}
        onBlur={handleBlur}
      />
      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {results.map((city) => (
            <li
              key={city.id}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center justify-between"
              onClick={() => handleSelect(city)}
            >
              <span className="text-sm text-slate-900">
                {city.name}, {city.country}
              </span>
              <span className="text-xs text-slate-400">{city.airportCode}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
