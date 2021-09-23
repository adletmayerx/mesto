import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImageImage = this._popup.querySelector('.popup-image__image');
    this._popupImageCaption = this._popup.querySelector('.popup-image__caption');
  }

  open( {src, alt} ) {
    super.open();
    this._popupImage = this._popup;
    this._popupImageImage.src = src;
    this._popupImageCaption.textContent = alt;
    this._popupImageImage.alt = alt;
  }
}
