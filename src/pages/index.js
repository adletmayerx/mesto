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
  popupAvatarFormSelector,
  profileImageContainer,
  submitButtons
} from "../scripts/utils/constants.js";

const api = new Api('https://nomoreparties.co/v1/cohort-28');
let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    cardsSection.renderItems(cards);
    userInfo.setUserInfo(userData);
  }).catch((err) => {
    console.log(err);

    return [];
  });

const userInfo = new UserInfo({nameSelector: user.nameInfo, aboutSelector: user.aboutInfo, avatarSelector: user.avatar});
const popupWithImage = new PopupWithImage('.popup-image');
const popupAdd = new PopupWithForm('.popup-add', addFormSubmitHandler);
const popupEdit = new PopupWithForm('.popup-edit', editFormSubmitHandler);
const popupAvatar = new PopupWithForm('.popup-avatar', avatarFormSubmitHandler);
const popupDelete = new PopupWithConfirm('.popup-delete', deleteFormSubmitHandler);
const popupEditFormValidator = new FormValidator(selectors, popupEditFormSelector);
const popupAddFormValidator = new FormValidator(selectors, popupAddFormSelector);
const popupAvatarFormValidator = new FormValidator(selectors, popupAvatarFormSelector);
const cardsSection = new Section({ renderer: createCard }, ".elements");

function addFormSubmitHandler( {title, link} ) {
  submitButtons.addCard.textContent = 'Сохранение...';
  api
    .addCard({ name: title, link: link })
    .then((item) => {
      cardsSection.addItem(item);
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err);

      return [];
    })
    .finally(() => {
      submitButtons.addCard.textContent = "Создать";
    });
}

function editFormSubmitHandler({name, about}) {
  submitButtons.editProfile.textContent = 'Сохранение...';
  api
    .editProfile({ name, about })
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);

      return [];
    })
    .finally(() => {
      submitButtons.editProfile.textContent = "Сохранить";
    });
}

function avatarFormSubmitHandler({avatar}) {
  submitButtons.avatar.textContent = 'Сохранение...';
  api
    .editAvatar({ avatar })
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);

      return [];
    })
    .finally(() => {
      submitButtons.avatar.textContent = "Сохранить";
    });
}

function deleteFormSubmitHandler(card, cardId, deleteCard) {
  submitButtons.deleteCard.textContent = 'Удаление...';
  api
    .deleteCard(cardId)
    .then(() => {
      deleteCard();
      popupDelete.close();
    })
    .catch((err) => {
      console.log(err);

      return [];
    })
    .finally(() => {
      submitButtons.deleteCard.textContent = "Да";
    });
}

function createCard(item) {
  const element = new Card(item, "#element-template", userId, {
    onCardClick: onCardClick,
    onRemoveButtonClick: (card, cardId, deleteCard) => {
      popupDelete.open(card, cardId, deleteCard);
    },
    onLikeButtonClick: (likeButton, cardId) => {
      if (likeButton.classList.contains('element__like-button_active')) {
        api
          .removeLike(cardId)
          .then((res) => {
            element.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);

            return [];
          });
      } else {
        api
          .addLike(cardId)
          .then((res) => {
            element.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);

            return [];
          });
      }
    }
  });
  const card = element.generateCard();

  return card;
}

function onCardClick(link, name) {
  const popupImageSrc = link;
  const popupImageAlt = name;

  popupWithImage.open( {src: popupImageSrc, alt: popupImageAlt} );
}


function editProfile() {
  const userData = userInfo.getUserInfo();
  popupEdit.open();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
}

function addElement() {
  popupAdd.open();
}

function editAvatar() {
  popupAvatar.open();
}




editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addElement);
profileImageContainer.addEventListener('click', editAvatar);

popupEditFormValidator.enableValidation();
popupAddFormValidator.enableValidation();
popupAvatarFormValidator.enableValidation();
popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupWithImage.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();
