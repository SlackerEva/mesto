import {heartImage, blackHeartImage} from "../utils/constants.js";
export class Card {
  constructor({item, id, api, handleCardClick}, cardTemplate) {
    this._link = item.link;
    this._name = item.name;
    this._likes = item.likes;
    this._id = item._id;
    this._mainId = id;
    this._owner = item.owner._id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._element = this._getTemplate();
    this._cardLikeCount = this._element.querySelector(".card__like-count");
    this._cardLikes = this._element.querySelector(".card__like");  
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  _addCardListners(item) {
    this._addListnerToHeart(item.querySelector(".card__button"));
    item.querySelector(".card__button-show").addEventListener('click', this._handleCardClick);
    item.querySelector(".card__button-trash").addEventListener('click', this._handleButtonClick);
    this._removeCard(item.querySelector(".card__button-trash"));
  }

  _addListnerToHeart(item) {
    item.addEventListener("click", (evt) => {
      const eventTarget = evt.target;
      eventTarget.classList.toggle("card__like_active");
      eventTarget.classList.contains("card__like_active") ? this._addLike() : this._removeLike();
    });
  }
  
  _addLike() {
    this._api.giveLike(this._id)
    .then((items) => {
      this._cardLikeCount.textContent = items.likes.length;
      this._cardLikes.setAttribute("src", blackHeartImage);
    })
    .catch((err) => {console.log(err)});
  }

  _removeLike() {
    this._api.takeLike(this._id)
    .then((items) => {
      this._cardLikeCount.textContent = items.likes.length;
      this._cardLikes.setAttribute("src", heartImage);
    })
    .catch((err) => {console.log(err)});
  }

  _checkLike() {
    if (this._likes.length > 0){
      this._likes.forEach((item) => {
        if (item._id == this._mainId) { 
          this._cardLikes.setAttribute("src", blackHeartImage);
        } 
      })
    }
  }

  _removeCard(item) {
    item.addEventListener("click", () => {
     const card = item.closest(".card");
     card.remove();
    });
  }

  _showTrashBean() {
    if (this._owner != this._mainId) {
      const cardButtonTrash = this._element.querySelector(".card__button-trash");
      cardButtonTrash.classList.add("not-show-trashbean");
    }
  }

  createCard() {
    this._showTrashBean();
    const cardImg = this._element.querySelector(".card__img");    
    cardImg.src = this._link;
    cardImg.alt = this._name;
    this._cardLikeCount.textContent = this._likes.length;
    this._element.querySelector(".card__subtitle").textContent = this._name;
    this._addCardListners(this._element);
    this._checkLike();
    return this._element;
  }
}
