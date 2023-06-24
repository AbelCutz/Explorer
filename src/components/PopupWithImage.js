import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(".modal__image");
    this._previewCaption = this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    this._previewImage.src = data._link;
    this._previewImage.alt = `Photo of ${data._name}`;
    this._previewCaption.textContent = data._name;
    super.open();
  }
}
