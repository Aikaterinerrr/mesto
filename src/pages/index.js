import './index.css';

import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  initialCards,
  editButton,
  addButton,
  modalEditSelector,
  modalAddSelector,
  modalImageSelector,
  editFormSelector,
  addFormSelector,
  nameInput,
  jobInput,
  profileUserNameSelector,
  profileDescriptionSelector,
  cardListSelector,
  cardTemplateSelector,
  validationConfig
} from '../utils/utils.js'

const userInfo = new UserInfo({
  userName: profileUserNameSelector,
  userInfo: profileDescriptionSelector
});

const editProfileModal = new PopupWithForm({
  popupSelector: modalEditSelector,
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    const newEditProfileInputValues = editProfileModal.getInputValues();
    userInfo.setUserInfo({
      newUserName: newEditProfileInputValues.name,
      newUserInfo: newEditProfileInputValues.job
    })
    editProfileModal.close();
  }
});

function createNewCard(newCarddata) {
  const card = new Card({
    data: newCarddata,
    handleCardClick: () => {
      modalImage.open(newCarddata);
    }
  }, cardTemplateSelector);
  const cardElement = card.generateCard();

  return cardElement;
};

const modalImage = new PopupWithImage({
  popupSelector: modalImageSelector
});

const addCardModal = new PopupWithForm({
  popupSelector: modalAddSelector,
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
  validateModalTypeEdit.resetValidation();
});

addButton.addEventListener('click', () => {
  addCardModal.open();
  validateModalTypeAdd.resetValidation();
});
