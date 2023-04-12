import {getRandomInteger, debounce} from './utils.js';
import {openBigPicture} from './big-picture.js';
import {getData} from './load.js';
import {showErrorMessage} from './dialog.js';

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
  const count = data.length < RANDOM_PHOTOS_COUNT ? data.length : RANDOM_PHOTOS_COUNT;

  while (sorted.length < count) {
    const unsortedData = data[getRandomInteger(0, data.length - 1)];

    if (!sorted.includes(unsortedData)) {
      sorted.push(unsortedData);
    }
  }

  return sorted;
};

const sortDiscussed = (data) => data.slice().sort((photoA, photoB) => photoB.likes - photoA.likes);

const getSortedPhotos = (data, mode) => {
  switch (mode) {
    case 'filter-default': return data;
    case 'filter-random': return sortRandom(data);
    case 'filter-discussed': return sortDiscussed(data);
    default: return data;
  }
};

const renderPhotos = (data) => {
  const photoContainer = document.createDocumentFragment();

  data.forEach((dataElement) => {
    photoContainer.append(createPhoto(dataElement));
  });

  pictures.append(photoContainer);
};

const activateFilter = (filter) => {
  filters
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');

  filter.classList.add('img-filters__button--active');
};

const onFiltersClick = debounce((evt) => {
  if (!evt.target.classList.contains('img-filters__form')) {
    pictures
      .querySelectorAll('.picture')
      .forEach((picture) => picture.remove());

    renderPhotos(getSortedPhotos(loadedPhotosData, evt.target.id));
    activateFilter(evt.target);
  }
});

filters.addEventListener('click', onFiltersClick);

const onPictureClick = (evt) => {
  const data = evt.target.dataset.id;

  if (data) {
    openBigPicture(loadedPhotosData[Number(data)]);
  }
};

pictures.addEventListener('click', onPictureClick);

const sortFilters = document.querySelector('.img-filters');

getData()
  .then((data) => {
    loadedPhotosData = data;
    renderPhotos(data);
    sortFilters.classList.remove('img-filters--inactive');
  })
  .catch(
    (err) => {
      showErrorMessage(err.message);
    }
  );
