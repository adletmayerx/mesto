export {user, nameInput, jobInput, editButton, addButton, popupEditFormSelector, popupAddFormSelector, profileImageContainer};

const user = {
  nameInfo: '.profile__title',
  aboutInfo: '.profile__subtitle',
  avatar: '.profile__image'
}

const nameInput = document.querySelector('.popup__input_type_name');

const jobInput = document.querySelector('.popup__input_type_about');

const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

const popupEditFormSelector = '.popup-edit__form';

const popupAddFormSelector = '.popup-add__form';

const profileImageContainer = document.querySelector('.profile__image-container');
