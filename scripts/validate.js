// ------------------------------------------ Show error message --------------------------
function showInputError(modalEl, inputEl, { inputErrorClass, errorClass }) {
  const element = `#${inputEl.id}-error`;
  const errorMessageEl = modalEl.querySelector(element);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

// ------------------------------------------ Hide error message --------------------------
function hideInputError(modalEl, inputEl, { inputErrorClass, errorClass }) {
  const element = `#${inputEl.id}-error`;
  const errorMessageEl = modalEl.querySelector(element);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

// ------------------------------------------ Check validity --------------------------------
function checkInputValidity(modalEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(modalEl, inputEl, options);
  }
  hideInputError(modalEl, inputEl, options);
}

// ------------------------------------------ Has invalid -----------------------------------
function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

// ------------------------------------------ Toggle Button state ----------------------------
function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

// ------------------------------------------ Event Listeners ---------------------------------
function setEventListeners(modalEl, options) {
  const { inputSelector } = options;
  const inputEls = [...modalEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    const submitButton = modalEl.querySelector(options.submitButtonSelector);
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(modalEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}
// ------------------------------------------ Enable Validation ---------------------------------
function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((modalEl) => {
    modalEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(modalEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
