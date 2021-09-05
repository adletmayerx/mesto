import { Card } from './utils/Card.js';
import { FormValidator } from './utils/FormValidator.js';
import { initialCards } from './utils/initial-сards.js';
import { selectors } from './utils/selectors.js';

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
const elementTemplate = document.querySelector('#element-template').content;
const popupAddForm = document.querySelector('.popup-add__form');
const popups = document.querySelectorAll('.popup');


const closeByEsc = (evt) => {
  const opennedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(opennedPopup);
  }
}
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
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
  popupAddForm.reset();
}
const closePopupAdd = () => {
  closePopup(popupAdd);
}
const addFormSubmitHandler = evt => {
  evt.preventDefault();

  elements.prepend(createCard({link: linkInput.value, name: titleInput.value}));

  popupAddForm.reset();

  closePopupAdd();
}
const openPopupImage = () => {
  openPopup(popupImage);
}
const closePopupImage = () => {
  closePopup(popupImage);
}

const onCardClick = (evt) => {
  popupImageImage.src = evt.target.getAttribute("src");
  popupImageCaption.textContent = evt.target.getAttribute("alt");
  popupImageImage.alt = evt.target.getAttribute("alt");

  openPopupImage();
}

const createCard = (data) => {
  return (new Card(data, elementTemplate, onCardClick)).generateCard();
}

initialCards.forEach(function(item) {
  elements.append(createCard(item));
});

editFormElement.addEventListener('submit', editFormSubmitHandler);
editButton.addEventListener('click', editProfile);
addFormElement.addEventListener('submit', addFormSubmitHandler);
addButton.addEventListener('click', addElement);
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup);
        }
    });
});

const formValidator = new FormValidator(selectors);
formValidator.enableValidation();
