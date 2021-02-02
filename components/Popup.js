export {Popup};
class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeByOverlay = this._closeByOverlay.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    this._popup.addEventListener("click", this._closeByOverlay);
    document.addEventListener('keydown', this._handleEscClose);
  }
  
  closePopup() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("click", this._closeByOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    const escapeCode = 27;
    if (evt.keyCode === escapeCode) {
      this.closePopup();
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