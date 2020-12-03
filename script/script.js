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
let form = document.querySelector("form[name='edit-profile']");
let form_add = document.querySelector("form[name='add-card']");
let nameInput = document.querySelector("input[name='username']");
let jobInput = document.querySelector("input[name='userjob']");
let placeNameInput = document.querySelector("input[name='placename']");
let placeLinkInput = document.querySelector("input[name='placelink']");
let title = document.querySelector(".intro__title");
let paragraph = document.querySelector(".intro__paragraph");
let subtitle = document.querySelector(".popup__subtitle");
const button_heart = document.querySelectorAll(".card__button");
const button_trash = document.querySelectorAll(".card__button-trash");

const cardTemplate = document.querySelector("#card").content;
const cards = document.querySelector(".cards");

function buildCard(x) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__img").src = x.link;
  cardElement.querySelector(".card__img").alt = x.name;
  cardElement.querySelector(".card__subtitle").textContent = x.name;
  addListnerToHeart(cardElement.querySelector(".card__button"));
  removeCard(cardElement.querySelector(".card__button-trash"));
  addListnerToImg(cardElement.querySelector(".card__button-show"));
  return cards.prepend(cardElement); 
}
initialCards.map(x => buildCard(x));

function preventDefault(evt) {
  evt.preventDefault();
  const eventTarget = evt.target;
  if (eventTarget.name === "edit-profile") {
    title.textContent = nameInput.value;
    paragraph.textContent = jobInput.value;
  } else {
    let placeName = placeNameInput.value;
    let placeLink = placeLinkInput.value;
    if (placeName !="" && placeLink !="") {
      buildCard({      
        name: placeName,
        link: placeLink
      })
    }
  }
  popupClose();
}; 

function popupOpen(evt) {
  if (evt === "edit") {
    popup.classList.add("popup_opened");
    nameInput.value = title.textContent;
    jobInput.value = paragraph.textContent;
  } else {
    popup_add.classList.add("popup_opened");
  }
}

let button_show = document.querySelectorAll(".card__button-show");
let popup_show = document.querySelector(".popup-show");
let button_close_show = popup_show.querySelector(".popup__close");
let popup_add = document.querySelector(".popup-add");
let button_close_add = popup_add.querySelector(".popup__close");

function popupClose() {
  popup.classList.remove("popup_opened");
  popup_add.classList.remove("popup_opened");
  popup_show.classList.remove("popup_opened");
  placeNameInput.value = "";
  placeLinkInput.value = "";
}

button_add.addEventListener("click", function(){popupOpen("add")});
button_edit.addEventListener("click", function(){popupOpen("edit")});
button_close.addEventListener("click", popupClose);
button_close_show.addEventListener("click", popupClose);
button_close_add.addEventListener("click", popupClose);
form.addEventListener("submit", preventDefault);
form_add.addEventListener("submit", preventDefault);

function addListnerToHeart (x) {
  x.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    eventTarget.getAttribute("src").includes("black") ? eventTarget.setAttribute("src", "images/heart.svg") : eventTarget.setAttribute("src", "images/blackHeart.svg");
  });
}
button_heart.forEach(x => addListnerToHeart(x));

function removeCard(x) {
  x.addEventListener("click", function () {
   let item = x.closest('.card');
   item.remove();
  });

}
button_trash.forEach(x => removeCard(x));

function addListnerToImg(x) {
  x.addEventListener("click", function () {
    popup_show.classList.add("popup_opened");
    popup_show.querySelector(".popup__show-img").src = x.querySelector(".card__img").src;
    popup_show.querySelector(".popup__text").textContent = x.querySelector(".card__img").alt;
  });
}

button_show.forEach(x => addListnerToImg(x));