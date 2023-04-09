const COMMENTS_PORTION_SIZE = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const comentsCount = bigPicture.querySelector('.comments-count');
const shownComentsCount = bigPicture.querySelector('.shown-comments-count');
const commentZone = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

let loadedCommentsCount = 0;

const createComment = (comment) => {
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

  return socialComment;
};

const createCommentsFragment = (comments) => {
  const commentsContainer = document.createDocumentFragment();

  for (let i = 0; i < comments.length; i++) {
    commentsContainer.append(createComment(comments[i]));
    loadedCommentsCount++;
  }

  shownComentsCount.textContent = loadedCommentsCount;

  return commentsContainer;
};

const renderComents = (data) => {
  const lastCommentToLoad =
    loadedCommentsCount + COMMENTS_PORTION_SIZE - 1 < data.comments.length ?
      loadedCommentsCount + COMMENTS_PORTION_SIZE : data.comments.length;

  commentZone.append(
    createCommentsFragment(
      data.comments.slice(loadedCommentsCount, lastCommentToLoad)
    )
  );
};

export const showPhoto = (data) => {
  bigPicture.classList.remove('hidden');

  bigPictureImage.src = data.url;
  likesCount.textContent = data.likes;
  comentsCount.textContent = data.comments.length;
  socialCaption.textContent = data.description;

  commentZone.replaceChildren();
  renderComents(data);
  document.body.classList.add('modal-open');

  if (loadedCommentsCount < data.comments.length) {
    const renderMoreComments = () => {
      renderComents(data);

      if (loadedCommentsCount >= data.comments.length) {
        commentsLoader.classList.add('hidden');
      }
    };

    commentsLoader.addEventListener('click', renderMoreComments);
  } else {
    commentsLoader.classList.add('hidden');
  }
};

export const closeShownPhoto = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentZone.replaceChildren();

  bigPictureImage.src = '';
  likesCount.textContent = '';
  comentsCount.textContent = '';
  loadedCommentsCount = 0;
};

bigPictureCancel.addEventListener('click', closeShownPhoto);
