import {Popup} from "./Popup.js";
export {PopupForDelete};

class PopupForDelete extends Popup{
  constructor({popup,  formSubmit}) {
    super(popup);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector(".popup__content");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._formSubmit(evt);
    });
  }
}