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

/** Предопределенный массив с данными для заполнения карточек */
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
 * Работа с профилем.
 */
editButton.addEventListener('click', openEditInfoForm);

const editInfoForm = getModalForm(editProfileModal);
editInfoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveInfo(evt);
  toggleModal(editProfileModal);  
});

const closeEditInfoButton = getCloseButton(editProfileModal);
closeEditInfoButton.addEventListener('click', () => {
  editInfoForm.reset();
  toggleModal(editProfileModal);
});

/**
 * Работа с карточкой.
 */
const addCardForm = getModalForm(addCardModal);
addCardForm.addEventListener('submit', (evt) => {
  createCard();
  toggleModal(addCardModal);
});

addButton.addEventListener('click', () => {
  clearAddCardFormFields();
  addCardForm.reset();
  toggleModal(addCardModal);
});

const closeAddCardButton = getCloseButton(addCardModal);
closeAddCardButton.addEventListener('click', () => {
  toggleModal(addCardModal);  
});

/**
 * Работа с формой просмотра карточки.
 */
const closeViewCardButton = getCloseButton(viewCardModal);
closeViewCardButton.addEventListener('click', () => {
  toggleModal(viewCardModal);
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
  let formElement = getModalForm(popup);
  if (formElement) {
    formElement.reset();
  }      
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      resetPopupForm(evt.target);
      toggleModal(evt.target);
    }
  });
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      resetPopupForm(activePopup); 
      toggleModal(activePopup);    
    }      
  }
});


fillInitialCards();
