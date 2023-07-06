import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _setInputsValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // _getInputValues() {
  //   const values = {};
  //   inputs.forEach((input) => {
  //     values[input.name] = input.value;
  //   });
  //   return values;
  // }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      const inputValues = this._setInputsValues();
      this._handleFormSubmit(inputValues);
    });
    this._setInputsValues({});
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
