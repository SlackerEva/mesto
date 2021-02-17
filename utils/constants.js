export {config, cardTemplate, cardsContainer, popupShow, popupDelete, popupAdd, popupEdit, popupEditAvatar, buttonEditAvatar,
    buttonAdd, buttonEdit, formEdit, formAdd, formAvatar, nameInput, jobInput, placeNameInput, placeLinkInput, title, paragraph, avatar,
    heartImage, blackHeartImage};

/*const initialCards = [
  {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  }
]; */

const config = {
    popupSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
}

const cardTemplate = document.querySelector("#card").content;
const cardsContainer = document.querySelector(".cards");
const popupShow = document.querySelector(".popup-show");
const popupDelete = document.querySelector(".popup-delete");
const popupAdd = document.querySelector(".popup-add");
const popupEdit = document.querySelector(".popup-edit");
const popupEditAvatar = document.querySelector(".popup-edit-avatar");
const buttonAdd = document.querySelector(".intro__button-add");
const buttonEdit = document.querySelector(".intro__button-edit");
const buttonEditAvatar = document.querySelector(".intro__button-edit-avatar");
const formEdit = document.querySelector("form[name='edit-profile']");
const formAvatar = document.querySelector("form[name='edit-avatar']");
const formAdd = document.querySelector("form[name='add-card']");
const nameInput = document.querySelector("input[name='username']");
const jobInput = document.querySelector("input[name='userjob']");
const placeNameInput = document.querySelector("input[name='placename']");
const placeLinkInput = document.querySelector("input[name='placelink']");
const title = document.querySelector(".intro__title");
const paragraph = document.querySelector(".intro__paragraph");
const avatar = document.querySelector(".intro__img");

const heartImage = new URL('../images/heart.svg', import.meta.url);
const blackHeartImage = new URL('../images/blackHeart.svg', import.meta.url);