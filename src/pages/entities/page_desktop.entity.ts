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

@Entity('pages_desktop')
@Unique(['pageId'])
export class PageDesktopEntity {
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
  contentComponent: string;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  showInFinder: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  resetWidth: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  hideStatusBar: number;

  @OneToOne(() => PageEntity, (page) => page.desktop)
  @JoinColumn({ name: 'pageId' })
  page: PageEntity;
}
