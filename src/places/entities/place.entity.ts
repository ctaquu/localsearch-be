import { OpeningHours } from './opening-hours.entity'

export class Place {
  id: string
  name: string
  address: string
  website: string[]
  phoneNumber: string[]
  openingHours: OpeningHours

  constructor(
    id: string,
    name: string,
    address: string,
    openingHours: OpeningHours = OpeningHours.defaultOpeningHours(),
    website: string[] = [],
    phoneNumber: string[] = [],
  ) {
    this.id = id
    this.name = name
    this.address = address
    this.website = website
    this.phoneNumber = phoneNumber
    this.openingHours = openingHours
  }
}
