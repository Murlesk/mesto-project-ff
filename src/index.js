import './pages/index.css'; //Главый файл стилей
import { renderCard, likeCard } from './components/card.js'; //Сборка карточки
import { openModal, closeModal } from './components/modal.js'; //Модальные действия
import { validation, clearValidation } from './components/validation.js'; //Проверка валидации форм
import {enableValidation} from './components/validation.js';
import {
  getUserData,
  getCards,
  patchUserProfile,
  removeCard,
  postCard,
  replaceAvatar
} from './components/api.js';


const popups = document.querySelectorAll('.popup'); //ПопАпы
const placesList = document.querySelector('.places__list'); //Список карточек

const profileAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления места
const formNewCard = document.querySelector('.popup_type_new-card'); //Попап добавления места
const imgPopup = document.querySelector('.popup_type_image'); //Попап просмотра места
const imgPicture = document.querySelector('.popup__image'); //Картинка попапа места
const imgCaption = document.querySelector('.popup__caption'); //Описание попапа места
const profileSubmitButton = document.querySelector('.popup__button'); //Кнопка отправки формы

const profileEditButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const formEditProfile = document.forms['edit-profile']; //Форма редактирования профиля
const nameInput = formEditProfile.elements.name; //Поле для ввода имени профиля
const descInput = formEditProfile.elements.description; //Поле для ввода описания(работы)
const actualName = document.querySelector('.profile__title'); //Текущее имя
const actualDesc = document.querySelector('.profile__description'); //Текущее описание
const profileAvatar = document.querySelector('.profile__image'); 
const formProfileEdit = document.querySelector('.popup_type_edit'); //Попап редактирования профиля
export let profileId = '';

const formAddPlace = document.forms['new-place']; //Форма добавления места
const placeName = formAddPlace.elements['place-name']; //Поле для ввода названия нового места
const placeLink = formAddPlace.elements.link; //Поле для ввода ссылки нового места

//Загрузка карточек с сервера
Promise.all([getCards(), getUserData()])
  .then(([cardData, profileData]) => {
    profileId = profileData._id
    actualName.textContent = profileData.name;
    actualDesc.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url(\\${profileData.avatar})`;
    cardData.forEach(card => {
      placesList.append(renderCard(card, handleImageClick, likeCard, deleteCard, profileId))
    })
  })

//Обновление информации профиля
function formProfileSubmit(evt) {
    evt.preventDefault();
    const buttonText = profileSubmitButton.textContent;
    profileSubmitButton.textContent = 'Сохранение..';
    patchUserProfile(nameInput.value, descInput.value)
      .then(profileData => {
        actualName.textContent = profileData.name;
        actualDesc.textContent = profileData.about;
      })
      .catch((error) => console.log('Не удалось обновить данные профиля: ', error))
      .finally(() => (profileSubmitButton.textContent = buttonText));
      closeModal(formProfileEdit)
  }

//Удаление карточки
function deleteCard(card, cardId) {
  removeCard(cardId)
  .then(() => {
    card.remove()
  })
  .catch((error) => console.log('Ошибка удаления карточки:', error))
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
    const buttonText = profileSubmitButton.textContent;
    profileSubmitButton.textContent = 'Сохранение..';
    postCard(placeName.value, placeLink.value)
      .then((card) => {
        const newPlace = renderCard(card, handleImageClick, likeCard, deleteCard, profileId);
        placesList.prepend(newPlace);
        closeModal(formNewCard);
        evt.target.reset();
      })
      .catch((error) => console.log('Не удалось обновить данные профиля: ', error))
      .finally(() => (profileSubmitButton.textContent = buttonText));
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
