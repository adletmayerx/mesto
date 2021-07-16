let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let likeButtons = document.querySelectorAll('.element__like-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupToggle = () => {
  popup.classList.toggle('popup_opened');
}
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupToggle();
}
for (let likeButton of likeButtons) {
    likeButton.addEventListener('click',function() {
      likeButton.classList.toggle('element__like-button-active');
    });
}
let editProfile = () => {
  popupToggle();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', popupToggle);
editButton.addEventListener('click', editProfile);
