/** Шаблоны для создания элементов */
const popupTemplate = document.querySelector('#popup').content;
const cardPopupTemplate = document.querySelector('#cardPopup').content;
const cardTemplate = document.querySelector('#card').content;

/** Элементы на странице */
const page = document.querySelector('.page');
const header = document.querySelector('.header');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const cardGallery = document.querySelector('.card-gallery');

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
 * Открывает попап. 
 * В зависимости от того, на какую кнопку кликнули, будет выбран шаблон для попапа 
 * (форма для редактирования профиля, форма для добавления карточки, попап просмотра карточки).
 * 
 * @param {*} event 
 */
const openPopup = function(event) {
  if (event.target.classList.contains('profile__edit-button')) {
    createEditInfoForm();
  } else if (event.target.classList.contains('profile__add-button')){
    createAddCardForm();
  } else {
    createCardPopup(event);
  }  
}

/**
 * Создает из шаблона форму редактирования профиля.
 */
const createEditInfoForm = function() {
  const popup = popupTemplate.cloneNode(true);

  // Событие submit вешается на форму (а не на кнопку Сохранить)
  let editInfoForm = popup.querySelector('.popup__container');
  editInfoForm.addEventListener('submit', saveInfo);

  const popupTitle = popup.querySelector('.popup__title');
  popupTitle.textContent = 'Редактировать профиль';

  const nameField = popup.querySelector('.popup__field_item_name');
  nameField.placeholder = 'Имя';
  nameField.value = profileName.innerText;

  const aboutField = popup.querySelector('.popup__field_item_about');
  aboutField.placeholder = 'Описание';  
  aboutField.value = profileAbout.innerText;

  mountPopup(popup);
}

/**
 * Создает из шаблона форму создания карточки.
 */
const createAddCardForm = function() {
  const popup = popupTemplate.cloneNode(true);
  
  let addCardForm = popup.querySelector('.popup__container');
  addCardForm.addEventListener('submit', saveCard);

  const popupTitle = popup.querySelector('.popup__title');
  popupTitle.textContent = 'Новое место';

  const nameField = popup.querySelector('.popup__field_item_name');
  nameField.placeholder = 'Название';
  
  const aboutField = popup.querySelector('.popup__field_item_about');
  aboutField.placeholder = 'Ссылка на картинку';

  mountPopup(popup);
}

/**
 * Создает из шаблона форму просмотра карточки.
 */
const createCardPopup = function(event) {
  const popup = cardPopupTemplate.cloneNode(true);

  const card = event.target.closest('.card');
  const cardImage = card.querySelector('.card__image');
  const cardDescription = card.querySelector('.card__description');

  const popupImage = popup.querySelector('.popup__card-image');
  popupImage.src = cardImage.src;

  const cardCaption = popup.querySelector('.popup__card-caption');
  cardCaption.textContent = cardDescription.innerText;  

  mountPopup(popup);
}

/**
 * Добавляет на форму попапа общую кнопку Удалить и добавляет созданный попап в DOM.
 *  
 * @param {*} popup Созданный попап.
 */
const mountPopup = function(popup) {
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopup);  

  header.after(popup);  

  const popupElem = page.querySelector('.popup');
  // Если добавить класс непосредственно до или после добавления элемента в DOM,
  // эффекта плавного открытия не будет. Если же вызвать добавление класса с помощью
  // setTimeout, планировщик будет вызывать функцию только после завершения выполнения 
  // текущего кода, и эффект плавного открытия сработает.
  setTimeout(() => popupElem.classList.add('popup_opened'));  
}

/**
 * Сохраняет данные профиля по клику на кнопку Сохранить на форме редактирования
 * профиля и закрывает попап.
 * 
 * @param {*} event 
 */
const saveInfo = function(event) {
  event.preventDefault();

  const container = event.target.closest('.popup__container');
  profileName.textContent = container.querySelector('.popup__field_item_name').value;  
  profileAbout.textContent = container.querySelector('.popup__field_item_about').value;

  closePopup(event);  
}

/**
 * Вызывает функцию создания карточки по клику на кнопку Сохранить на форме 
 * добавления карточки и закрывает попап.
 * 
 * @param {*} event 
 */
const saveCard = function(event) {
  event.preventDefault();

  const container = event.target.closest('.popup__container');
  
  addCard(
    container.querySelector('.popup__field_item_name').value,
    container.querySelector('.popup__field_item_about').value
  );

  closePopup(event);
}

/**
 * Закрывает попап.
 * 
 * @param {*} event 
 */
const closePopup = function(event) {
  event.preventDefault();
  
  const container = event.target.closest('.popup');
  container.classList.remove('popup_opened');

  // Для плавного закрытия попапа из его списка классов удаляется класс с opacity.
  // Удаление попапа из DOM выполняется с задержкой, чтобы анимация успевала отработать корректно. 
  // В данном случае длительность задержки имеет значение и должна быть не меньше, чем
  // длительность, указанная в transition. 
  setTimeout(() => container.remove(), 1000);
}

/**
 * Создает новую карточку с местом и добавляет ее в галерею.
 * 
 * @param {*} name Наименование места.
 * @param {*} link Ссылка на фотографию места.
 */
const addCard = function(name, link) {
  const card = cardTemplate.cloneNode(true);

  const cardLink = card.querySelector('.card__image');
  cardLink.src = link;
  cardLink.addEventListener('click', openPopup);

  const cardName = card.querySelector('.card__description');
  cardName.textContent = name;

  const cardTrash = card.querySelector('.card__trash');
  cardTrash.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', toggleLike);

  // Вставка созданной карточки в начало галереи.
  if (cardGallery.children.length === 0) {
    cardGallery.append(card);
  } else {
    const firstCard = cardGallery.querySelector('.card');
    firstCard.before(card);
  }  
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
    addCard(card.name, card.link);
  })
}

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);

fillInitialCards();
