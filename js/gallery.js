const photoTemplate = document.querySelector('#picture').content;
const pictures = document.querySelector('.pictures');

const createPhoto = (photoData) => {
  const photo = photoTemplate.cloneNode(true);

  photo.querySelector('.picture__img').src = photoData.url;
  photo.querySelector('.picture__comments').textContent = photoData.comments.length;
  photo.querySelector('.picture__likes').textContent = photoData.likes;

  return photo;
};

export const renderPhotos = (photosData) => {
  const photoContainer = document.createDocumentFragment();

  photosData.forEach((data) => {
    photoContainer.append(createPhoto(data));
  });

  pictures.append(photoContainer);
};
