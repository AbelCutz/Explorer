import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._confirmationBtn = document.querySelector(".modal__button_delete");
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit();
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmationBtn.textContent = "Deleting...";
    } else {
      this._confirmationBtn.textContent = "Yes";
    }
  }
  setSubmitAction(action) {
    this._handleDeleteSubmit = action;
  }
}
