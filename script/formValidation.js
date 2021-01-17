export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(popupInput, errorMessage) {
    const popupError = this._form.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.add(this._config.inputErrorClass);
    popupError.textContent = errorMessage;
    popupError.classList.add(this._config.errorClass);
  }
  
  _hideInputError(popupInput) {
    const popupError = this._form.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.remove(this._config.inputErrorClass);
    popupError.classList.remove(this._config.errorClass);
    popupError.textContent = "";
  }
  
  _isValid(popupInput) {
    if (!popupInput.validity.valid) {
      this._showInputError(popupInput, popupInput.validationMessage);
    } else {
      this._hideInputError(popupInput);
    }
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some((popupInput) => {
      return !popupInput.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }
  
  _setEventListeners() {  
    this._inputList.forEach((popupInput) => {
      popupInput.addEventListener("input", () => {
        this._isValid(popupInput);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach(input => {
      this._hideInputError(input);
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}