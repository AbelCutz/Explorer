import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".modal__input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }
  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues());
    });
    super.setEventListeners();
  }
}
