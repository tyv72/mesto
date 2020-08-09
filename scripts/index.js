/** Шаблоны для создания элементов */
const cardTemplate = document.querySelector('#card').content;

/** Элементы на странице */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const cardGallery = document.querySelector('.card-gallery');

/** Модалки */
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addCardModal = document.querySelector('.popup_type_add-card');
const viewCardModal = document.querySelector('.popup_type_view-card');

/**
 * Возвращает форму из переданного попапа.
 * @param {*} popup 
 */
const getModalForm = function(popup) {
  return popup.querySelector('.popup__container');
};

/**
 * Возвращает кнопку закрытия попапа.
 * @param {*} popup 
 */
const getCloseButton = function(popup) {
  return popup.querySelector('.popup__close-button');
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
 * Заполняет поля формы редактирования значениями из профиля.
 */
const fillEditFormFields = function() {
  const nameField = editProfileModal.querySelector('.popup__field_item_name');
  nameField.value = profileName.innerText;

  const aboutField = editProfileModal.querySelector('.popup__field_item_about');
  aboutField.value = profileAbout.innerText;

  const saveButton = editProfileModal.querySelector('.popup__save-button');
  saveButton.classList.remove('popup__save-button_disabled');
  saveButton.classList.add('darkling-button');
  saveButton.disabled = false;
}

/**
 * Открывает форму редактирования профиля.
 */
const openEditInfoForm = function() {
  fillEditFormFields();
  toggleModal(editProfileModal);

  document.addEventListener('keydown', closePopupByEsc);
}

/**
 * Заполняет карточку.
 * @param {*} card 
 */
const fillCard = function(card) {
  const cardImage = card.querySelector('.card__image');
  const cardDescription = card.querySelector('.card__description');

  const popupImage = viewCardModal.querySelector('.popup__card-image');
  popupImage.src = cardImage.src;

  const cardCaption = viewCardModal.querySelector('.popup__card-caption');
  cardCaption.textContent = cardDescription.innerText;
}

/**
 * Открывает форму просмотра карточки.
 */
const openCard = function(event) {
  fillCard(event.target.closest('.card'));
  toggleModal(viewCardModal);
  setEscListener();
}

/**
 * Сохраняет введенные данные профиля. 
 */
const saveInfo = function() {
  profileName.textContent = editProfileModal.querySelector('.popup__field_item_name').value;  
  profileAbout.textContent = editProfileModal.querySelector('.popup__field_item_about').value;  
}

/**
 * Очищает поля формы добавления карточки.
 */
const clearAddCardFormFields = function() {
  addCardModal.querySelector('.popup__field_item_place').value = '';
  addCardModal.querySelector('.popup__field_item_link').value = '';
}

/**
 * Вызывает функцию создания карточки.
 * 
 * @param {*} event 
 */
const createCard = function() {
  renderCard(getCardFromTemplate(
    addCardModal.querySelector('.popup__field_item_place').value,
    addCardModal.querySelector('.popup__field_item_link').value
  ));  
}

/**
 * Создает новую карточку из шаблона.
 * 
 * @param {*} name Наименование места.
 * @param {*} link Ссылка на фотографию места.
 */
const getCardFromTemplate = function(name, link) {
  const card = cardTemplate.cloneNode(true);
  
  const cardLink = card.querySelector('.card__image');
  cardLink.src = link;
  cardLink.alt = name;
  cardLink.addEventListener('click', openCard);

  const cardName = card.querySelector('.card__description');
  cardName.textContent = name;

  const cardTrash = card.querySelector('.card__trash');
  cardTrash.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', toggleLike);

  return card;
}

/**
 * Добавляет карточку в DOM.
 * 
 * @param {*} card 
 */
const renderCard = function(card) {
  cardGallery.prepend(card);
}

/**
 * Удаляет карточку.
 * 
 * @param {*} event 
 */
const deleteCard = function(event) {
  const card = event.target.closest('.card');
  card.remove();
}

/**
 * Добавляет или убирает лайк с карточки.
 * 
 * @param {*} event 
 */
const toggleLike = function(event) {
  event.target.classList.toggle('card__like-button_liked');
}

/**
 * Заполняет галерею карточками из предопределенного массива 
 * при открытии или обновлении страницы.
 */
const fillInitialCards = function() {
  initialCards.forEach((card) => {
    renderCard(getCardFromTemplate(card.name, card.link));
  })
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
 * Удаляет слушатель нажатия на Esc.
 */
const clearEscListener = () => {
  document.removeEventListener('keydown', closePopupByEsc);
}

/**
 * Устанавливает слушатель нажатия на Esc.
 */
const setEscListener = () => {
  document.addEventListener('keydown', closePopupByEsc);
}

/**
 * Работа с профилем.
 */
editButton.addEventListener('click', openEditInfoForm);

const editInfoForm = getModalForm(editProfileModal);
editInfoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveInfo(evt);
  toggleModal(editProfileModal);  
  clearEscListener();
});

const closeEditInfoButton = getCloseButton(editProfileModal);
closeEditInfoButton.addEventListener('click', () => {
  editInfoForm.reset();
  toggleModal(editProfileModal);
  clearEscListener();
});

/**
 * Работа с карточкой.
 */
const addCardForm = getModalForm(addCardModal);
addCardForm.addEventListener('submit', () => {
  createCard();
  toggleModal(addCardModal);
  clearEscListener();
});

addButton.addEventListener('click', () => {
  clearAddCardFormFields();
  addCardForm.reset();
  toggleModal(addCardModal);
  setEscListener();
});

const closeAddCardButton = getCloseButton(addCardModal);
closeAddCardButton.addEventListener('click', () => {
  toggleModal(addCardModal);  
  clearEscListener();
});

/**
 * Работа с формой просмотра карточки.
 */
const closeViewCardButton = getCloseButton(viewCardModal);
closeViewCardButton.addEventListener('click', () => {
  toggleModal(viewCardModal);
  clearEscListener();
});

/**
 * Работа с попапами - закрытие по Esc и по клику на фон.
 */
const popups = document.querySelectorAll('.popup');

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
 * Закрывает попап по клику за пределами попапа (по фону).
 * @param {*} evt 
 */
const closePopupByClickOnOutOfBound = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    resetPopupForm(evt.target);
    toggleModal(evt.target);
    clearEscListener();
  }
};

/**
 * Устанавливает на каждый попап слушатели клика по фону.
 */
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByClickOnOutOfBound);
});

fillInitialCards();
