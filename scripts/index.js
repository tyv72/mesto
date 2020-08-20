import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { settings, initialCards } from './utils/constants.js';
import { 
  openModal, 
  closeModal, 
  getModalForm, 
  setEscListener, 
  clearEscListener, 
  closePopupByClickOnOutOfBound 
} from './utils/utils.js';

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
 * Возвращает кнопку закрытия попапа.
 * @param {*} popup 
 */
const getCloseButton = function(popup) {
  return popup.querySelector('.popup__close-button');
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
  openModal(editProfileModal);
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
  const cardName = addCardModal.querySelector('.popup__field_item_place').value;
  const cardLink = addCardModal.querySelector('.popup__field_item_link').value;

  renderCard(new Card(cardName, cardLink, '#card').getView());  
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
 * Заполняет галерею карточками из предопределенного массива 
 * при открытии или обновлении страницы.
 */
const fillInitialCards = function() {
  initialCards.forEach((card) => {
    renderCard(new Card(card.name, card.link, '#card').getView());
  })
}

/**
 * Устанавливает слушателей для кнопки Сохранить формы редактирования профиля,
 * кнопки закрытия формы редактирования профиля.
 */
editButton.addEventListener('click', openEditInfoForm);

const editInfoForm = getModalForm(editProfileModal);
editInfoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveInfo(evt);
  closeModal(editProfileModal);  
  clearEscListener();
});

const closeEditInfoButton = getCloseButton(editProfileModal);
closeEditInfoButton.addEventListener('click', () => {
  editInfoForm.reset();
  closeModal(editProfileModal);
  clearEscListener();
});

/**
 * Устанавливает слушателей для кнопки Добавить, кнопки закрытия формы добавления карточки,
 * кнопки Сохранить формы добавления карточки, кнопки закрытия формы просмотра карточки.
 */
const addCardForm = getModalForm(addCardModal);
addCardForm.addEventListener('submit', () => {
  createCard();
  closeModal(addCardModal);
  clearEscListener();
});

addButton.addEventListener('click', () => {
  clearAddCardFormFields();
  addCardForm.reset();
  openModal(addCardModal);
  setEscListener();
});

const closeAddCardButton = getCloseButton(addCardModal);
closeAddCardButton.addEventListener('click', () => {
  closeModal(addCardModal);  
  clearEscListener();
});

const closeViewCardButton = getCloseButton(viewCardModal);
closeViewCardButton.addEventListener('click', () => {
  closeModal(viewCardModal);
  clearEscListener();
});

/**
 * Устанавливает на каждый попап слушатели клика по фону.
 */
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByClickOnOutOfBound);
});

/**
 * Вызывает функцию заполнения галереи карточками из предопределенного массива.
 */
fillInitialCards();

/**
 * Включает валидацию для всех форм на странице.
 */
const formList = Array.from(document.querySelectorAll(settings.formSelector));

formList.forEach((formElement) => {
  new FormValidator(settings, formElement).enableValidation();
});