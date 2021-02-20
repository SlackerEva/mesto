export {popShow, popupShow};
import './index.css';
import {Api} from "../components/Api.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidation.js";
import {config, cardTemplate, cardsContainer, popupShow, popupDelete, popupAdd, popupEdit, popupEditAvatar, buttonEditAvatar, buttonAdd, buttonEdit, formEdit, formAdd, formAvatar,
  nameInput, jobInput, title, paragraph, avatar, heartImage, blackHeartImage, renderLoading} from "../utils/constants.js";
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

const userInfo = new UserInfo({name: title, info: paragraph, avatar: avatar});

Promise.all([
  api.getProfile()
    .then((dataProfile) => {
      userInfo.setUserInfo(dataProfile.name, dataProfile.about);
      userInfo.setUserAvatar(dataProfile.avatar);

      api.getInitialCards()
      .then((data) => {
        cardList = new Section({
          data: data,
          renderer: (item) => {
            const cardElement = createCard(item, dataProfile._id, api);
            cardList.addItem(cardElement, data);
          }
        }, cardsContainer); 
        cardList.renderItems();
      })
      .catch(err=>console.log(err));
    })
  .catch(err=>console.log(err))
])    
.then((values)=>{
  const [getProfile, getInitialCards] = values;
})
.catch((err)=>{
  console.log(err);
})

function createCard(item, id, api) {
    const card = new Card({
      item: item,
      id: id,
      api: api,
      heartImage: heartImage, 
      blackHeartImage: blackHeartImage,
      handleCardClick: () => {
        popShow.openPopup(item);
      },
      handleButtonClick: () => {
        const popDelete = new PopupForDelete({
          popup: popupDelete,
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
    renderLoading(popupAdd, true);
    const placeName = values.placename;
    const placeLink = values.placelink;
    const item = {name: placeName, link: placeLink};
    api.addCard(item)
      .then((item) => {
        const cardElement = createCard(item, item.owner._id, api);
        cardList.addItem(cardElement, item);
        popAdd.closePopup();
      })
      .catch(err=>console.log(err));
  }
});
popAdd.setEventListeners();

const popEdit = new PopupWithForm({
  popup: popupEdit, 
  formSubmit: (evt, values) => {
    evt.preventDefault();
    renderLoading(popupEdit, true);
    api.editProfile(values)
      .then((item) => {
        title.textContent = item.name;
        paragraph.textContent = item.about;
        userInfo.setUserInfo(item.name, item.about);
        popEdit.closePopup();
      })
      .catch(err=>console.log(err));

  }
});
popEdit.setEventListeners();

const popEditAvatar = new PopupWithForm({
  popup: popupEditAvatar, 
  formSubmit: (evt, values) => {
    evt.preventDefault();
    renderLoading(popupEditAvatar, true);
    api.editAvatar(values.avatarlink)
      .then((item) => {
        userInfo.setUserAvatar(item.avatar);
        popEditAvatar.closePopup();
      })
      .catch(err=>console.log(err));
  }
});
popEditAvatar.setEventListeners();

const profileValidator = new FormValidator(config, formEdit);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, formAdd);
addCardValidator.enableValidation();

const avtarLinkValidator = new FormValidator(config, formAvatar);
avtarLinkValidator.enableValidation();

buttonAdd.addEventListener("click", function() {
  addCardValidator.resetValidation();
  renderLoading(popupAdd, false);
  addCardValidator.toggleButtonState();
  popAdd.openPopup();
});

buttonEditAvatar.addEventListener("click", function() {
  avtarLinkValidator.resetValidation();
  renderLoading(popupEditAvatar, false);
  avtarLinkValidator.toggleButtonState();
  popEditAvatar.openPopup();
});

buttonEdit.addEventListener("click", function() {
  profileValidator.resetValidation();
  renderLoading(popupEdit, false);
  popEdit.openPopup();
  const infoList = userInfo.getUserInfo();
  nameInput.value = infoList.name;
  jobInput.value = infoList.info;
});
