import {Card} from './card.js';

const editFormElement = document.querySelector('.popup-edit__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup-edit');
const closeEditPopupButton = document.querySelector('.popup-edit__close-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const closeAddPopupButton = document.querySelector('.popup-add__close-button');
const addFormElement = document.querySelector('.popup-add__form');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup-image');
const popupImageCloseButton = document.querySelector('.popup-image__close-button');
const popupImageImage = popupImage.querySelector('.popup-image__image');
const popupImageCaption = popupImage.querySelector('.popup-image__caption');
const popuAddFrom = document.querySelector('.popup-add__form');
const popupsArray = Array.from(document.querySelectorAll('.popup'));
const elementTemplate = document.querySelector('#element-template').content;


initialCards.forEach(function(item) {
  const card = new Card(item, elementTemplate);
  const cardElement = card.generateCard();
  elements.append(cardElement);
});

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}
const openPopupEdit = () => {
  openPopup(popupEdit);
}
const closePopupEdit = () => {
  closePopup(popupEdit);
}
const editProfile = () => {
  openPopupEdit();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
const editFormSubmitHandler = evt => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopupEdit();
}
const addElement = () => {
  openPopup(popupAdd);
  popuAddFrom.reset();
}
const closePopupAdd = () => {
  closePopup(popupAdd);
}
const addFormSubmitHandler = evt => {
  evt.preventDefault();
  elements.prepend(createElement({link: linkInput.value, name: titleInput.value}));

  popuAddFrom.reset();

  closePopupAdd();
}
const openPopupImage = () => {
  openPopup(popupImage);
}
const closePopupImage = () => {
  closePopup(popupImage);
}

editFormElement.addEventListener('submit', editFormSubmitHandler);
closeEditPopupButton.addEventListener('click', closePopupEdit);
editButton.addEventListener('click', editProfile);
addFormElement.addEventListener('submit', addFormSubmitHandler);
closeAddPopupButton.addEventListener('click', closePopupAdd);
addButton.addEventListener('click', addElement);
popupImageCloseButton.addEventListener('click', closePopupImage);
popupsArray.forEach((popup) => {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape'){
        closePopup(popup);
      }
    });

    popup.addEventListener('mousedown', evt => {
      if (evt.target === popup) {
        closePopup(popup);
      }
    })
  });
