import { dislikeCard, addLikeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content; //Темплейт карточки

function renderCard(
  cardData,
  handleImageClick,
  likeCard,
  deleteCard,
  profileId
) {
  //создание карточки
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImg = cardElement.querySelector('.card__image');
  const likeBlock = cardElement.querySelector('.likes');

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  likeBlock.textContent = cardData.likes.length;
  cardElement.id = cardData['_id'];
  if (profileId !== cardData.owner['_id']) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      deleteCard(cardElement, cardData._id);
    });
  }

  if (isLikeMine(cardData, profileId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    likeCard(cardData, likeButton, likeBlock);
  })

  cardImg.addEventListener('click', handleImageClick);

  return cardElement;
}

function likeCard(cardData, likeButton, likeBlock) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeMethod = isLiked ? dislikeCard : addLikeCard;
  likeMethod(cardData._id)
    .then((res) => {
      likeBlock.textContent = res.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((error) => console.log(error));
}

function isLikeMine(cardData, profileId) {
  return cardData.likes.some((item) => {
    return item._id === profileId;
  });
}

export { renderCard, likeCard };
