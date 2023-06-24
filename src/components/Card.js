export default class Card {
  constructor(cardData, cardSelector, handleCardClick) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._likeButton = null;
    this._deleteButton = null;
    this._previewImage = null;
    this._element = null;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListener() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", this._handleLike);
    this._deleteButton = this._element.querySelector(".card__bin-button");
    this._deleteButton.addEventListener("click", this._handleDelete);
    this._previewImage = this._element.querySelector(".card__image");
    this._previewImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  _handleLike = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDelete = () => {
    this._element.remove();
    this._element = null;
  };

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");
    cardImage.src = this._link;
    cardImage.alt = `Photo of ${this.name}`;
    cardTitle.textContent = this._name;
    this._setEventListener();

    return this._element;
  }
}
