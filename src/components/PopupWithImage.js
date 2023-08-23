import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = document.querySelector(".modal__image");
    this._previewCaption = document.querySelector(".modal__caption");
  }

  open(name, link) {
    super.open();
    this._previewImage.alt = name;
    this._previewImage.src = link;
    this._previewCaption.textContent = name;
  }
}
