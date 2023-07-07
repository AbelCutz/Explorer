import "../pages/index.css";
//----------------------- Import classes  ------------------------------

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  profileEditModal,
  profileAddModal,
  profileEditButton,
  profileAddButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  cardListEl,
  inputSelector,
  initialCards,
  validationSettings,
} from "../utils/constants.js";
import Card from "../components/Card.js";

//-------------------------------- Form Validator ----------------------------
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

//-------------------------------- UserSection ----------------------------

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

//-------------------------------- EditProfile -----------------------------

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  ({ title, description }) => {
    userInfo.setUserInfo({ title, job: description });
    editProfilePopup.close();
  }
);

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

editProfilePopup.setEventListeners();

//-------------------------------- AddCard ----------------------------

const newCardPopup = new PopupWithForm("#add-card-modal", submitCard);
newCardPopup.setEventListeners();
profileAddButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  newCardPopup.open();
});

//-------------------------------- PreviwImage ----------------------------

const previewImagePopup = new PopupWithImage(".modal_type_preview");
previewImagePopup.setEventListeners();

//-------------------------------- Section  ----------------------------

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

//-------------------------------- Card Functions -----------------------------

function createCard({ name, link }) {
  const cardElement = new Card(
    { name, link },
    "#card-template",
    ({ name, link }) => {
      previewImagePopup.open({ name, link });
    }
  );

  const generateCard = cardElement.generateCard();
  return generateCard;
}

function submitCard({ title, link }) {
  const newCardData = { name: title, link: link };
  const newCard = createCard(newCardData);
  cardListSection.prependItem(newCard);
  newCardPopup.close();
}
