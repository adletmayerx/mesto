let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let likeButtons = document.querySelectorAll('.element__like-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    popup.classList.remove('popup_opened');
}

for (let likeButton of likeButtons) {
  let fillLike = () => {
    likeButton.classList.toggle('element__like-button-active');
  }
  likeButton.addEventListener('click',fillLike);
}

let editProfile = () => {
  popup.classList.add('popup_opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

}

let closePopup = () => {
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', editProfile);
