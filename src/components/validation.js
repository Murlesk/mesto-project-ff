const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//Функция показа ошибки
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  enableValidation
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(enableValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidation.errorClass);
};
//Функция скрытия ошибки
const hideInputError = (formElement, inputElement, enableValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(enableValidation.inputErrorClass);
  if (errorElement) {
    errorElement.classList.remove(enableValidation.errorClass);
    errorElement.textContent = '';
  }
};
//Функция проверки на валидность инпутов формы
const isValid = (formElement, inputElement, enableValidation) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      enableValidation
    );
  } else {
    hideInputError(formElement, inputElement, enableValidation);
  }
};
//Функция навешиваяния слушателей на инпуты
const setEventListeners = (formElement, enableValidation) => {
  const inputs = Array.from(
    formElement.querySelectorAll(enableValidation.inputSelector)
  );
  const button = formElement.querySelector(
    enableValidation.submitButtonSelector
  );
  toggleButtonState(inputs, button, enableValidation);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, enableValidation);
      toggleButtonState(inputs, button, enableValidation);
    });
  });
};
//Функция  навешивания слушателей на формы
const validation = (enableValidation) => {
  const formList = Array.from(
    document.querySelectorAll(enableValidation.formSelector)
  );
  formList.forEach((formElement) =>
    setEventListeners(formElement, enableValidation)
  );
};
//Функция проверки на любой невалидный инпут
const isvalidInputs = (inputList) => {
  return inputList.some((listItem) => {
    return !listItem.validity.valid;
  });
};

//Функция отключения кнопки
const toggleButtonState = (inputList, buttonElement, enableValidation) => {
  if (isvalidInputs(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(enableValidation.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(enableValidation.inactiveButtonClass);
  }
};

//Функиця очистки ошибок валидации
const clearValidation = (formElement, enableValidation) => {
  const button = formElement.querySelector(
    enableValidation.submitButtonSelector
  );
  const inputList = Array.from(
    formElement.querySelectorAll(enableValidation.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, enableValidation);
  });
  formElement.reset();
  toggleButtonState(inputList, button, enableValidation);
};



export { validation, enableValidation, clearValidation};