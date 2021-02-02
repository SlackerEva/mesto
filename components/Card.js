import {heartImage, blackHeartImage} from "../utils/constants.js";
export class Card {
  constructor({item, handleCardClick}, cardTemplate) {
    this._link = item.link;
    this._name = item.name;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  _addCardListners(item) {
    this._addListnerToHeart(item.querySelector(".card__button"));
    item.querySelector(".card__button-show").addEventListener('click', this._handleCardClick);
    this._removeCard(item.querySelector(".card__button-trash"));
  }

  _addListnerToHeart(item) {
    item.addEventListener("click", function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle("card__like_active");
      eventTarget.classList.contains("card__like_active") ? eventTarget.setAttribute("src", blackHeartImage) : eventTarget.setAttribute("src", heartImage);
    });
  }

  _removeCard(item) {
    item.addEventListener("click", function () {
     const card = item.closest(".card");
     card.remove();
    });
  }

  createCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector(".card__img");
    cardImg.src = this._link;
    cardImg.alt = this._name;
    this._element.querySelector(".card__subtitle").textContent = this._name;
    this._addCardListners(this._element);
    return this._element;
  }
}
