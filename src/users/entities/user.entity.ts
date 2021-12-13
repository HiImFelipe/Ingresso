import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 75 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
}
