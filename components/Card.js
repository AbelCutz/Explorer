export default class Card {
  constructor(cardData, cardSelector) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  _setEventListener() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this.handleLike();
      });
    this._element
      .querySelector(".card__bin-button")
      .addEventListener("click", () => {
        this.handleDelete();
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.handlePreviewImage();
      });
  }

  _handleLike() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._element.remove();
  }

  _handlePreviewImage() {
    const previewImageModal = document.querySelector("#preview-modal");
    const previewImage = document.querySelector(".modal__image");
    const previewCaption = document.querySelector(".modal__caption");
    this._element.addEventListener("click", () => {
      previewImage.src = this._name;
      previewImage.src = this._link;
      previewCaption.textContent = this._name;
      openModal(previewImageModal);
    });
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".modal__caption").textContent = this._name;
    this._setEventListener();

    return this._element;
  }
}
