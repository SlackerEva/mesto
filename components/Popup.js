export {Popup};
class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    this._popup.addEventListener("click", this._closeByOverlay.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this)); 
  }
  
  closePopup() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("click", this._closeByOverlay.bind(this));
    document.removeEventListener('keydown', this._handleEscClose.bind(this)); 
  }

  _handleEscClose(evt) {
    const escapeCode = 27;
    if (evt.keyCode === escapeCode) {
      this._popup.closePopup();
    }
  }

  _closeByOverlay(evt) {
    if (evt.target.classList.contains('popup__page')) {
      this.closePopup(evt.target.closest('.popup'));
    }
  }

  setEventListeners() {
    const buttonClose = this._popup.querySelector(".popup__close");
    buttonClose.addEventListener("click", this.closePopup.bind(this));
  }
}