import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  openModal,
  closeModal,
  closeModalByEscape,
  closeModalOnRemoteClick,
} from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
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
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

//----------------------- privew image modal -----------------------------
const previewImageModal = document.querySelector("#preview-modal");
// const previewImage = document.querySelector(".modal__image");
// const previewCaption = document.querySelector(".modal__caption");
const previewImageCloseButton =
  previewImageModal.querySelector("#image-modal-close");

const addCardSubmitButton = addCardModal.querySelector(
  config.submitButtonSelector
);

//----------------------- Functions  -------------------------------------
// function getCardElement(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__bin-button");
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });
//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });
//   cardImageEl.addEventListener("click", (evt) => {
//     evt.preventDefault();
//     openModal(previewImageModal);
//     previewCaption.textContent = data.name;
//     previewImage.src = data.link;
//     previewImage.alt = data.name;
//   });
//   cardImageEl.setAttribute("src", data.link);
//   cardImageEl.setAttribute("alt", data.name);
//   cardTitleEl.textContent = data.name;
//   return cardElement;
// }

function handleAddCardSubmit(evt, addCardSubmitButton) {
  evt.preventDefault();
  const name = cardAddTitleInput.value;
  const link = cardAddImageInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  openModal(profileEditModal);
}

//----------------------- Event Listener -----------------------------------

profileEditButton.addEventListener("click", () => {
  openEditProfileModal();
  profileEditFormValidator.resetValidation();
});

profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
  profileEditFormValidator.resetValidation();
});

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  openModal(addCardModal);
});
addCardModalCloseButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  closeModal(addCardModal);
});
previewImageCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

//----------------------- Form Listener-------------------------------------
profileEditFrom.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

//----------------------- Form Validation -----------------------------------
const addCardFormValidator = new FormValidator(config, addCardForm);
const profileEditFormValidator = new FormValidator(config, profileEditFrom);

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
