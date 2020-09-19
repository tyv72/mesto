export default class Card {
  constructor({_id, name, link, likes, owner}, isTrashInvisible, hasMyLike, openCardHandler, removeCardHandler, api, templateSelector) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._isTrashInvisible = isTrashInvisible;
    this._hasMyLike = hasMyLike;

    this._api = api;

    this._openCardHandler = openCardHandler;
    this._removeCardHandler = removeCardHandler;
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

    const cardLikes = this._view.querySelector('.card__likes-count');
    cardLikes.textContent = this._likes.length;

    if (this._isTrashInvisible) {
      this._view.querySelector('.card__trash').classList.add('card__trash_invisible');
    }

    if (this._hasMyLike) {
      const likeButton = this._view.querySelector('.card__like-button');
      likeButton.classList.add('card__like-button_liked');
    }

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
    cardTrash.addEventListener(
      'click', 
      () => this._removeCardHandler({_id: this._id})
    );

    const likeButton = this._view.querySelector('.card__like-button');
    likeButton.addEventListener('click', this._toggleLike);
  }

  /**
   * Добавляет или убирает лайк с карточки.
   */
  _toggleLike = () => {
    const likeButton = this._view.querySelector('.card__like-button');

    if (likeButton.classList.contains('card__like-button_liked')) {
      this._api.removeLike(this._id)
        .then((data) => {
          this._likes = data.likes;
          const cardLikes = this._view.querySelector('.card__likes-count');
          cardLikes.textContent = this._likes.length;
          likeButton.classList.remove('card__like-button_liked');
        })
        .catch((err) => console.log(err));
    } else {
      this._api.setLike(this._id)
        .then((data) => {
          this._likes = data.likes;
          const cardLikes = this._view.querySelector('.card__likes-count');
          cardLikes.textContent = this._likes.length;
          likeButton.classList.add('card__like-button_liked');
        })
        .catch((err) => console.log(err));
    }    
  }  
}