export default class Card {
  constructor({
    data,
    cardSelector,
    previewImage,
    myUserId,
    handleDeleteCard,
    handleLikes,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardImageClick = previewImage;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikes = handleLikes;
    this._myUserId = myUserId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  deleteCard() {
    this._element.remove();
  }
  _checkIdForDelete() {
    if (this._owner !== this._myUserId) {
      this.removeBin();
    }
  }
  removeBin() {
    this.cardBinBtn.remove();
  }
  updateLikes(likes) {
    this._likes = likes;
    this.displayLikes();
  }
  displayLikes() {
    this._cardLikes.textContent = this._likes.length;
    const isLiked = this.isLiked();
    if (isLiked) {
      this.likeBtn.classList.add("card__like-button_active");
    } else {
      this.likeBtn.classList.remove("card__like-button_active");
    }
  }
  isLiked() {
    return this._likes.some((like) => like._id === this._myUserId);
  }

  _setEventListener() {
    this.likeBtn.addEventListener("click", () => {
      this._handleLikes(this.isLiked());
    });
    this.cardBinBtn.addEventListener("click", () => {
      this._handleDeleteCard(this._id);
    });
    this.cardImage.addEventListener("click", () => {
      this._handleCardImageClick({ name: this._name, link: this._link });
    });
  }
  generateCard() {
    this._element = this._getTemplate();
    this.cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");
    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this.likeBtn = this._element.querySelector(".card__like-button");
    this.cardBinBtn = this._element.querySelector(".card__bin-button");
    this._cardLikes = this._element.querySelector(".card__like-amount");
    this.updateLikes(this._likes);
    this._checkIdForDelete();
    this._setEventListener();

    return this._element;
  }
}
