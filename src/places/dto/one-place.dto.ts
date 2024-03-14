import { OpeningHours } from '../entities/opening-hours.entity'

export class OnePlaceDto {
  id: string
  name: string
  address: string
  websites: string[]
  phoneNumbers: string[]
  openingHours: OpeningHours
}
