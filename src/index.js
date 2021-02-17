export {popShow, popupShow};
import './index.css';
import {Api} from "../components/Api.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidation.js";
import {config, cardTemplate, cardsContainer, popupShow, popupDelete, popupAdd, popupEdit, popupEditAvatar, buttonEditAvatar, buttonAdd, buttonEdit, formEdit, formAdd, formAvatar,
  nameInput, jobInput, title, paragraph, avatar} from "../utils/constants.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupForDelete} from "../components/PopupForDelete.js";
import {UserInfo} from "../components/UserInfo.js";
//import {Popup} from '../components/Popup.js';


const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    authorization: "fb495017-080b-4391-8363-eb09bd7d470d",
    "content-type": "application/json"
  }
}); 

let cardList;

api.getProfile()
.then((dataProfile) => {
  console.log(dataProfile);
  title.textContent = dataProfile.name;
  paragraph.textContent = dataProfile.about;
  avatar.src = dataProfile.avatar;

  api.getInitialCards()
  .then((data) => {
    cardList = new Section({
      data: data,
      renderer: (item) => {
        const cardElement = createCard(item, dataProfile._id, api);
        cardList.addItem(cardElement);
      }
    }, cardsContainer); 
    cardList.renderItems();
  })
  .catch(err=>console.log(err));


})
.catch(err=>console.log(err));

function createCard(item, id, api) {
    const card = new Card({
      item: item,
      id: id,
      api: api,
      handleCardClick: () => {
        popShow.openPopup(item);
      },
      handleButtonClick: () => {
        const popDelete = new PopupForDelete({
          popup: popupDelete,
          cardElement: cardElement,
          formSubmit: (evt) => {
            evt.preventDefault();       
            api.removeCard(item._id);
            popDelete.closePopup();
          }
        });
        popDelete.setEventListeners();
        popDelete.openPopup();
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
    onLoad(popupAdd);
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
    onLoad(popupEdit);
    api.editProfile(values);
    title.textContent = values.username;
    paragraph.textContent = values.userjob;
    userInfo.setUserInfo(values.username, values.userjob);
    popEdit.closePopup();
  }
});
popEdit.setEventListeners();

const popEditAvatar = new PopupWithForm({
  popup: popupEditAvatar, 
  formSubmit: (evt, values) => {
    evt.preventDefault();
    onLoad(popupEditAvatar);
    api.editAvatar(values.avatarlink);
    avatar.src = values.avatarlink;
    popEditAvatar.closePopup();
    
  }
});
popEditAvatar.setEventListeners();

function onLoad(popup) {
  const button = popup.querySelector(".popup__button-save");
  button.textContent = "Сохранение...";
}

function onLoadEnd(popup) {
  const button = popup.querySelector(".popup__button-save");
  button.textContent = "Сохранить";
}

const profileValidator = new FormValidator(config, formEdit);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, formAdd);
addCardValidator.enableValidation();

const avtarLinkValidator = new FormValidator(config, formAvatar);
avtarLinkValidator.enableValidation();

buttonAdd.addEventListener("click", function() {
  addCardValidator.resetValidation();
  onLoadEnd(popupAdd);
  popAdd.openPopup();
});

buttonEditAvatar.addEventListener("click", function() {
  avtarLinkValidator.resetValidation();
  onLoadEnd(popupEditAvatar);
  popEditAvatar.openPopup();
});

buttonEdit.addEventListener("click", function() {
  profileValidator.resetValidation();
  onLoadEnd(popupEdit);
  popEdit.openPopup();
  const infoList = userInfo.getUserInfo();
  nameInput.value = infoList.name;
  jobInput.value = infoList.info;
});
