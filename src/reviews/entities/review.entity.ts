import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ nullable: true })
  parentId: number;

  @Column({ type: 'int', default: 0 })
  userId: number;

  @Column({ type: 'longtext', nullable: true })
  review: string;

  @Column({ type: 'int', default: 0, nullable: true })
  rating: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  isPublic: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  editedBy: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;
}
