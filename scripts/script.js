/** Шаблоны для создания элементов */
const cardTemplate = document.querySelector('#card').content;

/** Элементы на странице */
const page = document.querySelector('.page');
const header = document.querySelector('.header');
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
 * Открывает или закрывает попап.
 * 
 * @param {*} modalWindow Попап, который нужно открыть или закрыть.
 */
const toggleModal = function(modalWindow) {
  event.preventDefault();

  modalWindow.classList.toggle('popup_opened');
}

/**
 * Открывает форму редактирования профиля.
 */
const openEditInfoForm = function() {
  const nameField = editProfileModal.querySelector('.popup__field_item_name');
  nameField.value = profileName.innerText;

  const aboutField = editProfileModal.querySelector('.popup__field_item_about');
  aboutField.value = profileAbout.innerText;  

  toggleModal(editProfileModal);
}

/**
 * Открывает форму просмотра карточки.
 */
const openCard = function(event) {
  const card = event.target.closest('.card');

  const cardImage = card.querySelector('.card__image');
  const cardDescription = card.querySelector('.card__description');

  const popupImage = viewCardModal.querySelector('.popup__card-image');
  popupImage.src = cardImage.src;

  const cardCaption = viewCardModal.querySelector('.popup__card-caption');
  cardCaption.textContent = cardDescription.innerText;

  toggleModal(viewCardModal);
}

/**
 * Сохраняет данные профиля по клику на кнопку Сохранить на форме редактирования
 * профиля и закрывает попап.
 * 
 * @param {*} event 
 */
const saveInfo = function(event) {
  event.preventDefault();

  profileName.textContent = editProfileModal.querySelector('.popup__field_item_name').value;  
  profileAbout.textContent = editProfileModal.querySelector('.popup__field_item_about').value;

  toggleModal(editProfileModal);  
}

/**
 * Вызывает функцию создания карточки по клику на кнопку Сохранить на форме 
 * добавления карточки и закрывает попап.
 * 
 * @param {*} event 
 */
const saveCard = function(event) {
  event.preventDefault();

  renderCard(addCard(
    addCardModal.querySelector('.popup__field_item_place').value,
    addCardModal.querySelector('.popup__field_item_link').value
  ));

  toggleModal(addCardModal);
}

/**
 * Создает новую карточку из шаблона.
 * 
 * @param {*} name Наименование места.
 * @param {*} link Ссылка на фотографию места.
 */
const addCard = function(name, link) {
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
    renderCard(addCard(card.name, card.link));
  })
}

/**
 * Работа с профилем.
 */
editButton.addEventListener('click', openEditInfoForm);

const editInfoForm = editProfileModal.querySelector('.popup__container');
editInfoForm.addEventListener('submit', saveInfo);

const closeEditInfoForm = editProfileModal.querySelector('.popup__close-button');
closeEditInfoForm.addEventListener('click', () => {
  toggleModal(editProfileModal);
});

/**
 * Работа с карточкой.
 */
const addCardForm = addCardModal.querySelector('.popup__container');

addButton.addEventListener('click', () => {
  addCardForm.reset();
  toggleModal(addCardModal);
});

addCardForm.addEventListener('submit', saveCard);

const closeAddCardForm = addCardModal.querySelector('.popup__close-button');
closeAddCardForm.addEventListener('click', () => {
  toggleModal(addCardModal);
});

/**
 * Работа с формой просмотра карточки.
 */
const closeViewCardForm = viewCardModal.querySelector('.popup__close-button');
closeViewCardForm.addEventListener('click', () => {
  toggleModal(viewCardModal);
});


fillInitialCards();
