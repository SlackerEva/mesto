export {popShow, popupShow};
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidation.js";
import {initialCards, config, cardTemplate, cardsContainer, popupShow, popupAdd, popupEdit, buttonAdd, buttonEdit, formEdit, formAdd, 
  nameInput, jobInput, placeNameInput, placeLinkInput, title, paragraph} from "../utils/constants.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";


const popShow = new PopupWithImage(popupShow);
const popAdd = new PopupWithForm({
  popup: popupAdd, 
  formSubmit: (evt) => {
    evt.preventDefault();
    const placeName = placeNameInput.value;
    const placeLink = placeLinkInput.value;
    if (placeName !="" && placeLink !="") {
      let item ={name: placeName, link: placeLink};
      const card = new Card({
        item: item,
        handleCardClick: (item) => {
          item.addEventListener("click", () => {
            popShow.openPopup(item);
          });
        } 
      }, cardTemplate);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    }
    popAdd.closePopup();
  }
});

const userInfo = new UserInfo({name: "Жак-Ив Кусто", info: "Исследователь океана"});

const popEdit = new PopupWithForm({
  popup: popupEdit, 
  formSubmit: (evt) => {
    evt.preventDefault();
    title.textContent = nameInput.value;
    paragraph.textContent = jobInput.value;
    userInfo.setUserInfo(nameInput, jobInput);
    popEdit.closePopup();
  }
});

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card({
      item: item, 
      handleCardClick: (item) => {
        item.addEventListener("click", () => {
          popShow.openPopup(item);
        });
      } 
    }, cardTemplate);
    const cardElement = card.createCard();
    cardList.addItem(cardElement)
  }
}, cardsContainer);

cardList.renderItems();

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
  let infoList = userInfo.getUserInfo();
  nameInput.value = infoList.name;
  jobInput.value = infoList.info;
});