import { Test, TestingModule } from '@nestjs/testing'
import { PlacesService } from './places.service'
import { HttpModule, HttpService } from '@nestjs/axios'
import { of } from 'rxjs'

describe('PlacesService', () => {
  let service: PlacesService
  let httpService: HttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PlacesService],
    }).compile()

    service = module.get<PlacesService>(PlacesService)
    httpService = module.get<HttpService>(HttpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should handle getPlaces', async () => {
    service.getPlaces = jest.fn().mockResolvedValue('dummy data')

    const result = await service.getPlaces()

    expect(result).toEqual('dummy data')
  })

  it('should handle fetchAndParseOnePlace', async () => {
    const data = {
      local_entry_id: 'mock value',
      displayed_what: 'mock value',
      displayed_where: 'mock value',
      addresses: [],
      opening_hours: {
        days: {
          monday: [
            {
              start: 'mock value',
              end: 'mock value',
            },
          ],
        },
      },
    }
    const response = {
      data,
      headers: {},
      config: { url: 'http://localhost:3000/someUrl' },
      status: 200,
      statusText: 'OK',
    }
    httpService.get = jest.fn().mockImplementationOnce(() => of(response))

    const result = await service.fetchAndParseOnePlace('dummy_id')

    expect(result).toEqual({
      address: 'mock value',
      id: 'mock value',
      name: 'mock value',
      openingHours: {
        monday: [{ start: 'mock value', end: 'mock value' }],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
      phoneNumber: [],
      website: [],
    })
  })

  it('should handle fetchAndParseOnePlace fail and throw error', async () => {
    const err = new Error('error991')
    httpService.get = jest.fn().mockImplementation(() => {
      throw err
    })

    await expect(service.fetchAndParseOnePlace('dummy_id')).rejects.toThrow(err)
  })
})
