// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const placesItemCard = document.querySelector(".places__item card");
const profileAddButton = document.querySelector(".profile__add-button");
const cardDeleteButton = cardTemplate.querySelector(".card__delete-button");

// @todo: Функция создания карточки
function renderCard(name, link, deleteCard) {
  const addCard = cardTemplate.querySelector(".card").cloneNode(true);
        addCard.querySelector(".card__title").textContent = name;
        addCard.querySelector(".card__image").alt = name;
        addCard.querySelector(".card__image").src = link;
        addCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  
  return addCard;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const trash = evt.target.closest(".card");
  trash.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (prop) {
  placesList.append(renderCard(prop.name, prop.link, deleteCard));
});

