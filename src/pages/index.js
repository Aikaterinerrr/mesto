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

//Common options
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: 'cb9ff590-46ff-4deb-baa7-866967fcdc7e',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([recievedUserInfo, recievedInitialCards]) => {
    ownerId = recievedUserInfo._id;
    userInfo.setUserInfo({
      name: recievedUserInfo.name,
      about: recievedUserInfo.about,
      avatar: recievedUserInfo.avatar
    });
    cardsSection.renderItems(recievedInitialCards);
  })
  .catch((err) => {
    console.log(err)
  })

//User and avatar options
const userInfo = new UserInfo({
  userName: profileUserNameSelector,
  userInfo: profileDescriptionSelector,
  userAvatar: profileUserAvatarSelector
});

const editProfileModal = new PopupWithForm({
  popupSelector: modalEditSelector,
  handleFormSubmit: () => {
    editProfileModal.notifyLoadProgress(true, 'Сохранить');
    const profileInputValues = editProfileModal.getInputValues();
    api.setUserInfo({
      name: profileInputValues.name,
      about: profileInputValues.about
    })
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          about: res.about,
          avatar: res.avatar
        })
        editProfileModal.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        editProfileModal.notifyLoadProgress(false, 'Сохранить')
      })
  }
});

const editAvatarModal = new PopupWithForm({
  popupSelector: modalEditAvatarSelector,
  handleFormSubmit: () => {
    editAvatarModal.notifyLoadProgress(true, 'Сохранить');
    const inputValueData = editAvatarModal.getInputValues();
    api.addAvatar({ inputValueData })
      .then((res) => {
        userInfo.setAvatar(res.avatar)
        editAvatarModal.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        editAvatarModal.notifyLoadProgress(false, 'Сохранить')
      })
  }
});

//Card options
const addCardModal = new PopupWithForm({
  popupSelector: modalAddSelector,
  handleFormSubmit: () => {
    addCardModal.notifyLoadProgress(true, 'Создать')
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
      .finally(() => {
        addCardModal.notifyLoadProgress(false, 'Создать')
      })
  }
});

const deleteCardModal = new PopupWithConfirmation(modalConfirmationSelector);

function createNewCard(newCarddata) {
  const card = new Card({
    data: newCarddata,
    handleCardClick: () => {
      modalImage.open(newCarddata);
    },
    handleDelClick: () => {
      deleteCardModal.setSubmitHandler((evt) => {
        evt.preventDefault();
        api.delCard({
          cardId: newCarddata._id
        })
          .then(() => {
            card.removeCard();
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
          card.updateLikes(res)
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
          card.updateLikes(res)
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

//Validation options
const formValidators = {}

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validationConfig);

//Event listeners
editButton.addEventListener('click', () => {
  editProfileModal.open();
  const recievedInfo = userInfo.getUserInfo();
  nameInput.value = recievedInfo.name;
  jobInput.value = recievedInfo.about;
  formValidators['modal__form_type_edit-form'].resetValidation();
});

addButton.addEventListener('click', () => {
  addCardModal.open();
  formValidators['modal__form_type_add-form'].resetValidation();
});

profileUserAvatar.addEventListener('click', () => {
  editAvatarModal.open();
  formValidators['modal__form_type_edit-avatar-form'].resetValidation();
});
