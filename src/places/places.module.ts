import { Module } from '@nestjs/common'
import { PlacesService } from './places.service'
import { PlacesController } from './places.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
