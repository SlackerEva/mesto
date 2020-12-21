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

const cardTemplate = document.querySelector("#card").content;
const cardsContainer = document.querySelector(".cards");

function renderCard(item) {
  const cardElement = createCard(item);
  cardsContainer.prepend(cardElement); 
}

function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__img");
  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardElement.querySelector(".card__subtitle").textContent = item.name;
  addListnerToHeart(cardElement.querySelector(".card__button"));
  removeCard(cardElement.querySelector(".card__button-trash"));
  addListnerToImg(cardElement.querySelector(".card__button-show"), item);
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

const popupShow = document.querySelector(".popup-show");
const popupAdd = document.querySelector(".popup-add");
const buttonCloseShow = popupShow.querySelector(".popup__close");
const buttonCloseAdd = popupAdd.querySelector(".popup__close");
const buttonCloseEdit = popupEdit.querySelector(".popup__close");

function closeByEscape(evt) {
  const escapeCode = 27;
  if (evt.keyCode === escapeCode) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup__page')) {
    closePopup(evt.target.closest('.popup'))
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closeByOverlay);
  document.addEventListener('keydown', closeByEscape); 
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closeByOverlay);
  document.removeEventListener('keydown', closeByEscape); 
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
   const card = item.closest(".card");
   card.remove();
  });
}

const showImg = popupShow.querySelector(".popup__show-img");
const popupShowText = popupShow.querySelector(".popup__text");

function addListnerToImg(item, cardValue) {
  item.addEventListener("click", function () {
    openPopup(popupShow);
    showImg.src = cardValue.link;
    showImg.alt = cardValue.name;
    popupShowText.textContent = cardValue.name;
  });
}