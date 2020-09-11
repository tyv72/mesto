
import { settings } from '../utils/constants.js';

export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(settings.closeButtonSelector);
  }

  /**
   * Проверяет, открыт ли попап.
   */
  _isPopupOpened() {
    return this._popup.classList.contains(settings.openPopupClass);
  }

  /**
   * Закрывает попап по нажатию на Esc.
   * @param {*} evt 
   */
  _closePopupByEsc = (evt) => { 
    if ((evt.key === 'Escape') && (this._isPopupOpened())) {
      this.close();    
      this._handleEscClose(false);      
    }
  };

  /**
   * Управляет установкой или снятием слушателя нажатия на Esc
   * в зависимости от того, открывается или закрывается попап.
   * @param {*} isPopupOpening 
   */
  _handleEscClose(isPopupOpening) {
    if (isPopupOpening) {
      document.addEventListener('keydown', this._closePopupByEsc);
    } else {
      document.removeEventListener('keydown', this._closePopupByEsc);
    }    
  }

  /**
   * Устанавливает слушателя клика по кнопке закрытия попапа.
   */
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
      this._handleEscClose();
    });     
  }

  /**
   * Открывает попап.
   */
  open() {
    this._handleEscClose(true);
    this._popup.classList.add(settings.openPopupClass);
  }

  /**
   * Закрывает попап.
   */
  close() {
    this._handleEscClose();
    this._popup.classList.remove(settings.openPopupClass);
  }
}