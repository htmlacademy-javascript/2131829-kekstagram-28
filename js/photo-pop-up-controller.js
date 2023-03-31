export const showPhoto = (url, likes , comments, description) => {
  const shownPhoto = document.querySelector('.big-picture');

  shownPhoto.classList.remove('.hidden');

  shownPhoto.querySelector('.big-picture__img').src = url;
  shownPhoto.querySelector('.likes-count').textContent = likes;
  shownPhoto.querySelector('.comments-count').textContent = comments.length;

  shownPhoto.querySelector('.social__comments').append(() => {
    const commentsContainer = document.createDocumentFragment();

    comments.forEach((comment) => {
      const socialComment = document.createElement('li');
      socialComment.classList.add('social__comment');

      const authorPhoto = document.createElement('img');
      authorPhoto.classList.add('social__picture');
      authorPhoto.src = comment.avatar;
      authorPhoto.alt = comment.authorName;

      const commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = comment.message;

      socialComment.appendChild(authorPhoto);
      socialComment.appendChild(commentText);

      commentsContainer.append(socialComment);
    });

    return commentsContainer;
  });

  shownPhoto.querySelector('.social__caption').textContent = description;

  shownPhoto.querySelector('.social__comment-count').classList.add('hidden');

  shownPhoto.querySelector('.comments-loader').classList.add('hidden');

  document.querySelector('body').classList.add('modal-open');
};

export const closeShownPhoto = () => {
  document.querySelector('body').classList.remove('modal-open');

  const photo = document.querySelector('.big-picture');
  photo.classList.add('hidden');

  photo.querySelector('.big-picture__img').src = '';
  photo.querySelector('.likes-count').textContent = '';
  photo.querySelector('.comments-count').textContent = '';
  photo.querySelector('.social__comments').replaceChildren();

};
