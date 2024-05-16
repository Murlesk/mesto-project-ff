const cardTemplate = document.querySelector("#card-template").content; //Темплейт карточки

function renderCard(cardData, handleImageClick) {
  //создание карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImg = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;

  //Кнопки карточки
  deleteButton.addEventListener("click", deleteCard); //Удаление
  likeButton.addEventListener("click", likeCard); //Лайк
  cardImg.addEventListener("click", handleImageClick); //Просмотр

  return cardElement;
}

//Функция удаления карточки
function deleteCard(evt) {
  const cardRemove = evt.target.closest(".card");
  cardRemove.remove();
}

//Функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}


export { renderCard };
