export type EventType = 'teambuilding' | 'incentive' | 'conference' | 'workshop' | 'retreat'

export interface Office {
  id: string
  cityId: string
  cityName: string
  countryCode: string
  participantCount: number
}

export interface Project {
  id: string
  userId: string
  name: string
  eventType: EventType
  dateRangeStart: string
  dateRangeEnd: string
  offices: Office[]
  status: 'draft' | 'processing' | 'completed' | 'paid'
  totalParticipants: number
  createdAt: string
  updatedAt: string
}
