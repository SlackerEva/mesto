const popupEdit = document.querySelector(".popup-edit");
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
const buttonHeart = document.querySelectorAll(".card__button");
const buttonTrash = document.querySelectorAll(".card__button-trash");

const cardTemplate = document.querySelector("#card").content;
const cards = document.querySelector(".cards");

function renderCard(item) {
  const cardElement = createCard(item);
  addListnerToHeart(cardElement.querySelector(".card__button"));
  removeCard(cardElement.querySelector(".card__button-trash"));
  addListnerToImg(cardElement.querySelector(".card__button-show"));
  cards.prepend(cardElement); 
}

function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__img");
  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardElement.querySelector(".card__subtitle").textContent = item.name;
  return cardElement;
}
initialCards.map(item => renderCard(item));

function editProfile(evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  paragraph.textContent = jobInput.value;
  closePopup(popupEdit);
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
  closePopup(popupAdd);
}

const buttonShow = document.querySelectorAll(".card__button-show");
const popupShow = document.querySelector(".popup-show");
const popupAdd = document.querySelector(".popup-add");
const buttonCloseShow = popupShow.querySelector(".popup__close");
const buttonCloseAdd = popupAdd.querySelector(".popup__close");
const buttonCloseEdit = popupEdit.querySelector(".popup__close");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

buttonAdd.addEventListener("click", function() {
  openPopup(popupAdd);
  placeNameInput.value = "";
  placeLinkInput.value = "";
});
buttonEdit.addEventListener("click", function() {
  openPopup(popupEdit);
  nameInput.value = title.textContent;
  jobInput.value = paragraph.textContent;
});
buttonCloseEdit.addEventListener("click", function() {closePopup(popupEdit)});
buttonCloseShow.addEventListener("click", function() {closePopup(popupShow)});
buttonCloseAdd.addEventListener("click", function() {closePopup(popupAdd)});
formEdit.addEventListener("submit", editProfile);
formAdd.addEventListener("submit", addCard);

function addListnerToHeart (item) {
  item.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    eventTarget.getAttribute("src").includes("black") ? eventTarget.setAttribute("src", "images/heart.svg") : eventTarget.setAttribute("src", "images/blackHeart.svg");
  });
}

function removeCard(item) {
  item.addEventListener("click", function () {
   const card = item.closest('.card');
   card.remove();
  });
}

function addListnerToImg(item) {
  item.addEventListener("click", function () {
    openPopup(popupShow);
    const showImg = popupShow.querySelector(".popup__show-img");
    const cardImg = item.querySelector(".card__img");
    showImg.src = cardImg.src;
    showImg.alt = cardImg.alt;
    popupShow.querySelector(".popup__text").textContent = item.querySelector(".card__img").alt;
  });
}