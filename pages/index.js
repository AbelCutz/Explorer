import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  handleOpenModal,
  handleCloseModal,
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
const cardTemplate = document.querySelector("#card").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

//----------------------- privew image modal -----------------------------
const previewImageModal = document.querySelector("#preview-modal");
const previewImage = document.querySelector(".modal__image");
const previewCaption = document.querySelector(".modal__caption");
const previewImageCloseButton =
  previewImageModal.querySelector("#image-modal-close");

const addCardSubmitButton = addCardModal.querySelector(
  config.submitButtonSelector
);
//----------------------- Functions  -------------------------------------

initialCards.forEach(function (cardData) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.generateCard();
  cardListEl.prepend(cardElement);
});

const cardData = {
  name: cardAddTitleInput.value,
  link: cardAddImageInput.value,
};
