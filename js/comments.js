const commentsCountTotal = document.querySelector('.social__comment-total');
const socialCommentsList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');

const renderComment = (comment) => {
  const commentElement = socialComment.cloneNode(true);

  const commentImg = commentElement.querySelector('.social__picture');
  const commentText = commentElement.querySelector('.social__text');
  commentImg.src = comment.avatar;
  commentImg.alt = comment.name || 'Аватар комментатора';
  commentText.textContent = comment.message;

  socialCommentsList.append(commentElement);
};

const renderComments = (comments, shownCount) => {
  commentsCountTotal.textContent = comments.length;
  for (let i = 0; i < shownCount; i++) {
    renderComment(comments[i]);
  }
};

export {renderComments, socialCommentsList, commentsCountTotal};
