import {config} from "./validate.js";
/*export class FormValidator {
  constructor(config, item) {
    this._config = config;
    this._element = item;
  }

  _setEventListeners = (popupElement, config) => {
    const inputList = Array.from(popupElement.querySelectorAll(config.inputSelector));
    const buttonElement = popupElement.querySelector(config.submitButtonSelector);
  
    inputList.forEach((popupInput) => {
      popupInput.addEventListener("input", () => {
        isValid(popupElement, popupInput, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  }

  enableValidation() {
    const popupList = Array.from(document.querySelectorAll(this._config.popupSelector));
    popupList.forEach((popupElement) => {
      popupElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      _setEventListeners(popupElement, this._config);
    });
  }
}*/