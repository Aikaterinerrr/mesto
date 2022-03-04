import './index.css';

import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  editButton,
  addButton,
  submitBtn,
  modalEditSelector,
  modalEditAvatarSelector,
  modalAddSelector,
  modalConfirmationSelector,
  modalImageSelector,
  editFormSelector,
  addFormSelector,
  editAvatarFormSelector,
  nameInput,
  jobInput,
  profileUserNameSelector,
  profileDescriptionSelector,
  profileUserAvatarSelector,
  profileUserAvatar,
  cardListSelector,
  cardTemplateSelector,
  validationConfig
} from '../utils/utils.js';

let ownerId = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: 'cb9ff590-46ff-4deb-baa7-866967fcdc7e',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  userName: profileUserNameSelector,
  userInfo: profileDescriptionSelector,
  userAvatar: profileUserAvatarSelector
});

const addCardModal = new PopupWithForm({
  popupSelector: modalAddSelector,
  handleFormSubmit: () => {
    const newCardInputValues = addCardModal.getInputValues();
    api.addCard({
      name: newCardInputValues.name,
      link: newCardInputValues.link
    })
    .then((res) => {
      const newCard = createNewCard(res);
      cardsSection.addItem(newCard);
      addCardModal.close();
    })
    .catch((err) => {
      console.log(err)
    })
    validateModalTypeAdd.disableButtonState()
  }
});

const deleteCardModal = new PopupWithConfirmation(modalConfirmationSelector);

const editProfileModal = new PopupWithForm({
  popupSelector: modalEditSelector,
  handleFormSubmit: () => {
    api.setUserInfo({
      name: nameInput.value,
      about: jobInput.value
    })
    .then((res) => {
      userInfo.setUserInfo({
        newName: res.name,
        newJob: res.about,
        newAvatar: res.avatar
      })
      editProfileModal.close();
    })
    .catch((err) => {
      console.log(err)
    })
  }
});

const editAvatarModal = new PopupWithForm({
  popupSelector: modalEditAvatarSelector,
  handleFormSubmit: () => {
    const inputValueData = editAvatarModal.getInputValues();
    api.addAvatar({inputValueData})
    .then((res) => {
      userInfo.setAvatar(res.avatar)
      editAvatarModal.close();
    })
    .catch((err) => {
      console.log(err)
    })
  }
});

function createNewCard(newCarddata) {
  const card = new Card({
    data: newCarddata,
    handleCardClick: () => {
      modalImage.open(newCarddata);
    },
    handleDelClick: () => {
      deleteCardModal.submitHandler((evt) => {
        evt.preventDefault();
        api.delCard({
          cardId: newCarddata._id
        })
        .then(() => {
          card._removeCard();
          deleteCardModal.close()
        })
        .catch((err) => {
          console.log(err)
        })
      })
      deleteCardModal.open();
    },
    ownerId,
    addLike: () => {
      api.addLike({
        cardId: newCarddata._id
      })
      .then((res) => {
        card._likesHandler(res)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    removeLike: () => {
      api.removeLike({
        cardId: newCarddata._id
      })
      .then((res) => {
        card._likesHandler(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, cardTemplateSelector);
  const cardElement = card.generateCard();

  return cardElement;
};

const modalImage = new PopupWithImage({
  popupSelector: modalImageSelector
});

const cardsSection = new Section({
  renderer: (item) => {
    const cardItem = createNewCard(item);
    cardsSection.addItem(cardItem)
  },
  containerSelector: cardListSelector
});

const validateModalTypeEdit = new FormValidator(validationConfig, editFormSelector);
validateModalTypeEdit.enableValidation();
const validateModalTypeAdd = new FormValidator(validationConfig, addFormSelector);
validateModalTypeAdd.enableValidation();
const validateModalTypeEditAvatar = new FormValidator(validationConfig, editAvatarFormSelector);
validateModalTypeEditAvatar.enableValidation();

editButton.addEventListener('click', () => {
  editProfileModal.open();
  const recievedInfo = userInfo.getUserInfo();
  nameInput.value = recievedInfo.name;
  jobInput.value = recievedInfo.about;
  validateModalTypeEdit.resetValidation();
});

addButton.addEventListener('click', () => {
  addCardModal.open();
  validateModalTypeAdd.resetValidation();
});

profileUserAvatar.addEventListener('click', () => {
  editAvatarModal.open();
  validateModalTypeEditAvatar.resetValidation();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([recievedUserInfo, recievedInitialCards]) => {
    ownerId = recievedUserInfo._id;
    userInfo.setUserInfo({
      newName: recievedUserInfo.name,
      newJob: recievedUserInfo.about,
      newAvatar: recievedUserInfo.avatar
    });
    cardsSection.renderItems(recievedInitialCards);
  })
  .catch((err) => {
    console.log(err)
  })
