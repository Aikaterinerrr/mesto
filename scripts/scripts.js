let editButton = document.querySelector('.profile__edit-btn');
let modal = document.querySelector('.modal');
let closeButton = document.querySelector('.modal__close-btn');
let formElement = document.querySelector('.modal__form');
let nameInput = document.querySelector('.modal__user-info_value_user-name');
let jobInput = document.querySelector('.modal__user-info_value_user-job');
let profileUserName = document.querySelector('.profile__user-name');
let profileDescription = document.querySelector('.profile__description');



function openModal() {
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileDescription.textContent;
  modal.classList.add('modal_active');
};

function closeModal() {
  modal.classList.remove('modal_active')
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal()
}

editButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
formElement.addEventListener('submit', formSubmitHandler);
