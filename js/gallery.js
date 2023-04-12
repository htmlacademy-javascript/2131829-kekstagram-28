import {getRandomInteger, debounce} from './utils.js';
import {showPhoto} from './big-picture.js';

const RANDOM_PHOTOS_COUNT = 10;

const photoTemplate = document.querySelector('#picture').content;
const pictures = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters__form');

let loadedPhotosData;

const createPhoto = (photoData) => {
  const photo = photoTemplate.cloneNode(true);
  const photoImage = photo.querySelector('.picture__img');

  photoImage.setAttribute('data-id', photoData.id);
  photoImage.src = photoData.url;
  photo.querySelector('.picture__comments').textContent = photoData.comments.length;
  photo.querySelector('.picture__likes').textContent = photoData.likes;

  return photo;
};

const sortRandom = (data) => {
  const sorted = [];

  while (sorted.length < RANDOM_PHOTOS_COUNT) {
    const dataId = data[getRandomInteger(0, data.length - 1)].id;

    if (!sorted.includes(dataId)) {
      sorted.push(dataId);
    }
  }

  return data.filter((photo) => sorted.includes(photo.id));
};

const compareByLikes = (photoA, photoB) => photoB.likes - photoA.likes;

const sortDiscussed = (data) => data.slice().sort(compareByLikes);

const sortPhotos = (data, mode) => {
  switch (mode) {
    case 'filter-default': return data;
    case 'filter-random': return sortRandom(data);
    case 'filter-discussed': return sortDiscussed(data);
    default: return data;
  }
};

export const renderPhotos = (photosData, sortMode = 'filter-default') => {
  const photoContainer = document.createDocumentFragment();
  const sortedData = sortPhotos(photosData, sortMode);

  loadedPhotosData = photosData;

  sortedData.forEach((data) => {
    photoContainer.append(createPhoto(data));
  });

  pictures.append(photoContainer);
};

const onFiltersClick = debounce((evt) => {
  if (!evt.target.classList.contains('img-filters__form')) {
    pictures
      .querySelectorAll('.picture')
      .forEach((picture) => picture.remove());

    renderPhotos(loadedPhotosData, evt.target.id);

    filters
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  }
});

filters.addEventListener('click', onFiltersClick);

const onPictureClick = (evt) => {
  if (evt.target.hasAttribute('data-id')) {
    const dataId = Number(evt.target.getAttribute('data-id'));

    showPhoto(loadedPhotosData[dataId]);
  }
};

pictures.addEventListener('click', onPictureClick);
