import { Injectable } from '@nestjs/common'
import { Place } from './entities/place.entity'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom } from 'rxjs'
import { OpeningHours } from './entities/opening-hours.entity'
import { WorkingHours } from './entities/working-hours.entity'

// hardcode is God mode!!
const externalResourceBaseURL =
  'https://storage.googleapis.com/coding-session-rest-api'
const externalResourceIDs = ['GXvPAor1ifNfpF0U5PTG0w', 'ohGSnJtMIC5nPfYRi_HTAg']

@Injectable()
export class PlacesService {
  places: Array<Place>

  constructor(private readonly httpService: HttpService) {}

  /**
   * @description Returns the list of parsed places
   * @private
   */
  async getPlaces(): Promise<Array<Place>> {
    if (!this.places) {
      this.places = []

      await Promise.all(
        externalResourceIDs.map(async (id: string) => {
          try {
            this.places.push(await this.fetchAndParseOnePlace(id))
          } catch (e) {
            // todo: log error
          }
        }),
      )
    }
    return this.places
  }

  /**
   * @description Fetches and parses a single place
   * @param id
   * @private
   */
  async fetchAndParseOnePlace(id: string): Promise<Place> {
    const {
      data,
    }: {
      data: {
        local_entry_id: string
        displayed_what: string
        displayed_where: string
        addresses: Array<any>
        opening_hours: { days: OpeningHours }
      }
    } = await firstValueFrom(
      this.httpService.get(`${externalResourceBaseURL}/${id}`).pipe(
        catchError((e) => {
          return Promise.reject(e.toString())
        }),
      ),
    )

    const aPlace = new Place(
      data.local_entry_id,
      data.displayed_what,
      data.displayed_where,
    )

    data.addresses.forEach((businessAddress: { contacts: Array<any> }) => {
      businessAddress.contacts.forEach(
        (contact: { contact_type: string; formatted_service_code: string }) => {
          if (contact.contact_type === 'phone') {
            aPlace.phoneNumber.push(contact.formatted_service_code)
          }
          if (contact.contact_type === 'url') {
            aPlace.website.push(contact.formatted_service_code)
          }
        },
      )
    })

    Object.entries(data.opening_hours.days).forEach(
      ([day, workingHours]: [string, Array<WorkingHours>]) => {
        aPlace.openingHours[day] = workingHours.map((wh) => {
          return { start: wh.start, end: wh.end }
        })
      },
    )

    return aPlace
  }

  /**
   * @description Returns the list of places that match the search string
   * @param {string} searchString
   */
  async search(searchString: string): Promise<Array<Place>> {
    if (!searchString) return []
    return (await this.getPlaces()).filter(
      (place: Place) =>
        place.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1,
    )
  }

  /**
   * @description Returns a single place by its id
   * @param id
   */
  async getOne(id: string): Promise<Place> {
    return (await this.getPlaces()).find((place: Place) => place.id === id)
  }
}
