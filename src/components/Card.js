export default class Card {
  constructor({
    data,
    cardSelector,
    handleCardImageClick,
    myUserId,
    handleDeleteCard,
    handleLikeBtn,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardImageClick = handleCardImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeBtn = handleLikeBtn;
    this._myUserId = myUserId;
    this.cardBinBtn = this._cardElement.querySelector(".card__bin-button");
    this.likeBtn = this._cardElement.querySelector(".card__like-button");
  }

  _getTemplate() {
    this._cardTemplate = document
      .querySelector(`${this._cardSelector}`)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _checkIdforDelete() {
    if (this._owner === this._myUserId) {
      this.addBin();
    } else {
      this.removeBin();
    }
  }
  addBin() {
    this.cardBinBtn.classList.remove("card__delete-button_hidden");
  }
  removeBin() {
    this.cardBinBtn.classList.add("card__delete-button_hidden");
  }
  updateLikes(likes) {
    this._likes = likes;
    this.displayLikes();
  }
  displayLikes() {
    this._cardLikes.textContent = this._likes.length;
    const isLiked = this.isLiked();
    if (isLiked) {
      this.likeBtn.classList.remove("card__like-button_active");
    } else {
      this.likeBtn.classList.add("card__like-button_active");
    }
  }
  isLiked() {
    return this._likes.some((like) => like._id === this._myUserId);
  }

  _setEventListener() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardImageClick({ name: this._name, link: this._link });
      });
    this.likeBtn.addEventListener("click", () => {
      this._handleLikeBtn(this._id);
    });
    this.cardBinBtn.addEventListener("click", () => {
      this._handleDeleteCard(this._id);
    });
  }
  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListener();
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this.likeBtn = this._cardElement.querySelector(".card__like-button");
    this.cardBinBtn = this._cardElement.querySelector(".card__bin-button");
    this._cardLikes = this._cardElement.querySelector(".card__like-amount");
    this.updateLikes(this._likes);
    this._checkIdforDelete();

    return this._cardElement;
  }
}
