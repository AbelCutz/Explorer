export default class Card {
  constructor(cardData, cardSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    this._cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardTemplate;
  }

  _setEventListener() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handleLike();
    });
    const deleteButton = this._cardElement.querySelector(".card__bin-button");
    deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _handleLike = () => {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  };

  _handleDelete = () => {
    this._cardElement.remove();
  };

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListener();
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }
}
