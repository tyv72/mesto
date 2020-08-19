/**
 * Функции, которые дублируют аналогичные из index.js (до завершения рефакторинга)
 */
const viewCardModal = document.querySelector('.popup_type_view-card');

/**
 * Заполняет модалку с выбранной карточкой.
 * @param {*} card 
 */
const fillPopup = function(cardName, cardLink) {
  const popupImage = viewCardModal.querySelector('.popup__card-image');
  popupImage.src = cardLink;

  const cardCaption = viewCardModal.querySelector('.popup__card-caption');
  cardCaption.textContent = cardName;
}

/**
 * Открывает или закрывает попап.
 * 
 * @param {*} modalWindow Попап, который нужно открыть или закрыть.
 */
const toggleModal = function(modalWindow) {
  modalWindow.classList.toggle('popup_opened');
}

/**
 * Возвращает форму из переданного попапа.
 * @param {*} popup 
 */
const getModalForm = function(popup) {
  return popup.querySelector('.popup__container');
};

/**
 * Перезагружает форму попапа, если она у него есть.
 * 
 * @param {*} popup 
 */
const resetPopupForm = function(popup) {
  const formElement = getModalForm(popup);
  if (formElement) {
    formElement.reset();
  }      
}

/**
 * Закрывает текущий открытый попап по Esc. 
 * После того, как отрабатывает, удаляется.
 * @param {*} evt 
 */
const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      resetPopupForm(activePopup); 
      toggleModal(activePopup);    
      clearEscListener();
    }      
  }
};

/**
 * Устанавливает слушатель нажатия на Esc.
 */
const setEscListener = () => {
  document.addEventListener('keydown', closePopupByEsc);
}

/**
 * Удаляет слушатель нажатия на Esc.
 */
const clearEscListener = () => {
  document.removeEventListener('keydown', closePopupByEsc);
}

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;    
  }  

  /**
   * Создает новую карточку из шаблона.
   */
  getCardFromTemplate () {
    const cardTemplate = document.querySelector(this._templateSelector).content.children[0];
    this._view = cardTemplate.cloneNode(true);
    
    const cardLink = this._view.querySelector('.card__image');
    cardLink.src = this._link;
    cardLink.alt = this._name;

    cardLink.addEventListener('click', this._openPopup);
    
    const cardName = this._view.querySelector('.card__description');
    cardName.textContent = this._name;

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
    this._view.remove();
  }

  /**
   * Открывает форму просмотра карточки.
   */
  _openPopup = () => {
    fillPopup(this._name, this._link);
    toggleModal(viewCardModal);
    setEscListener();
  }
  
}

export default Card;