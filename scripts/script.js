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
const popuAddFrom = document.querySelector('.popup-add__form');

const removeElement = (evt) => {
  evt.target.closest('.element').remove();
}
const togglelike = (evt) => {
  evt.target.classList.toggle('element__like-button_active');
}
const createElement = card => {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const removeButton = element.querySelector('.element__remove-button');
  const likeButton = element.querySelector('.element__like-button');

  elementTitle.textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.name;

  removeButton.addEventListener('click', removeElement);
  likeButton.addEventListener('click', togglelike);

  elementImage.addEventListener('click', function() {
    openPopupImage();

    popupImageImage.src = card.link;
    popupImageCaption.textContent = card.name;
    popupImageImage.alt = card.name;
  });

  return element;
}
initialCards.forEach(function(item) {
  elements.append(createElement(item));
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
closeEditPopupButton.addEventListener('click', closePopup(popupEdit));
editButton.addEventListener('click', editProfile);
addFormElement.addEventListener('submit', addFormSubmitHandler);
closeAddPopupButton.addEventListener('click', closePopupAdd);
addButton.addEventListener('click', addElement);
popupImageCloseButton.addEventListener('click', closePopupImage);
