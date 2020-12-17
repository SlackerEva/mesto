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

function pushedKey(evt, popup) {
  if (evt.keyCode === 27) {
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  //popup.addEventListener("click", function() {closePopup(popup)});
  document.addEventListener('keydown', function(evt) {pushedKey(evt, popup)}); 
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  //popup.removeEventListener("click", function() {closePopup(popup)});
  document.removeEventListener('keydown', function(evt) {pushedKey(evt, popup)}); 
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

const popupElement = document.querySelector(".popup__content");
const popupInput = popupElement.querySelector(".popup__input");

const showInputError = (popupElement, popupInput, errorMessage) => {
  const popupError = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add("popup__input_type_error");
  popupError.textContent = errorMessage;
  popupError.classList.add("popup__input-error");
};

const hideInputError = (popupElement, popupInput) => {
  const popupError = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove("popup__input_type_error");
  popupError.classList.remove("popup__input-error");
  popupError.textContent = "";
};

const isValid = (popupElement, popupInput) => {
  if (!popupInput.validity.valid) {
    showInputError(popupElement, popupInput, popupInput.validationMessage);
  } else {
    hideInputError(popupElement, popupInput);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((popupInput) => {
    return !popupInput.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-save_inactive');
  } else {
    buttonElement.classList.remove('popup__button-save_inactive');
  }
}; 

const setEventListeners = (popupElement) => {
  const inputList = Array.from(popupElement.querySelectorAll(".popup__input"));
  const buttonElement = popupElement.querySelector('.popup__button-save');

  inputList.forEach((popupInput) => {
    popupInput.addEventListener("input", () => {
      isValid(popupElement, popupInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

popupElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

const enableValidation = () => {
  const popupList = Array.from(document.querySelectorAll('.popup__content'));

  popupList.forEach((popupElement) => {
    popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(popupElement);
  });
};

popupInput.addEventListener("input", isValid); 
enableValidation(); 