import './pages/index.css'; //Главый файл стилей
import { initialCards } from './components/cards.js'; //Архив карточек
import { renderCard } from './components/card.js'; //Сборка карточки
import { openModal, closeModal } from './components/modal.js'; //Модальные действия
import { validation, clearValidation } from './components/validation.js'; //Проверка валидации форм
export const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const popups = document.querySelectorAll('.popup'); //ПопАпы
const placesList = document.querySelector('.places__list'); //Список карточек

const profileAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления места
const formNewCard = document.querySelector('.popup_type_new-card'); //Попап добавления места
const imgPopup = document.querySelector('.popup_type_image'); //Попап просмотра места
const imgPicture = document.querySelector('.popup__image'); //Картинка попапа места
const imgCaption = document.querySelector('.popup__caption'); //Описание попапа места

const profileEditButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const formEditProfile = document.forms['edit-profile']; //Форма редактирования профиля
const nameInput = formEditProfile.elements.name; //Поле для ввода имени профиля
const descInput = formEditProfile.elements.description; //Поле для ввода описания(работы)
const actualName = document.querySelector('.profile__title'); //Текущее имя
const actualDesc = document.querySelector('.profile__description'); //Текущее описание
const formProfileEdit = document.querySelector('.popup_type_edit'); //Попап редактирования профиля

const formAddPlace = document.forms['new-place']; //Форма добавления места
const placeName = formAddPlace.elements['place-name']; //Поле для ввода названия нового места
const placeLink = formAddPlace.elements.link; //Поле для ввода ссылки нового места

//Редактирование профиля
function formProfileSubmit(evt) {
  evt.preventDefault();
  actualName.textContent = nameInput.value;
  actualDesc.textContent = descInput.value;
  closeModal(formProfileEdit);
}

//Открфытие формы редактирования профиля
profileEditButton.addEventListener('click', function () {
  openModal(formProfileEdit);
  nameInput.value = actualName.textContent;
  descInput.value = actualDesc.textContent;
});

//Закрытие формы
popups.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      closeModal(item);
    } else if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(item);
    }
  });
});

//Рендер карточек на странице
initialCards.forEach(function (cards) {
  placesList.append(renderCard(cards, handleImageClick));
});

//Функция просмотра картинки
function handleImageClick(evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(imgPopup);
    imgPicture.src = evt.target.src;
    imgPicture.alt = evt.target.alt;
    imgCaption.textContent = evt.target.alt;
  }
}

//Функция создания карточки через форму
function addPlace(evt) {
  evt.preventDefault();
  const newPlace = {
    name: placeName.value,
    link: placeLink.value,
  };
  placesList.prepend(renderCard(newPlace, handleImageClick));
  closeModal(formNewCard);
  evt.target.reset();
}
//Редактирование данных профиля
formEditProfile.addEventListener('submit', formProfileSubmit);

//Добавление локации
formAddPlace.addEventListener('submit', addPlace);

//Открытие формы добавления карточки
profileAddButton.addEventListener('click', function () {
  openModal(formNewCard);
});

validation(enableValidation);
