
import { settings } from '../utils/constants.js';

export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  /**
   * Закрывает попап по нажатию на Esc.
   * @param {*} evt 
   */
  _closePopupByEsc = (evt) => { 
    if (evt.key === 'Escape') {
      this.close();      
    }
  };

  /**
   * Устанавливает слушателей:
   * - клика по кнопке закрытия попапа;
   * - клика по фону около попапа.
   */
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (!evt.target.closest(settings.popupContainerSelector) 
        || evt.target.closest(settings.closeButtonSelector)) {
        this.close();      
      }                
    });
  }

  /**
   * Открывает попап.
   */
  open() {
    document.addEventListener('keyup', this._closePopupByEsc);
    this._popup.classList.add(settings.openPopupClass);
  }

  /**
   * Закрывает попап.
   */
  close() {
    document.removeEventListener('keyup', this._closePopupByEsc);
    this._popup.classList.remove(settings.openPopupClass);
  }
}