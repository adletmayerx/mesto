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
const tittleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

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
  const removeButton = element.querySelector('.element__remove-button');
  const likeButton = element.querySelector('.element__like-button');

  elementTitle.textContent = card.name;
  elementImage.src = card.link;

  removeButton.addEventListener('click', function() {
    removeButton.closest('.element').remove();
  });
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('element__like-button_active');
  });

  elements.append(element);
});

const popupEditOpen = () => {
  popupEdit.classList.add('popup_opened');
}
const popupEditClose = () => {
  popupEdit.classList.remove('popup_opened');
}
const editFormSubmitHandler = evt => {
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
const popupAddOpen = () => {
  tittleInput.value = '';
  linkInput.value = '';
  popupAdd.classList.add('popup_opened');
}
const popupAddClose = () => {
  popupAdd.classList.remove('popup_opened');
}
const addFormSubmitHandler = evt => {
  evt.preventDefault();
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const removeButton = element.querySelector('.element__remove-button');
  const likeButton = element.querySelector('.element__like-button');

  removeButton.addEventListener('click', function(evt) {
    removeButton.closest('.element').remove();
  });
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('element__like-button_active');
  });

  elementTitle.textContent = tittleInput.value;
  elementImage.src = linkInput.value;

  elements.prepend(element);

  tittleInput.value = '';
  linkInput.value = '';

  popupAddClose();
}
const addElement = () => {
  popupAddOpen();
}


editFormElement.addEventListener('submit', editFormSubmitHandler);
closeEditPopupButton.addEventListener('click', popupEditClose);
editButton.addEventListener('click', editProfile);
addFormElement.addEventListener('submit', addFormSubmitHandler);
closeAddPopupButton.addEventListener('click', popupAddClose);
addButton.addEventListener('click', addElement);






