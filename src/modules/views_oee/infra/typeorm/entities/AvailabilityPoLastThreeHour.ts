
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_availability_po_last_three_hour'})
export default class AvailabilityPoLastThreeHour {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line' })
  id_line: number;

  @Column({ name: 'line_name'})
  line_name: string;

  @Column({ name: 'disponibilidade'})
  disponibilidade: number;
}
