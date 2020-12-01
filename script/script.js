const initialCards = [
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
]; 

let popup = document.querySelector(".popup");
let button_add = document.querySelector(".intro__button-add");
let button_edit = document.querySelector(".intro__button-edit");
let button_close = document.querySelector(".popup__close");
let form = document.querySelector(".popup__content");
let nameInput = document.querySelector("input[name='username']");
let jobInput = document.querySelector("input[name='userjob']");
let placeNameInput = document.querySelector("input[name='placename']");
let placeLinkInput = document.querySelector("input[name='placelink']");
let title = document.querySelector(".intro__title");
let paragraph = document.querySelector(".intro__paragraph");
let subtitle = document.querySelector(".popup__subtitle");

const cardTemplate = document.querySelector("#card").content;
const cards = document.querySelector(".cards");
initialCards.map(x => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__img").src = x.link;
  cardElement.querySelector(".card__img").alt = x.name;
  cardElement.querySelector(".card__subtitle").textContent = x.name;
  return cards.append(cardElement); 
});

function preventDefault(evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  paragraph.textContent = jobInput.value;
  popupClose();
}; 

function popupOpen(evt) {
  popup.classList.add("popup_opened");
  if (evt === "edit") {
    nameInput.classList.add("popup_opened");
    jobInput.classList.add("popup_opened");
    subtitle.textContent = "Редактировать профиль";
    nameInput.value = title.textContent;
    jobInput.value = paragraph.textContent;
  } else {
    subtitle.textContent = "Новое место";
    placeNameInput.classList.add("popup_opened");
    placeLinkInput.classList.add("popup_opened");
  }
}

function popupClose() {
  popup.classList.remove("popup_opened");
  nameInput.classList.remove("popup_opened");
  jobInput.classList.remove("popup_opened");
  placeNameInput.classList.remove("popup_opened");
  placeLinkInput.classList.remove("popup_opened");
}

button_add.addEventListener("click", function(){popupOpen("add")});
button_edit.addEventListener("click", function(){popupOpen("edit")});
button_close.addEventListener("click", popupClose);
form.addEventListener("submit", preventDefault);