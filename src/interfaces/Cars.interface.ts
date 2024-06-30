import { IAccessory } from './Accessory.interface';

export interface ICar {
  id: string
  model: string
  color: string
  year: string
  value_per_day: number
  accessories: IAccessory[]
  number_of_passengers: number
}
