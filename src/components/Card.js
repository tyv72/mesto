export default class Card {
  constructor(name, link, openCardHandler, templateSelector) {
    this._name = name;
    this._link = link;
    this._openCardHandler = openCardHandler;
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
    cardImage.addEventListener('click', 
      () => this._openCardHandler({name: this._name, link: this._link}));
    
    const cardTrash = this._view.querySelector('.card__trash');
    cardTrash.addEventListener('click', this._remove);

    const likeButton = this._view.querySelector('.card__like-button');
    likeButton.addEventListener('click', this._toggleLike);
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
    this._view.remove();
  }    
}