import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  // constructor(selector) {
  //   super(selector);
  // }

  open( {src, alt} ) {
    super.open();
    this._popupImage = this._popup;
    this._popupImage.querySelector('.popup-image__image').src = src;
    this._popupImage.querySelector('.popup-image__caption').textContent = alt;
    this._popupImage.querySelector('.popup-image__image').alt = alt;
  }
}
