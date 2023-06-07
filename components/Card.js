import { openModal } from "../utils/utils.js";
export default class Card {
  constructor(cardData, cardSelector) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._likeButton = null;
    this._deleteButton = null;
    this._previewImage = null;
    this._element = null;
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
      this._handlePreviewImage();
    });
  }

  _handleLike = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDelete = () => {
    this._element.remove();
    this._element = null;
  };

  _handlePreviewImage() {
    const previewImageModal = document.querySelector("#preview-modal");
    const previewImage = previewImageModal.querySelector(".modal__image");
    const previewCaption = previewImageModal.querySelector(".modal__caption");

    previewImage.src = this._link;
    previewImage.alt = `Photo of ${this.name}`;
    previewCaption.textContent = this._name;
    openModal(previewImageModal);
  }

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
