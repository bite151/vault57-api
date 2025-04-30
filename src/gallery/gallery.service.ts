import { Injectable } from '@nestjs/common';

@Injectable()
export class GalleryService {
  findAll() {
    return [
      {
        id: 1,
        title: 'Турнир по CS:GO',
        alt: 'Вечер турниров по CS:GO собрал полный зал! Эмоции зашкаливали, а победитель получил крутые призы.',
        src: '/images/gallery/1.jpg',
        date: '14 мая 2024',
      },
      {
        id: 2,
        title: 'Ночной марафон Dota 2',
        alt: 'Ночной марафон в Dota 2: киберспортсмены собрались в клубе, чтобы устроить битву до самого утра!',
        src: '/images/gallery/2.jpg',
        date: '27 июня 2024',
      },
      {
        id: 3,
        title: 'LAN-вечеринка в клубе',
        alt: 'ЛАН-вечеринка удалась на славу! Новые знакомства, море фана и эпичные катки в Valorant.',
        src: '/images/gallery/3.jpg',
        date: '5 августа 2024',
      },
      {
        id: 4,
        title: 'Ретро-игры на экране',
        alt: 'Ретро-игры на большом экране: Mortal Kombat, Quake и культовые аркады снова в деле!',
        src: '/images/gallery/4.jpg',
        date: '12 сентября 2024',
      },
      {
        id: 5,
        title: 'Гейминг-ночь с PUBG',
        alt: 'Гейминг-сходка с ночным стримом! Общались, шутили, играли в PUBG и Minecraft.',
        src: '/images/gallery/5.jpg',
        date: '30 июля 2024',
      },
      {
        id: 6,
        title: 'Финал турнира LoL',
        alt: 'Финал турнира по League of Legends: напряжённые моменты, радость победителей и поддержка зрителей.',
        src: '/images/gallery/6.jpg',
        date: '19 мая 2024',
      },
      {
        id: 7,
        title: 'Консольный вечер',
        alt: 'Пятничный вечер за консольными играми: Mortal Kombat, FIFA и много-много фана!',
        src: '/images/gallery/7.jpg',
        date: '7 июня 2024',
      },
      {
        id: 8,
        title: 'VR-день в клубе',
        alt: 'Виртуальная реальность покоряет! Очередной VR-день в клубе подарил участникам массу эмоций.',
        src: '/images/gallery/8.jpg',
        date: '21 октября 2024',
      },
      {
        id: 9,
        title: 'Турнир по Apex Legends',
        alt: 'Зал забит под завязку — сегодня у нас командный турнир по Apex Legends! Азарт, динамика, адреналин.',
        src: '/images/gallery/9.jpg',
        date: '15 ноября 2024',
      },
      {
        id: 10,
        title: 'Соревнования StarCraft II',
        alt: 'Соревнования по StarCraft II прошли на высоте. Играли, анализировали стратегии и даже немного спорили!',
        src: '/images/gallery/10.jpg',
        date: '28 августа 2024',
      },
      {
        id: 11,
        title: 'Годовщина клуба',
        alt: 'Киберспортивная вечеринка в честь годовщины клуба! Угощения, розыгрыши, стримы и ламповая атмосфера.',
        src: '/images/gallery/11.jpg',
        date: '3 декабря 2024',
      },
      {
        id: 12,
        title: 'Ночь настольных игр',
        alt: 'Осенняя ночь настольных игр: DnD, Magic: The Gathering и настолки на любой вкус!',
        src: '/images/gallery/12.jpg',
        date: '10 октября 2024',
      },
      {
        id: 13,
        title: 'LAN-party в олдскул',
        alt: 'LAN-party по старинке: Half-Life, Counter-Strike 1.6 и незабываемый дух олдскула.',
        src: '/images/gallery/13.jpg',
        date: '9 сентября 2024',
      },
      {
        id: 14,
        title: 'Турнир по Tekken 7',
        alt: 'Фанатский турнир по Tekken 7: захватывающие поединки, красивые камбэки и громкие овации!',
        src: '/images/gallery/14.jpg',
        date: '25 декабря 2024',
      },
    ];
  }
}
