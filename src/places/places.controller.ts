import { Controller, Get, Param, Query } from '@nestjs/common'
import { PlacesService } from './places.service'
import { Place } from './entities/place.entity'
import { ListPlaceDto } from './dto/list-place.dto'
import { OnePlaceDto } from './dto/one-place.dto'

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('search')
  async search(@Query('str') searchString: string): Promise<ListPlaceDto[]> {
    return (await this.placesService.search(searchString)).map(
      (place: Place) => {
        const createPlaceDto = new ListPlaceDto()
        createPlaceDto.id = place.id
        createPlaceDto.name = place.name
        createPlaceDto.address = place.address
        return createPlaceDto
      },
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OnePlaceDto> {
    const place: Place = await this.placesService.getOne(id)
    return {
      id: place.id,
      name: place.name,
      address: place.address,
      website: place.website,
      phoneNumber: place.phoneNumber,
      openingHours: place.openingHours,
    }
  }
}
