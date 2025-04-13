import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { PageEntity } from './page.entity';
import { Exclude } from 'class-transformer';

@Entity('pages_mobile')
@Unique(['pageId'])
export class PageMobileEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Exclude()
  id: number;

  @Column({ type: 'int', nullable: false, unsigned: true, select: false })
  @Exclude()
  pageId: number;

  @Column({ type: 'varchar', length: 25, nullable: true })
  icon: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  shortTitle: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  contentComponent: string;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  showInLauncher: number;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  loadParentScreens: number;

  @Column({ type: 'varchar', length: 7, nullable: true })
  background: string;

  @OneToOne(() => PageEntity, (page) => page.mobile)
  @JoinColumn({ name: 'pageId' })
  page: PageEntity;
}
