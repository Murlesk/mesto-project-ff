import { clearForm } from './validation';

//Функция отрытия окна
export function openModal(el) {
  el.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
}

//Функция закрытия окна
export function closeModal(el) {
  el.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
}

//Функция закрытия окна по клавише Escape
function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
}
