const COMMENTS_PORTION_SIZE = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const shownCommentsCount = bigPicture.querySelector('.shown-comments-count');
const commentZone = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

let loadedCommentsCount = 0;
let commentData;

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
  }

  return commentsContainer;
};

const renderComents = (data, startIndex, endIndex) => {
  const commentFragment =
    createCommentsFragment(
      data.comments.slice(startIndex, endIndex)
    );

  commentZone.append(commentFragment);
};

const showComments = () => {
  const lastCommentToLoad =
  loadedCommentsCount + COMMENTS_PORTION_SIZE - 1 < commentData.comments.length ?
    loadedCommentsCount + COMMENTS_PORTION_SIZE : commentData.comments.length;

  renderComents(commentData, loadedCommentsCount, lastCommentToLoad);
  loadedCommentsCount += lastCommentToLoad - loadedCommentsCount;
  shownCommentsCount.textContent = loadedCommentsCount;
};

const commentsLoadHandler = () => {
  showComments();

  if (loadedCommentsCount >= commentData.comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentZone.replaceChildren();

  bigPictureImage.src = '';
  likesCount.textContent = '';
  commentsCount.textContent = '';
  loadedCommentsCount = 0;
  commentData = '';
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeWindow();
  }
};

function closeWindow() {
  closeBigPicture();
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onBigPictureCancelClick = () => {
  closeWindow();
};

export const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');

  commentData = data;
  bigPictureImage.src = commentData.url;
  likesCount.textContent = commentData.likes;
  commentsCount.textContent = commentData.comments.length;
  socialCaption.textContent = commentData.description;

  commentZone.replaceChildren();
  showComments();
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);

  if (loadedCommentsCount < commentData.comments.length) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', commentsLoadHandler);
  } else {
    commentsLoader.classList.add('hidden');
  }
};
