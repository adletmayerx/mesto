import './index.css';

import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import { initialCards } from '../scripts/utils/initial-сards.js';
import { selectors } from '../scripts/utils/selectors.js';
import {
  user,
  nameInput,
  jobInput,
  editButton,
  addButton,
  popupEditFormSelector,
  popupAddFormSelector,
} from "../scripts/utils/constants.js";

const userInfo = new UserInfo({nameSelector: user.nameInfo, aboutSelector: user.aboutInfo, avatarSelector: user.avatar});
const popupWithImage = new PopupWithImage('.popup-image');
const popupAdd = new PopupWithForm('.popup-add', addFormSubmitHandler);
const popupEdit = new PopupWithForm('.popup-edit', editFormSubmitHandler);
// const cardsSection = new Section ({
//   items: initialCards,
//   renderer: createCard
// }, ".elements");
const popupEditFormValidator = new FormValidator(selectors, popupEditFormSelector);

const popupAddFormValidator = new FormValidator(selectors, popupAddFormSelector);

function createCard(item) {
  return new Card(item, '#element-template', onCardClick).generateCard();
}
function editProfile() {
  popupEdit.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
}
function editFormSubmitHandler({name, about}) {
  userInfo.setUserInfo({name, about});
  popupEdit.close();
}
function addElement() {
  popupAdd.open();
}
function addFormSubmitHandler( {title, link} ) {
  cardsSection.addItem( {name: title, link: link, alt: title} );
  popupAdd.close();
}
function onCardClick(evt) {
  const popupImageSrc = evt.target.getAttribute("src");
  const popupImageAlt = evt.target.getAttribute("alt");

  popupWithImage.open( {src: popupImageSrc, alt: popupImageAlt} );
}

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addElement);

popupEditFormValidator.enableValidation();
popupAddFormValidator.enableValidation();
popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupWithImage.setEventListeners();


const api = new Api('https://nomoreparties.co/v1/cohort-28');

api.getUserInfo().then(data => {
  userInfo.setUserInfo(data);
});

api.getInitialCards().then(data => {
  const cardsSection = new Section ({
      items: data,
      renderer: createCard
    }, ".elements");

    cardsSection.renderItems();
})
