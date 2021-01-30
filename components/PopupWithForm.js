import {Popup} from "./Popup.js";

export {PopupWithForm};

class PopupWithForm extends Popup{
  constructor({popup, formSubmit}) {
    super(popup);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._formSubmit);
  }

  closePopup() {
    let formValues = this._getInputValues();
    for (let key in formValues) {
      this._popup.querySelector(`input[name=${key}]`).value = ""; 
    }
    super.closePopup();
  }
}