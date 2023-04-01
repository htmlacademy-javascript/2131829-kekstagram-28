export const showPhoto = (url, likes , comments, description) => {
  const shownPhoto = document.querySelector('.big-picture');

  shownPhoto.classList.remove('hidden');

  shownPhoto.querySelector('.big-picture__img').src = url;
  shownPhoto.querySelector('.likes-count').textContent = likes;
  shownPhoto.querySelector('.comments-count').textContent = comments.length;

  let loadedCommentsCount = 0;

  const loadComments = (startIndex, size) => {
    const commentsContainer = document.createDocumentFragment();

    const endIndex = startIndex + size - 1 < comments.length ? startIndex + size - 1 : comments.length - 1;

    for (let i = startIndex; i <= endIndex; i++) {
      const comment = comments[i];

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

      loadedCommentsCount++;
    }
    shownPhoto
      .querySelector('.social__comment-count')
      .innerHTML = `${loadedCommentsCount} из <span class="comments-count">${comments.length} комментариев</span>`;

    return commentsContainer;
  };

  const commentZone = shownPhoto.querySelector('.social__comments');
  commentZone.replaceChildren();
  commentZone.append(loadComments(loadedCommentsCount, 5));

  shownPhoto.querySelector('.social__caption').textContent = description;

  const commentsLoader = shownPhoto.querySelector('.comments-loader');

  if (loadedCommentsCount < comments.length) {
    const loadMoreComments = () => {
      commentZone.append(loadComments(loadedCommentsCount, 5));

      if (loadedCommentsCount >= comments.length) {
        commentsLoader.classList.add('hidden');
      }
    };

    commentsLoader.addEventListener('click', loadMoreComments);

  } else {
    commentsLoader.classList.add('hidden');
  }

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
  //document.querySelector('.big-picture__cancel').removeEventListener('click', loadMoreComments);
};
