document.querySelector(".button-edit").addEventListener("click", function () {
  let popup = document.querySelector(".popup");
  popup.classList.add("popup_opened");
}); 

document.querySelector(".popup__close").addEventListener("click", popupClose);

document.querySelector(".button-save").addEventListener("click", function (evt) {
  evt.preventDefault();
  let nameInput = document.querySelector(".popup__name");
  let jobInput = document.querySelector(".popup__job");
  let title = document.querySelector(".intro__title");
  let paragraph = document.querySelector(".intro__paragraph");
  title.textContent = nameInput.value;
  paragraph.textContent = jobInput.value;
  popupClose();
}); 

function popupClose() {
  let popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
}