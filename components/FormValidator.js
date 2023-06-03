export default class FormValidator {
  constructor(formSettings, formElement) {
    this._formSettings = formSettings;
    this._formElement = formElement;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._inputElements = Array.form(
      this._formElement.querySelectorAll(this._formSettings.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._formSettings.submitButtonSelector
    );

    this._toggleButtonState();
    this._setEventListeners();
  }

  _showInputError(inputEl) {
    const errorElement = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._formSettings.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._formSettings.errorClass);
  }

  _hideInputError(inputEl) {
    const errorElement = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._formSettings.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._formSettings.errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }
  _hasInvalidInput() {
    return this._inputElements.some((inputEl) => !inputEl.validity.valid);
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._formSettings.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(
        this._formSettings.inactiveButtonClass
      );
      this._submitButton.disabled = false;
    }
  }
  _setEventListeners() {
    this._inputElements.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(inputEl);
        toggleButtonState();
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  enableValidation() {
    this._inputElements.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  resetValidation() {
    this._inputElements.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this._toggleButtonState();
  }
}
