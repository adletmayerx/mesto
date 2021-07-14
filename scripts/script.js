"use strict"
let likeButtons = document.querySelectorAll('.element__like-button');
for (let likeButton of likeButtons) {
  let fillLike = () => {
    likeButton.classList.toggle('element__like-button-active');
  }
  likeButton.addEventListener('click',fillLike);
}

let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let editProfile = () => {
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', editProfile);


let closeButton = document.querySelector('.popup__close-button');
let closePopup = () => {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);



// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__about');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle');


    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInputValue;
    profileSubtitle.textContent = jobInputValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
