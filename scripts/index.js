import { initialCards } from './initialCards.js';
import Card from './Сard.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');

const modalEdit = document.querySelector('.modal_type_edit');
const modalAdd = document.querySelector('.modal_type_add');
const modalImage = document.querySelector('.modal_type_image');

const editFormSelector = '.modal__form_type_edit-form';
const addFormSelector = '.modal__form_type_add-form';

const nameInput = document.querySelector('.modal__info_type_user-name');
const jobInput = document.querySelector('.modal__info_type_user-job');

const profileUserNameSelector = '.profile__user-name';
const profileDescriptionSelector = '.profile__description';

const cardListSelector = '.elements__cards';
const cardTemplateSelector = '.elements__template';

export const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__info',
  submitButtonSelector: '.modal__submit-btn',
  inactiveButtonClass: 'modal__submit-btn_inactive',
  inputErrorClass: 'modal__info_type_error',
  errorClass: 'modal__input-error'
};

const userInfo = new UserInfo({
  userName: profileUserNameSelector,
  userInfo: profileDescriptionSelector
});

const editProfileModal = new PopupWithForm({
  popupSelector: modalEdit,
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo({
      newUserName: nameInput.value,
      newUserInfo: jobInput.value
    })
    editProfileModal.close();
  }
});

function createNewCard(newCarddata) {
  const card = new Card({
    data: newCarddata,
    handleCardClick: () => {
      const openModalImage = new PopupWithImage({
        data: newCarddata,
        popupSelector: modalImage
      });
      openModalImage.open(newCarddata);
    }
  }, cardTemplateSelector);
  const cardElement = card.generateCard();

  return cardElement;
};

const addCardModal = new PopupWithForm({
  popupSelector: modalAdd,
  handleFormSubmit: () => {
    const newCardInputValues = addCardModal.getInputValues();
    const newCard = createNewCard(newCardInputValues);
    cardsSection.addItem(newCard);
    validateModalTypeAdd.disableButtonState();
    addCardModal.close();
  }
});

const cardsSection = new Section({
  renderer: (item) => {
    const cardItem = createNewCard(item);
    cardsSection.addItem(cardItem)
  },
  containerSelector: cardListSelector
});

cardsSection.renderItems(initialCards);

const validateModalTypeEdit = new FormValidator(validationConfig, editFormSelector);
validateModalTypeEdit.enableValidation();
const validateModalTypeAdd = new FormValidator(validationConfig, addFormSelector);
validateModalTypeAdd.enableValidation();

editButton.addEventListener('click', () => {
  editProfileModal.open();
  userInfo.getUserInfo();
  nameInput.value = userInfo._userValues.name;
  jobInput.value = userInfo._userValues.info;
  editProfileModal.setEventListeners();
});

addButton.addEventListener('click', () => {
  addCardModal.setEventListeners();
  addCardModal.open();
  validateModalTypeAdd.disableButtonState();
});
