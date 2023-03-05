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

const createIdGenerator = () => {
  let value = 0;

  return function () {
    value++;
    return value;
  };
};

const createPhotoId = createIdGenerator();

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

const createCommentId = createRandomIdFromRangeGenerator(1, 9007199254740992);
const createAvatar = () => `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`;
const createMessage = () => MESSAGES[getRandomInteger(0, MESSAGES.length - 1)];
const createName = () => NAMES[getRandomInteger(0, NAMES.length - 1)];

const createComment = () => {
  const comment = {
    id: createCommentId(),
    avatar: createAvatar(),
    message: createMessage(),
    authorName: createName()
  };

  return comment;
};

const createDescription = () => {
  const description = {
    id: createPhotoId(),
    url: `photos/${this.id}.jpg`,
    description: `Фотография №${this.id}`,
    likes: getRandomInteger(15, 200),
    comments: createComment()
  };

  return description;
};

const createDescriptionArray = (count) => Array.from({length: count}, createDescription);

createDescriptionArray(25);
