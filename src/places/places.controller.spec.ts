import { Test, TestingModule } from '@nestjs/testing'
import { PlacesController } from './places.controller'
import { PlacesService } from './places.service'
import { HttpModule } from '@nestjs/axios'

describe('PlacesController', () => {
  let controller: PlacesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PlacesController],
      providers: [PlacesService],
    }).compile()

    controller = module.get<PlacesController>(PlacesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
