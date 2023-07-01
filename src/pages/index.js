import "../pages/index.css";
//----------------------- Import classes  ------------------------------

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import Card from "../components/Card.js";

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#add-card-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddButton = document.querySelector("#profile-add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileTitleInput = document.querySelector("#profile-title-input");
const cardListEl = ".cards__list";
const previewImageModal = document.querySelector(".modal_type_preview");
const inputSelector = ".modal__input";
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);
const addFormValidator = new FormValidator(validationSettings, profileAddModal);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
const editProfileFormValidator = new FormValidator(
  validationSettings,
  profileEditModal,
  inputSelector
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationSettings,
  profileAddModal,
  inputSelector
);
addCardFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  ({ title, description }) => {
    userInfo.setUserInfo({ title, job: description });
    editProfilePopup.close();
  }
);

profileEditButton.addEventListener("click", openProfilePopup);

function openProfilePopup() {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  editFormValidator.toggleButtonState();
  editProfilePopup.open();
}

editProfilePopup.setEventListeners();

const cardListSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const newCard = createCard({ name, link });
      cardListSection.addItem(newCard);
    },
  },
  cardListEl
);

cardListSection.renderItems();

const previewImagePopup = new PopupWithImage(".modal_type_preview");
previewImagePopup.setEventListeners();

function createCard({ name, link }) {
  const cardElement = new Card(
    { name, link },
    "#card-template",
    ({ name, link }) => {
      previewImagePopup.open({ name, link });
    }
  );
  const generatedCard = cardElement.generateCard();
  const cardImage = generatedCard.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    previewImagePopup.open({ name, link });
  });
  return generatedCard;
}

function submitCard({ title, url }) {
  const newCardData = { name: title, link: url };
  const newCard = createCard(newCardData);
  cardListSection.prependItem(newCard);
  newCardPopup.close();
}

const newCardPopup = new PopupWithForm("#add-card-modal", submitCard);
newCardPopup.setEventListeners();

profileAddButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  newCardPopup.open();
});
