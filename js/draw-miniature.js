import {createDescriptions} from './photo-description-data.js';

const pictureTemplate = document.querySelector('#picture').content;

export const createMiniature = (description) => {
  const miniatureDescription = description; //for transfering description to big picture

  const miniature = pictureTemplate.cloneNode(true);

  miniature.querySelector('.picture__img').src = miniatureDescription.url;
  miniature.querySelector('.picture__comments').textContent = miniatureDescription.comments.length;
  miniature.querySelector('.picture__likes').textContent = miniatureDescription.likes;

  return miniature;
};

const miniatureContainer = document.createDocumentFragment();

createDescriptions(25).forEach((pictureDescription) => {
  miniatureContainer.append(createMiniature(pictureDescription));
});

const pictures = document.querySelector('.pictures');
pictures.append(miniatureContainer);
