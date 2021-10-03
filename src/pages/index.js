import './index.css';

import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
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

const api = new Api('https://nomoreparties.co/v1/cohort-28');
const userId = api.getUserInfo().then(data => {
  return data._id;
});

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

const popupDelete = new PopupWithConfirm('.popup-delete', deleteFormSubmitHandler);



function createCard(item) {
  return new Card(item, '#element-template', onCardClick, userId, onRemoveButtonClick, onLikeButtonClick).generateCard();
}

function onLikeButtonClick(likeButton, cardId, likeCounter) {
  if (likeButton.classList.contains('element__like-button_active')) {
    api.removeLike(cardId).then(res => {
      likeCounter.textContent = res.likes.length;
    }).then(() => {
      likeButton.classList.toggle('element__like-button_active');
    });
  } else {
    api.addLike(cardId).then(res => {
      likeCounter.textContent = res.likes.length;
    }).then(() => {
      likeButton.classList.toggle('element__like-button_active');
    });
  }
}


function deleteFormSubmitHandler(card, cardId) {
  api.deleteCard(cardId).then(() => {
    card.remove();
  });
  popupDelete.close();
}

function onRemoveButtonClick(card, cardId) {
  popupDelete.open(card, cardId);
}

function editProfile() {
  popupEdit.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
}
function editFormSubmitHandler({name, about}) {
  api.editProfile({name, about}).then(data => {
    userInfo.setUserInfo(data)
  });
  popupEdit.close();
}
function addElement() {
  popupAdd.open();
}
function addFormSubmitHandler( {title, link} ) {
  api.addCard({name: title, link: link}).then( ( {name, link, likes} ) => {
    const cardsSection = new Section ({renderer: createCard}, ".elements");
    cardsSection.addItem( {name: name, link: link, alt: name, likes: likes});
  });

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
popupDelete.setEventListeners();





api.getUserInfo().then(data => {
  userInfo.setUserInfo(data);
});

api.getInitialCards().then(data => {
  const cardsSection = new Section ({
      items: data,
      renderer: createCard
    }, ".elements");

    cardsSection.renderItems();
});
