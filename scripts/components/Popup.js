export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClick = this._handleEscClick.bind(this);
  }

  _handleEscClick(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClick);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClick);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}
