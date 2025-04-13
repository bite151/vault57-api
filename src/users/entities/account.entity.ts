import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'userId', type: 'int', unsigned: true })
  userId: number;

  @Column({ type: 'varchar', length: 15, nullable: true })
  type: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  provider: string;

  @Column({ type: 'varchar', length: 255 })
  accessToken: string;

  @Column({ type: 'varchar', length: 255 })
  refreshToken: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  expiredAt: Date;

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

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
