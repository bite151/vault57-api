import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PageSeoEntity } from './page_seo.entity';
import { PageMobileEntity } from './page_mobile.entity';
import { PageDesktopEntity } from './page_desktop.entity';

export enum UserRole {
  PUBLIC = 'public',
  USER = 'user',
  ADMIN = 'admin',
}

export enum ItemType {
  FILE = 'file',
  FOLDER = 'folder',
  REVIEW = 'review',
}

@Entity('pages')
export class PageEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ nullable: true })
  parentId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  url: string;

  @Column({ type: 'longtext', nullable: true })
  content: string;

  @Column({ type: 'int', nullable: true })
  range: number;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  isPublic: number;

  @Column({
    type: 'enum',
    enum: ItemType,
    default: ItemType.FOLDER,
  })
  type: ItemType;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PUBLIC,
  })
  permission: UserRole;

  @Column({ type: 'varchar', length: 50, nullable: true })
  createdBy: string;

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

  @OneToOne(() => PageSeoEntity, (seo) => seo.page, {
    cascade: true,
  })
  seo: PageSeoEntity;

  @OneToOne(() => PageMobileEntity, (mobile) => mobile.page, {
    cascade: true,
  })
  mobile: PageMobileEntity;

  @OneToOne(() => PageDesktopEntity, (desktop) => desktop.page, {
    cascade: true,
  })
  desktop: PageDesktopEntity;
}
