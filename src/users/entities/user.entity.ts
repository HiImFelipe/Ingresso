import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 75 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
}
