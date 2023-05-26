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
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__bin-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", (evt) => {
    evt.preventDefault();
    openModal(previewImageModal);
    previewCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
  });
  cardImageEl.setAttribute("src", data.link);
  cardImageEl.setAttribute("alt", data.name);
  cardTitleEl.textContent = data.name;
  return cardElement;
}
function openModal(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}
function closeModal(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}
function renderCard(data, cardListEl) {
  const cardElement = getCardElement(data);
  cardListEl.prepend(cardElement);
}
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(evt, submitButton) {
  evt.preventDefault();
  const name = cardAddTitleInput.value;
  const link = cardAddImageInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardForm.reset();
  toggleButtonState(
    [cardAddTitleInput, cardAddImageInput],
    addCardSubmitButton,
    config
  );
}
function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}
function openEditProfileModal() {
  fillProfileForm();
  openModal(profileEditModal);
}

//----------------------- Escape close Modal ----------------------------
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal__opened");
    closeModal(openedModal);
  }
}
//----------------------- Closing on the Overlay --------------------------

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.target);
  }
}

//----------------------- Event Listener -----------------------------------
profileEditButton.addEventListener("click", openEditProfileModal);
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);
previewImageCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

//----------------------- Form Listener-------------------------------------
profileEditFrom.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

//----------------------- card render array ---------------------------------
initialCards.forEach((data) => renderCard(data, cardListEl));
