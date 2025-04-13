import { ItemType, UserRole } from '../entities/page.entity';

export interface PageType {
  id: number;
  parentId: number;
  url: string;
  content: string;
  isPublic: boolean;
  range: number;
  type: ItemType;
  permission: UserRole;
  seo: SeoPagePropsType;
  desktop: DesktopPagePropsType;
  mobile: MobilePagePropsType;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  pageSeoId: number;
  pageDesktopId: number;
  pageMobileId: number;
}

export interface SeoPagePropsType {
  id: number;
  parentId: number;
  title: string;
  description: string;
}

export interface DesktopPagePropsType {
  id: number;
  parentId: number;
  icon: string;
  title: string;
  contentComponent: string;
  showInFinder: boolean;
  resetWidth: boolean;
  hideStatusBar: boolean;
}

export interface MobilePagePropsType {
  id: number;
  parentId: number;
  icon: string;
  title: string;
  shortTitle: string;
  description: string;
  contentComponent: string;
  showInLauncher: boolean;
  loadParentScreens: boolean;
  background: string;
}

export interface PageResponse {
  id: number;
  parentId: number | null;
  url: string | null;
  content: any;
  isPublic: boolean;
  range: number;
  type: ItemType;
  permission: UserRole;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  seo: {
    title: string | null;
    description: string | null;
  };
  desktop: {
    icon: string | null;
    title: string | null;
    contentComponent: string | null;
    showInFinder: boolean;
  };
  mobile: {
    icon: string | null;
    title: string | null;
    shortTitle: string | null;
    description: string | null;
    contentComponent: string | null;
    showInLauncher: boolean;
    loadParentScreens: boolean;
    background: string | null;
  };
}

export interface ContentBlock {
  id?: number;
  type: 'text' | 'image' | 'video' | string; // можно расширить под другие типы блоков
  title: string;
  img: string;
  p: string[];
  images?: string[];
}

export interface PageContent {
  id?: number;
  pageId?: number;
  h1: string;
  blocks: ContentBlock[];
}
