import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super(popupSelector);

    this._cardCaption = this._popup.querySelector('.popup__card-caption');
    this._popupImage = this._popup.querySelector('.popup__card-image');
  }

  /**
   * Открывает форму просмотра карточки.
   * Заполняет наименование и ссылку на картинку.
   * @param {*} param0 
   */
  open({name, link}) {
    this._cardCaption.textContent = name;
    this._popupImage.src = link; 
    this._popupImage.alt = name;   

    super.open();
  }
}