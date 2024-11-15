import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Column,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CreateDateColumn,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DeleteDateColumn,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Entity,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PrimaryGeneratedColumn,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  UpdateDateColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import { IsEmail, Length } from 'class-validator';

@Entity('employees')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50 })
  @Length(1, 50, { message: 'O nome deve ter no máximo 50 caracteres.' })
  name: string;

  @Column({ length: 50 })
  @Length(1, 50, { message: 'O username deve ter no máximo 50 caracteres.' })
  username: string;

  @Column({ length: 50 })
  @IsEmail({}, { message: 'O email deve ser válido.' })
  @Length(1, 50, { message: 'O email deve ter no máximo 50 caracteres.' })
  email: string;

  @Column({ length: 20 })
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
  password: string;

  @Column({ length: 50 })
  @Length(1, 50, { message: 'O cargo deve ter no máximo 50 caracteres.' })
  role: string;

  @Column({ length: 50 })
  @Length(1, 50, {
    message: 'O departamento deve ter no máximo 50 caracteres.',
  })
  departament: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
