export class Card {
  constructor(card, templateSelector, onCardClick) {
    this._card = card;
    this._templateSelector = templateSelector;
    this._onCardClick = onCardClick;
  }



  generateCard() {
    this._getTemplate();

    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._removeButton = this._element.querySelector('.element__remove-button');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');

    this._setEventListeners();

    this._elementTitle.textContent = this._card.name;
    this._elementImage.src = this._card.link;
    this._elementImage.alt = this._card.name;
    this._likeCounter.textContent = this._card.likes.length;

    return this._element;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._removeButton.addEventListener('click', this._removeElement);
    this._likeButton.addEventListener('click', this._toggleLike);

    this._elementImage.addEventListener('click', this._onCardClick);
  }


  _removeElement = (evt) => {
    evt.target.closest('.element').remove();
  }

  _toggleLike = (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  }
};
