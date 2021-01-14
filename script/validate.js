const config = {
  popupSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

const showInputError = (popupElement, popupInput, errorMessage, config) => {
  const popupError = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add(config.inputErrorClass);
  popupError.textContent = errorMessage;
  popupError.classList.add(config.errorClass);
};

const hideInputError = (popupElement, popupInput, config) => {
  const popupError = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove(config.inputErrorClass);
  popupError.classList.remove(config.errorClass);
  popupError.textContent = "";
};

const isValid = (popupElement, popupInput, config) => {
  if (!popupInput.validity.valid) {
    showInputError(popupElement, popupInput, popupInput.validationMessage, config);
  } else {
    hideInputError(popupElement, popupInput, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((popupInput) => {
    return !popupInput.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}; 

const setEventListeners = (popupElement, config) => {
  const inputList = Array.from(popupElement.querySelectorAll(config.inputSelector));
  const buttonElement = popupElement.querySelector(config.submitButtonSelector);

  inputList.forEach((popupInput) => {
    popupInput.addEventListener("input", () => {
      isValid(popupElement, popupInput, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}; 

const enableValidation = (config) => {
  const popupList = Array.from(document.querySelectorAll(config.popupSelector));
  console.log(popupList);
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(popupElement, config);
  });
};

enableValidation(config); 