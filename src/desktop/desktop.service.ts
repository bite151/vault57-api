import { Injectable } from '@nestjs/common';

@Injectable()
export class DesktopService {
  findAll() {
    return [
      {
        key: 1,
        title: 'My computer',
        url: '/my-computer',
        icon: 'Laptop2',
      },
      {
        key: 3,
        title: 'Trash',
        url: '/trash',
        icon: 'Trash2',
      },
      // {
      //   key: 4,
      //   title: 'Settings',
      //   url: '#',
      //   icon: 'Settings'
      // },
      {
        key: 4,
        title: 'Games',
        url: '/games',
        icon: 'Gamepad2',
      },
      {
        key: 10,
        title: 'Наши услуги',
        url: '/services/our-services',
        icon: 'FileText',
      },
      {
        key: 11,
        title: 'Правила Vault57',
        url: '/about/rules',
        icon: 'Crown',
      },
      {
        key: 6,
        title: 'Отзывы',
        url: '/reviews',
        icon: 'MessageCircleHeart',
      },
      {
        key: 7,
        title: 'Мы на карте',
        url: '/contacts-info/location',
        icon: 'MapPinned',
      },
      {
        key: 8,
        title: 'График работы',
        url: '/contacts-info/opening-hours',
        icon: 'Clock4',
      },
      {
        key: 9,
        title: 'Пишите нам',
        url: '/contacts-info/feedback-form',
        icon: 'Mail',
      },
      {
        key: 12,
        title: 'Cоцсети',
        url: '/contacts-info/social-networks',
        icon: 'QrCode',
      },
    ];
  }
}
