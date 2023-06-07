import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  openModal,
  closeModal,
  closeModalByEscape,
  closeModalOnRemoteClick,
} from "../utils/utils.js";
import { initialCards, validationSettings } from "../utils/constants.js";

//----------------------- Profile edit modal ------------------------------
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile__title-input");
const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);

//----------------------- Add new card modal ------------------------------
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-close-button"
);
const addCardForm = addCardModal.querySelector(".modal__form");
const cardAddTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardAddImageInput = addCardForm.querySelector(".modal__input_type_link");

//----------------------- Modal form --------------------------------------
const profileEditFrom = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");

//----------------------- privew image modal -----------------------------
const previewImageModal = document.querySelector("#preview-modal");
const previewImageCloseButton =
  previewImageModal.querySelector("#image-modal-close");

const addCardSubmitButton = addCardModal.querySelector(
  validationSettings.submitButtonSelector
);

//----------------------- Functions  -------------------------------------
function handleAddCardSubmit(evt, addCardSubmitButton) {
  evt.preventDefault();
  const name = cardAddTitleInput.value;
  const link = cardAddImageInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardForm.reset();
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  openModal(profileEditModal);
  // profileEditFrom.reset();
}

//----------------------- Event Listener -----------------------------------

profileEditButton.addEventListener("click", () => {
  openEditProfileModal();
  profileEditFormValidator.resetValidation();
});

profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  openModal(addCardModal);
});
addCardModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});
previewImageCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

//----------------------- Form Listener-------------------------------------
profileEditFrom.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

//----------------------- Form Validation -----------------------------------
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
const profileEditFormValidator = new FormValidator(
  validationSettings,
  profileEditFrom
);

addCardFormValidator.enableValidation();
profileEditFormValidator.enableValidation();

initialCards.forEach((data) => renderCard(data, cardListEl));

//----------------------- Card Render Function --------------------------------
function renderCard(data, cardListEl) {
  const card = new Card(data, "#card-template");
  const cardElement = card.generateCard();
  cardListEl.prepend(cardElement);
}

//----------------------- Profile Edit Submit Handler ------------------------
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}
