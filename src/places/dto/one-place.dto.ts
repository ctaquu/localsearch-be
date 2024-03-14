import { OpeningHours } from '../entities/opening-hours.entity'

export class OnePlaceDto {
  id: string
  name: string
  address: string
  website: string[]
  phoneNumber: string[]
  openingHours: OpeningHours
}
