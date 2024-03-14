import { WorkingHours } from './working-hours.entity'

export class OpeningHours {
  monday: Array<WorkingHours>
  tuesday: Array<WorkingHours>
  wednesday: Array<WorkingHours>
  thursday: Array<WorkingHours>
  friday: Array<WorkingHours>
  saturday: Array<WorkingHours>
  sunday: Array<WorkingHours>

  constructor(
    monday: Array<WorkingHours>,
    tuesday: Array<WorkingHours>,
    wednesday: Array<WorkingHours>,
    thursday: Array<WorkingHours>,
    friday: Array<WorkingHours>,
    saturday: Array<WorkingHours>,
    sunday: Array<WorkingHours>,
  ) {
    this.monday = monday
    this.tuesday = tuesday
    this.wednesday = wednesday
    this.thursday = thursday
    this.friday = friday
    this.saturday = saturday
    this.sunday = sunday
  }

  static defaultOpeningHours(): OpeningHours {
    return new OpeningHours([], [], [], [], [], [], [])
  }
}
