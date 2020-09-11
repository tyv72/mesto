import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super(popupSelector);
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