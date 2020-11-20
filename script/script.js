let popup = document.querySelector(".popup");
let button_edit = document.querySelector(".intro__button-edit");
let button_close = document.querySelector(".popup__close");
let form = document.querySelector(".popup__content");
let nameInput = document.querySelector("input[name='username']");
let jobInput = document.querySelector("input[name='userjob']");
let title = document.querySelector(".intro__title");
let paragraph = document.querySelector(".intro__paragraph");

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