export {popShow, popupShow};
import './index.css';
import {Api} from "../components/Api.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidation.js";
import {config, cardTemplate, cardsContainer, popupShow, popupAdd, popupEdit, buttonAdd, buttonEdit, formEdit, formAdd, 
  nameInput, jobInput, title, paragraph} from "../utils/constants.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";


const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/cards",
  headers: {
    "authorization": "fb495017-080b-4391-8363-eb09bd7d470d",
    "content-type": "application/json"
  }
}); 

let cardList;

api.getInitialCards()
  .then((data) => {
    cardList = new Section({
      data: data,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
      },
      api
    }, cardsContainer); 
    cardList.renderItems();
  })
  .catch(err=>console.log(err));

function createCard(item) {
    const card = new Card({
      item: item,
      handleCardClick: () => {
        popShow.openPopup(item);
      } 
    }, cardTemplate);
    return card.createCard();
};

const popShow = new PopupWithImage(popupShow);
popShow.setEventListeners();

const popAdd = new PopupWithForm({
  popup: popupAdd, 
  formSubmit: (evt, values) => {
    evt.preventDefault();
    const placeName = values.placename;
    const placeLink = values.placelink;
    if (placeName !="" && placeLink !="") {
      const item = {name: placeName, link: placeLink};
      api.addCard(item)
        .then((item) => {
          const cardElement = createCard(item);
          cardList.addItem(cardElement);
        })
        .catch(err=>console.log(err));
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
    userInfo.setUserInfo(values.username, values.userjob);
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
