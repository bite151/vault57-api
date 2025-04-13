import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('feedback')
export class FeedbackEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  clientName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  contact: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  status: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;
}
