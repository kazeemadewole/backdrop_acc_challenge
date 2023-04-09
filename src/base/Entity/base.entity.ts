import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({ nullable: true })
  createdBy?: string;
  @CreateDateColumn({ nullable: true })
  created_at?: Date | string;
  @Column({ nullable: true })
  lastModifiedBy?: string;
  @UpdateDateColumn({ nullable: true })
  updated_at?: Date | string;
}
