import "../pages/index.css";
//----------------------- Import classes  ------------------------------

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  profileEditModal,
  profileAddModal,
  profileEditButton,
  avatarEditButton,
  avatarAddModal,
  profileAddButton,
  profileTitleInput,
  profileDescriptionInput,
  cardListEl,
  inputSelector,
  validationSettings,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Api from "../utils/Api.js";

//-------------------------------- UserSection ----------------------------

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// ------------------------------Api -----------------------------------------
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "ac57ec6d-a8c4-4053-9947-30120afdc027",
    "Content-Type": "application/json",
  },
});

// //-------------------------------- Card Function ----------------------------
let currentUserId;
let section;

api
  .getInfo()
  .then(([userData, initialCards]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({ title: userData.name, job: userData.about });
    userInfo.setAvatarInfo(userData.avatar);
    section = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          const newCard = createCard(data);
          section.addItem(newCard);
        },
      },
      cardListEl
    );
    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(cardData) {
  const card = new Card({
    data: cardData,
    cardSelector: "#card-template",
    previewImage: handleCardImageClick,
    myUserId: currentUserId,
    handleDeleteCard: handleCardDelete,
    handleLikes: (isLiked) => {
      if (!isLiked) {
        api
          .addLikes(cardData._id)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .removeLikes(cardData._id)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  return card.generateCard();
}
//---------------------------------- Submit functions ---------------------------------
function handleEditProfileFormSubmit({ title, description }) {
  editProfilePopup.renderLoading(true);
  api
    .userInfoUpdate(title, description)
    .then(() => {
      userInfo.setUserInfo({ title, job: description });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}
function HandleNewCardSubmit({ title, link }) {
  newCardPopup.renderLoading(true);
  api
    .addCard(title, link)
    .then((cardData) => {
      const newCard = createCard(cardData);
      section.addItem(newCard);
      newCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
}
// ------------- delete card function ---------------------
function handleCardDelete(cardId) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        this.deleteClick();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deleteCardPopup.renderLoading(false);
      });
  });
}

//------------------------------- Avatar  -----------------------------------------
function handleAvatarFormSubmit({ link }) {
  avatarProfilePopup.renderLoading(true);
  api
    .avatarUser(link)
    .then((userData) => {
      userInfo.setAvatarInfo(userData.avatar);
      avatarProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarProfilePopup.renderLoading(false);
    });
}

function handleCardImageClick({ name, link }) {
  previewImagePopup.open(name, link);
}

//-------------------------------- Form Validator ----------------------------

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

const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarAddModal,
  inputSelector
);
avatarFormValidator.enableValidation();

//------------------------------ instants -------------------------------------------

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileFormSubmit
);
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#add-card-modal", HandleNewCardSubmit);

newCardPopup.setEventListeners();
profileAddButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  newCardPopup.open();
});

const avatarProfilePopup = new PopupWithForm(
  "#profile-change-image",
  handleAvatarFormSubmit
);
avatarProfilePopup.setEventListeners();
avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarProfilePopup.open();
});
const deleteCardPopup = new PopupWithConfirm("#delete-confirmation-modal");
deleteCardPopup.setEventListeners();

const previewImagePopup = new PopupWithImage(".modal_type_preview");
previewImagePopup.setEventListeners();
