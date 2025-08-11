
import AvailabilityPoLastThreeHour from '../infra/typeorm/entities/AvailabilityPoLastThreeHour';

export default interface IAvailabilityPoLastThreeHourRepository {
  findViewsIdLineListPoHours(id_line: number): Promise<AvailabilityPoLastThreeHour | AvailabilityPoLastThreeHour[]>;
  allListPoHours(): Promise<AvailabilityPoLastThreeHour| AvailabilityPoLastThreeHour[]>;
}
