import "../pages/index.css";
//----------------------- Import classes  ------------------------------

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  validationSettings,
  profileEditModal,
  profileAddModal,
  profileEditButton,
  profileAddButton,
  profileTitle,
  profileDescription,
  profileDescriptionInput,
  profileTitleInput,
  cardListEl,
  previewImageModal,
  inputSelector,
} from "../utils/constants.js";
import Card from "../components/Card.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title", /// profileTitle
  jobSelector: ".profile__description", // profileDescription
});

const editProfileFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationSettings,
  profileAddModal
);
addCardFormValidator.enableValidation();

const popupSelector = "#image-modal";
const popupWithImage = new PopupWithImage(popupSelector);
const popupWithForm = new PopupWithForm("#form-modal");

const handleCardClick = (cardData) => {
  popupWithImage.open(cardData);
};

const createCard = (cardData) => {
  const card = new Card(cardData, ".card-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement);
    },
  },
  cardListEl
);

//----------------------- Event listeners ------------------------------

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;
  editProfileFormValidator.resetValidation();
  popupWithForm.open();
});

profileAddButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  popupWithForm.open();
});

//----------------------- Initialize ------------------------------

cardList.renderItems();
