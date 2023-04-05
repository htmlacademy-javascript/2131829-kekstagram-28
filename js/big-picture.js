const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const comentsCount = bigPicture.querySelector('.comments-count');
const shownComentsCount = bigPicture.querySelector('.shown-comments-count');
const commentZone = bigPicture.querySelector('.social__comments');
const COMMENTS_PORTION_SIZE = 5;

const loadComment = (comment, container) => {
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

  container.append(socialComment);
};

const renderComents = (data) => {
  let loadedCommentsCount = 0;

  const loadComments = (startIndex, size) => {
    const commentsContainer = document.createDocumentFragment();

    const endIndex = startIndex + size - 1 < data.comments.length ? startIndex + size - 1 : data.comments.length - 1;

    for (let i = startIndex; i <= endIndex; i++) {
      loadComment(data.comments[i], commentsContainer);

      loadedCommentsCount++;
    }
    shownComentsCount.textContent = loadedCommentsCount;

    return commentsContainer;
  };

  commentZone.replaceChildren();
  commentZone.append(loadComments(loadedCommentsCount, COMMENTS_PORTION_SIZE));

  bigPicture.querySelector('.social__caption').textContent = data.description;

  const commentsLoader = bigPicture.querySelector('.comments-loader');

  if (loadedCommentsCount < data.comments.length) {
    const loadMoreComments = () => {
      commentZone.append(loadComments(loadedCommentsCount, COMMENTS_PORTION_SIZE));

      if (loadedCommentsCount >= data.comments.length) {
        commentsLoader.classList.add('hidden');
      }
    };

    commentsLoader.addEventListener('click', loadMoreComments);

  } else {
    commentsLoader.classList.add('hidden');
  }
};

export const showPhoto = (data) => {
  bigPicture.classList.remove('hidden');

  bigPictureImage.src = data.url;
  likesCount.textContent = data.likes;
  comentsCount.textContent = data.comments.length;

  renderComents(data);

  document.body.classList.add('modal-open');
};

export const closeShownPhoto = () => {
  document.body.classList.remove('modal-open');

  bigPicture.classList.add('hidden');

  bigPictureImage.src = '';
  likesCount.textContent = '';
  comentsCount.textContent = '';
  commentZone.replaceChildren();
  //document.querySelector('.big-picture__cancel').removeEventListener('click', loadMoreComments);
};

document.querySelector('.big-picture__cancel').addEventListener('click', closeShownPhoto);
