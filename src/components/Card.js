class Card {
  constructor({item, id, api, heartImage, blackHeartImage, handleCardClick, handleButtonClick}, cardTemplate) {
    this._link = item.link;
    this._name = item.name;
    this._likes = item.likes;
    this._id = item._id;
    this._mainId = id;
    this._owner = item.owner._id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleButtonClick = handleButtonClick;
    this._api = api;
    this._heartImage = heartImage;
    this._blackHeartImage = blackHeartImage;
    this._element = this._getTemplate();
    this._trashBean = this._element.querySelector(".card__button-trash");
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
    this._trashBean.addEventListener('click', this._handleButtonClick);
    this._removeCard();
  }

  _addListnerToHeart(item) {
    item.addEventListener("click", () => {
      this._cardLikes.classList.toggle("card__like_active");
      this._cardLikes.classList.contains("card__like_active") ? this._addLike() : this._removeLike();
    });
  }
  
  _addLike() {
    this._api.giveLike(this._id)
    .then((items) => {
      this._setLike(items, this._blackHeartImage);
    })
    .catch((err) => {console.log(err)});
  }

  _removeLike() {
    this._api.takeLike(this._id)
    .then((items) => {
      this._setLike(items, this._heartImage);
    })
    .catch((err) => {console.log(err)});
  }

  _setLike(items, heart) {
    this._cardLikeCount.textContent = items.likes.length;
    this._cardLikes.setAttribute("src", heart);
  }

  _checkLike() {
    if (this._likes.length > 0){
      this._likes.forEach((item) => {
        if (item._id == this._mainId) { 
          this._cardLikes.setAttribute("src", this._blackHeartImage);
        } 
      })
    }
  }

  _removeCard() {
    this._trashBean.addEventListener("click", () => {
     const card = this._trashBean.closest(".card");
     card.remove();
    });
  }

  _showTrashBean() {
    if (this._owner != this._mainId) {
      const cardButtonTrash = this._trashBean;
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

export {Card};
