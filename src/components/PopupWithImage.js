import {Popup} from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._showImg = this._popup.querySelector(".popup__show-img");
    this._popupShowText = this._popup.querySelector(".popup__text");
  }

  openPopup(values) {
    this._showImg.src = values.link;
    this._showImg.alt = values.name;
    this._popupShowText.textContent = values.name;
    super.openPopup();
  }
}

export {PopupWithImage};