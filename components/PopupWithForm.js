import {Popup} from "./Popup.js";

export {PopupWithForm};

class PopupWithForm extends Popup{
  constructor({popup, formSubmit}) {
    super(popup);
    this._formSubmit = formSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._form = this._popup.querySelector(".popup__content");
  }

  _getInputValues() {   
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._formSubmit(evt, this._getInputValues());
    });
  }

  closePopup() {
    this._form.reset();
    super.closePopup();
  }
}