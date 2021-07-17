let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popupOpen = () => {
  popup.classList.add('popup_opened');
}
let popupClose = () => {
  popup.classList.remove('popup_opened');
}
let formSubmitHandler = evt => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupClose();
}
let editProfile = () => {
  popupOpen();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', popupClose);
editButton.addEventListener('click', editProfile);
