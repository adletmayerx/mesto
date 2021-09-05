export class FormValidator {
  constructor(selectors) {
    this._selectors = selectors;
  }

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._selectors.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });

      this._setEventListeners(formElement);

    });
  };

  _setEventListeners = formElement => {
    const inputList = Array.from(formElement.querySelectorAll(this._selectors.inputSelector));
    const buttonElement = formElement.querySelector(this._selectors.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    formElement.addEventListener('reset', () => {
      this._toggleButtonState(inputList, buttonElement);
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._selectors.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._selectors.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput = inputList => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectors.errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = '';
  };

}
