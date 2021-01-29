export {popShow, popupShow};
import {Card} from "../components/Card.js";
import {Popup} from "../components/Popup.js";
import {FormValidator} from "../components/FormValidation.js";
import {initialCards, config, cardTemplate, cardsContainer, popupShow, popupAdd, popupEdit} from "../utils/constants.js";
import {Section} from "../components/Section.js";

const buttonAdd = document.querySelector(".intro__button-add");
const buttonEdit = document.querySelector(".intro__button-edit");
const formEdit = document.querySelector("form[name='edit-profile']");
const formAdd = document.querySelector("form[name='add-card']");
const nameInput = document.querySelector("input[name='username']");
const jobInput = document.querySelector("input[name='userjob']");
const placeNameInput = document.querySelector("input[name='placename']");
const placeLinkInput = document.querySelector("input[name='placelink']");
const title = document.querySelector(".intro__title");
const paragraph = document.querySelector(".intro__paragraph");
const subtitle = document.querySelector(".popup__subtitle");

const popShow = new Popup(popupShow);
const popAdd = new Popup(popupAdd);
const popEdit = new Popup(popupEdit);
popShow.setEventListeners();
popAdd.setEventListeners();
popEdit.setEventListeners();

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplate);
    const cardElement = card.createCard();
    cardList.addItem(cardElement)
  }
}, cardsContainer);

cardList.renderItems();

const profileValidator = new FormValidator(config, formEdit);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, formAdd);
addCardValidator.enableValidation();

function editProfile(evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  paragraph.textContent = jobInput.value;
  popEdit.closePopup();
}

function addCard(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;
  if (placeName !="" && placeLink !="") {
    renderCard({      
      name: placeName,
      link: placeLink
    })
  }
  popAdd.closePopup();
}

buttonAdd.addEventListener("click", function() {
  addCardValidator.resetValidation();
  popAdd.openPopup();
  placeNameInput.value = "";
  placeLinkInput.value = "";
});

buttonEdit.addEventListener("click", function() {
  profileValidator.resetValidation();
  popEdit.openPopup();
  nameInput.value = title.textContent;
  jobInput.value = paragraph.textContent;
});


formEdit.addEventListener("submit", editProfile);
formAdd.addEventListener("submit", addCard);
