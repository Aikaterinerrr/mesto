let editButton = document.querySelector('.profile__edit-btn');
let modal = document.querySelector('.modal');
let closeButton = document.querySelector('.modal__close-btn');

function openModal() {
  modal.classList.add('modal_active')
};

function closeModal() {
  modal.classList.remove('modal_active')
};

editButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

// Находим форму в DOM
let formElement = document.querySelector('.modal__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.modal__username'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.modal__user-info'); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;// Получите значение полей jobInput и nameInput из свойства value

    let profileUsername = document.querySelector('.profile__username'); // Выберите элементы, куда должны быть вставлены значения полей
    let profileDescription = document.querySelector('.profile__description');

    profileUsername.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
    closeModal() // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
