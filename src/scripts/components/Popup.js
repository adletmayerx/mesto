export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClick = this._handleEscClick.bind(this);

    this._handleEscClick = this._handleEscClick.bind(this);
    this._onOverlayClick = this._onOverlayClick.bind(this);
  }

  _handleEscClick(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClick);
    document.addEventListener('click', this._onOverlayClick);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClick);
    document.removeEventListener('click', this._onOverlayClick);
  }

  _onOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener("click", () => this.close());
  }
}
