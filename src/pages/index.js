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
  modalEdit,
  modalAdd,
  modalImage,
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
