import {createDescriptions} from './photo-description-data.js';

const pictureTemplate = document.querySelector('#picture').content;

export const createMiniature = (description) => {
  const miniature = pictureTemplate.cloneNode(true);
  const miniatureImage = miniature.querySelector('.picture__img');
  const miniatureComments = miniature.querySelector('.picture__comments');
  const miniatureLikes = miniature.querySelector('.picture__likes');

  miniatureImage.src = description.url;
  miniatureComments.textContent = description.comments.length;
  miniatureLikes.textContent = description.likes;

  return miniature;
};

const miniatureContainer = document.createDocumentFragment();

createDescriptions(25).forEach((pictureDescription) => {
  miniatureContainer.append(createMiniature(pictureDescription));
});

const pictures = document.querySelector('.pictures');
pictures.append(miniatureContainer);
