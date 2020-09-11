import Popup from './Popup.js';
import { settings } from '../utils/constants.js';

export default class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector(settings.imageSelector);
  }

  /**
   * Устанавливает дополнительные слушатели:
   * - слушатель клика по фону (картинка должна закрываться).
   */
  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('click', (evt) => {
      if (!evt.target.closest(settings.imageSelector)) {
        this.close();
        this._handleEscClose();      
      }                
    });
  }

  /**
   * Открывает форму просмотра карточки.
   * Заполняет наименование и ссылку на картинку.
   * @param {*} param0 
   */
  open({name, link}) {
    const cardCaption = this._popup.querySelector('.popup__card-caption');
    cardCaption.textContent = name;

    const popupImage = this._popup.querySelector('.popup__card-image');
    popupImage.src = link;    

    super.open();
  }
}