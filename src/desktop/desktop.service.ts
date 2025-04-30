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
        key: 6,
        title: 'Отзывы',
        url: '/reviews',
        icon: 'MessageCircleHeart',
      },
    ];
  }
}
