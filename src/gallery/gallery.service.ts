import { Injectable } from '@nestjs/common';

@Injectable()
export class GalleryService {
  findAll() {
    return [
      {
        id: 1,
        title: 'Обновленный интерьер (5)',
        alt: '',
        src: '/gallery/1.jpg',
        date: '14 мая 2024',
      },
      {
        id: 2,
        title: 'Обновленный интерьер (4)',
        alt: '',
        src: '/gallery/2.jpg',
        date: '27 июня 2024',
      },
      {
        id: 3,
        title: 'Обновленный интерьер (3)',
        alt: '',
        src: '/gallery/3.jpg',
        date: '5 августа 2024',
      },
      {
        id: 4,
        title: 'Обновленный интерьер (2)',
        alt: '',
        src: '/gallery/4.jpg',
        date: '12 сентября 2024',
      },
      {
        id: 5,
        title: 'Обновленный интерьер',
        alt: '',
        src: '/gallery/5.jpg',
        date: '30 июля 2024',
      },
      {
        id: 6,
        title: 'Встреча друзей',
        alt: '',
        src: '/gallery/6.jpg',
        date: '19 мая 2024',
      },

      {
        id: 8,
        title: 'Guitar Hero',
        alt: '',
        src: '/gallery/8.jpg',
        date: '21 октября 2024',
      },
      {
        id: 9,
        title: 'Чилл',
        alt: '',
        src: '/gallery/9.jpg',
        date: '15 ноября 2024',
      },
      {
        id: 10,
        title: 'Play od Die',
        alt: '',
        src: '/gallery/10.jpg',
        date: '28 августа 2024',
      },
      // {
      //   id: 12,
      //   title: 'Ночь настольных игр',
      //   alt: 'Осенняя ночь настольных игр: DnD, Magic: The Gathering и настолки на любой вкус!',
      //   src: '/gallery/12.jpg',
      //   date: '10 октября 2024',
      // },
      {
        id: 13,
        title: 'Retro Playground Party (4)',
        alt: 'Retro Playground Party. Заруба в Battle city на NES',
        src: '/gallery/13.jpg',
        date: '9 сентября 2024',
      },
      {
        id: 14,
        title: 'Retro Playground Party (3)',
        alt: 'Retro Playground Party. Заруба в Battle city на NES',
        src: '/gallery/14.jpg',
        date: '25 декабря 2024',
      },
      {
        id: 15,
        title: 'Retro Playground Party (2)',
        alt: 'Retro Playground Party. Заруба в Battle city на NES',
        src: '/gallery/11.jpg',
        date: '3 декабря 2024',
      },
      {
        id: 16,
        title: 'Retro Playground Party',
        alt: 'Retro Playground Party. Заруба в Battle city на NES',
        src: '/gallery/7.jpg',
        date: '7 июня 2024',
      },
    ].reverse();
  }
}
