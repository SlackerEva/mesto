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
let button_edit = document.querySelector(".intro__button-edit");
let button_close = document.querySelector(".popup__close");
let form = document.querySelector(".popup__content");
let nameInput = document.querySelector("input[name='username']");
let jobInput = document.querySelector("input[name='userjob']");
let title = document.querySelector(".intro__title");
let paragraph = document.querySelector(".intro__paragraph");

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

function popupOpen() {
  popup.classList.add("popup_opened");
  nameInput.value = title.textContent;
  jobInput.value = paragraph.textContent;
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

button_edit.addEventListener("click", popupOpen);
button_close.addEventListener("click", popupClose);
form.addEventListener("submit", preventDefault);