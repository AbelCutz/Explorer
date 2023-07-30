import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._confirmationBtn = document.querySelector(
      "#delete-confirmation-modal"
    );
    this._saveButton = document.querySelector(".modal__button");
  }

  setEventListeners() {
    super.setEventListeners();
    document.addEventListener("keydown", this._handleEscClose);
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit();
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmationBtn.textContent = "Saving...";
    } else {
      this._confirmationBtn.textContent = "Yes";
    }
  }
  setSubmitAction(action) {
    this._handleDeleteSubmit = action;
  }
}
