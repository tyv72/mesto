/**
 * Открывает попап.
 * 
 * @param {*} modalWindow Попап, который нужно открыть.
 */
const openModal = function(modalWindow) {
  modalWindow.classList.add('popup_opened');
}

/**
 * Закрывает попап.
 * 
 * @param {*} modalWindow Попап, который нужно закрыть.
 */
const closeModal = function(modalWindow) {
  modalWindow.classList.remove('popup_opened');
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
      closeModal(activePopup);    
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

/**
 * Закрывает попап по клику за пределами попапа (по фону).
 * @param {*} evt 
 */
const closePopupByClickOnOutOfBound = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    resetPopupForm(evt.target);
    closeModal(evt.target);
    clearEscListener();
  }
};

export { 
  openModal, 
  closeModal, 
  getModalForm, 
  setEscListener, 
  clearEscListener, 
  closePopupByClickOnOutOfBound 
};