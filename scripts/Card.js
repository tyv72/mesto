import { openModal, setEscListener } from './utils/utils.js';

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;    
  }  

  /**
   * Возвращает объект-карточку.
   */
  getView () {
    this._view = this._getTemplate();
    
    const cardImage = this._view.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;

    const cardName = this._view.querySelector('.card__description');
    cardName.textContent = this._name;

    this._setEventListeners();

    return this._view;
  }  

  /**
   * Создает новую карточку из шаблона.
   */
  _getTemplate () {
    const cardTemplate = document.querySelector(this._templateSelector).content.children[0];
    this._view = cardTemplate.cloneNode(true);
    
    return this._view;
  }

  /**
   * Устанавливает слушателей.
   */
  _setEventListeners () {
    const cardImage = this._view.querySelector('.card__image');
    cardImage.addEventListener('click', this._openPopup);
    
    const cardTrash = this._view.querySelector('.card__trash');
    cardTrash.addEventListener('click', this._remove);

    const likeButton = this._view.querySelector('.card__like-button');
    likeButton.addEventListener('click', this._toggleLike);

    return this._view;
  }

  /**
   * Добавляет или убирает лайк с карточки.
   */
  _toggleLike = () => {
    const likeButton = this._view.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_liked');
  }

  /**
   * Удаляет карточку.
   */
  _remove = () => {
    // Попробовала сделать this._view = null, карточка перестала удаляться.
    this._view.remove();
  }

  /**
   * Открывает форму просмотра карточки.
   */
  _openPopup = () => {
    const viewCardModal = document.querySelector('.popup_type_view-card');

    this._fillPopup(viewCardModal);
    openModal(viewCardModal);
    setEscListener();
  }

  /**
   * Заполняет модалку данными текущей карточки.
   */
  _fillPopup = (viewCardModal) => {
    const popupImage = viewCardModal.querySelector('.popup__card-image');
    popupImage.src = this._link;

    const cardCaption = viewCardModal.querySelector('.popup__card-caption');
    cardCaption.textContent = this._name;
  }
  
}

export default Card;