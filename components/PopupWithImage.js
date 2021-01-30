import {Popup} from "./Popup.js";
export {PopupWithImage};

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  openPopup(card) {
    const open = super.openPopup();
    const showImg = this._popup.querySelector(".popup__show-img");
    const popupShowText = this._popup.querySelector(".popup__text");
    let cardSrc = card.querySelector(".card__img").src;
    let cardAlt = card.querySelector(".card__img").alt;
    showImg.src = cardSrc;
    showImg.alt = cardAlt;
    popupShowText.textContent = cardAlt;
    return open;
  }
}