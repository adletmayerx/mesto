const formElement = document.querySelector('.popup-edit__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup-edit');
const closeEditPopupButton = document.querySelector('.popup-edit__close-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function(card) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');

  elementTitle.textContent = card.name;
  elementImage.src = card.link;

  elements.append(element);
});


const popupEditOpen = () => {
  popupEdit.classList.add('popup_opened');
}
const popupEditClose = () => {
  popupEdit.classList.remove('popup_opened');
}
const formSubmitHandler = evt => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupEditClose();
}
const editProfile = () => {
  popupEditOpen();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

formElement.addEventListener('submit', formSubmitHandler);
closeEditPopupButton.addEventListener('click', popupEditClose);
editButton.addEventListener('click', editProfile);

