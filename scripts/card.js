class Card {
  constructor(card, template) {
    this._card = card;
    this._template = template;
  }



  generateCard() {
    this._getTemplate();
    this._setEventListeners();

    this._elementTitle.textContent = this._card.name;
    this._elementImage.src = this._card.link;
    this._elementImage.alt = this._card.name;

    return this._element;
  }

  _getTemplate() {
    this._element = this._template.querySelector('.element').cloneNode(true);
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._removeButton = this._element.querySelector('.element__remove-button');
    this._likeButton = this._element.querySelector('.element__like-button');
  }

  _setEventListeners() {
    this._removeButton.addEventListener('click', this._removeElement);
    this._likeButton.addEventListener('click', this._togglelike);

    this._elementImage.addEventListener('click', function() {
      openPopupImage();

      popupImageImage.src = this._card.link;
      popupImageCaption.textContent = this._card.name;
      popupImageImage.alt = this._card.name;
    });
  }

  _removeElement = (evt) => {
    evt.target.closest('.element').remove();
  }

  _togglelike = (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  }
};

export {Card};
