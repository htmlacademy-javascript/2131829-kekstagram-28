import {getRandomInteger} from './utils.js';

const AVATARS_COUNT = 6;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Эммануил', 'Розовые_щечки_252', 'валентина сергеевна', 'Андрей', 'Кошка', 'Администрация'];

const createComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  authorName: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const createDescription = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: `Фотография №${id}`,
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1,5)}, (_, index) => createComment(index + 1))
});

export const createDescriptions = (count) => Array.from({length: count}, (_, index) => createDescription(index + 1));
