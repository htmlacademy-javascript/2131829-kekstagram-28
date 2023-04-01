const pictureTemplate = document.querySelector('#picture').content;

const createPhoto = (photoData) => {
  const miniature = pictureTemplate.cloneNode(true);

  miniature.querySelector('.picture__img').src = photoData.url;
  miniature.querySelector('.picture__comments').textContent = photoData.comments.length;
  miniature.querySelector('.picture__likes').textContent = photoData.likes;

  return miniature;
};

const pictures = document.querySelector('.pictures');

export const renderPhotos = (photosData) => {
  const photoContainer = document.createDocumentFragment();

  photosData.forEach((data) => {
    photoContainer.append(createPhoto(data));
  });

  pictures.append(photoContainer);
};

