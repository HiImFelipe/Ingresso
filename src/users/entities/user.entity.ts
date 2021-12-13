import { hashPassword } from 'src/helpers/crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 75 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    transformer: hashPassword,
    select: false,
  })
  password: string;
}
