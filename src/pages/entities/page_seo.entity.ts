import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Unique, JoinColumn } from 'typeorm';
import { PageEntity } from './page.entity';
import { Exclude } from 'class-transformer';

@Entity('pages_seo')
@Unique(['pageId'])
export class PageSeoEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Exclude()
  id: number;

  @Column({ type: 'int', nullable: false, unsigned: true })
  @Exclude()
  pageId: number;

  @Column({ type: 'varchar', length: 120, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  description: string;

  @OneToOne(() => PageEntity, (page) => page.seo)
  @JoinColumn({ name: 'pageId' })
  page: PageEntity;
}
