export {popShow, popupShow};
import './index.css';
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidation.js";
import {initialCards, config, cardTemplate, cardsContainer, popupShow, popupAdd, popupEdit, buttonAdd, buttonEdit, formEdit, formAdd, 
  nameInput, jobInput, title, paragraph} from "../utils/constants.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";

function createCard(item) {
  const card = new Card({
    item: item,
    handleCardClick: () => {
      popShow.openPopup(item);
    } 
  }, cardTemplate);
  return card.createCard();
};

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, cardsContainer);

cardList.renderItems();

const popShow = new PopupWithImage(popupShow);
popShow.setEventListeners();

const popAdd = new PopupWithForm({
  popup: popupAdd, 
  formSubmit: (evt, values) => {
    evt.preventDefault();
    const placeName = values.name;
    const placeLink = values.link;
    if (placeName !="" && placeLink !="") {
      let item = {name: placeName, link: placeLink};
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    }
    popAdd.closePopup();
  }
});
popAdd.setEventListeners();

const userInfo = new UserInfo({name: title, info: paragraph});

const popEdit = new PopupWithForm({
  popup: popupEdit, 
  formSubmit: (evt, values) => {
    evt.preventDefault();
    title.textContent = values.username;
    paragraph.textContent = values.userjob;
    userInfo.setUserInfo(nameInput, jobInput);
    popEdit.closePopup();
  }
});
popEdit.setEventListeners();

const profileValidator = new FormValidator(config, formEdit);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, formAdd);
addCardValidator.enableValidation();

buttonAdd.addEventListener("click", function() {
  addCardValidator.resetValidation();
  popAdd.openPopup();
});

buttonEdit.addEventListener("click", function() {
  profileValidator.resetValidation();
  popEdit.openPopup();
  const infoList = userInfo.getUserInfo();
  nameInput.value = infoList.name;
  jobInput.value = infoList.info;
});