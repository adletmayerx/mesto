import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._submitHandler = handleFormSubmit;
  }

  open(cardId) {
    super.open();
    this._card = cardId;
  }

  cardId() {
    return this._cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card);
    });
  }
}
