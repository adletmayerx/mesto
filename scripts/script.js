let formElement = document.querySelector('.popup-edit__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
let editButton = document.querySelector('.profile__edit-button');
let popupEdit = document.querySelector('.popup-edit');
let closeEditPopupButton = document.querySelector('.popup-edit__close-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popupEditOpen = () => {
  popupEdit.classList.add('popup_opened');
}
let popupEditClose = () => {
  popupEdit.classList.remove('popup_opened');
}
let formSubmitHandler = evt => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupEditClose();
}
let editProfile = () => {
  popupEditOpen();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

formElement.addEventListener('submit', formSubmitHandler);
closeEditPopupButton.addEventListener('click', popupEditClose);
editButton.addEventListener('click', editProfile);
