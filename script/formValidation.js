export class FormValidator {
  constructor(config, item) {
    this._config = config;
    this._selector = item;
  }

  _showInputError(popupElement, popupInput, errorMessage, config) {
    const popupError = popupElement.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.add(config.inputErrorClass);
    popupError.textContent = errorMessage;
    popupError.classList.add(config.errorClass);
  }
  
  _hideInputError(popupElement, popupInput, config) {
    const popupError = popupElement.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.remove(config.inputErrorClass);
    popupError.classList.remove(config.errorClass);
    popupError.textContent = "";
  }
  
  _isValid(popupElement, popupInput, config) {
    if (!popupInput.validity.valid) {
      this._showInputError(popupElement, popupInput, popupInput.validationMessage, config);
    } else {
      this._hideInputError(popupElement, popupInput, config);
    }
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some((popupInput) => {
      return !popupInput.validity.valid;
    })
  }
  
  _toggleButtonState(inputList, buttonElement, config) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  }
  
  _setEventListeners(popupElement, config) {
    const inputList = Array.from(popupElement.querySelectorAll(config.inputSelector));
    const buttonElement = popupElement.querySelector(config.submitButtonSelector);
  
    inputList.forEach((popupInput) => {
      popupInput.addEventListener("input", () => {
        this._isValid(popupElement, popupInput, config);
        this._toggleButtonState(inputList, buttonElement, config);
      });
    });
  }

  enableValidation() {
    this._selector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._selector, this._config);
  }
}