let popup = document.querySelector(".popup");
let button_edit = document.querySelector(".intro__button-edit");
let button_close = document.querySelector(".popup__close");
let form = document.querySelector(".popup__content");
let nameInput = document.querySelector("input[name='username']");
let jobInput = document.querySelector("input[name='userjob']");

function preventDefault(evt) {
  evt.preventDefault();
  let title = document.querySelector(".intro__title");
  let paragraph = document.querySelector(".intro__paragraph");
  title.textContent = nameInput.value;
  paragraph.textContent = jobInput.value;
  popupClose();
}; 

function popupOpen() {
  popup.classList.add("popup_opened");
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

button_edit.addEventListener("click", popupOpen);
button_close.addEventListener("click", popupClose);
form.addEventListener("submit", preventDefault);