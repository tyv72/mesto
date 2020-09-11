import './index.css'; 

import Card from './../components/Card.js';
import PopupWithForm from './../components/PopupWithForm.js';
import PopupWithImage from './../components/PopupWithImage.js';
import Section from './../components/Section.js';
import UserInfo from './../components/UserInfo.js';
import FormValidator from './../components/FormValidator.js';
import { settings, initialCards } from './../utils/constants.js';

/** Элементы на странице */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

/** Объект профиля пользователя */
const userInfo = new UserInfo('.profile__name', '.profile__about');
userInfo.setUserInfo({name: 'Жак-Ив Кусто', about: 'Исследователь океана'});

/** Объект для просмотра выбранной карточки */
const cardViewModal = new PopupWithImage('.popup_type_view-card');
cardViewModal.setEventListeners();

/** Объект галереи с карточками */
const cardGallery = new Section(
  { 
    items: initialCards, 
    renderer: ({place, link}) => {
      const card = new Card(
        place, 
        link, 
        cardViewModal.open.bind(cardViewModal), 
        '#card'
      );
      cardGallery.addItem(card.getView());
    } 
  },
  '.card-gallery'
);

/** Объект формы редактирования профиля пользователя */
const editProfileModal = new PopupWithForm(
  '.popup_type_edit-profile', 
  (user) => {
    userInfo.setUserInfo(user);
    profileName.textContent = user.name;  
    profileAbout.textContent = user.about;
  }
);
editProfileModal.setEventListeners();

/** Объект формы добавления карточки */
const addCardModal = new PopupWithForm(
  '.popup_type_add-card', 
  ({place, link}) => {
    const card = new Card(
      place, 
      link,
      cardViewModal.open.bind(cardViewModal), 
      '#card'
    );
    
    cardGallery.addItem(card.getView());  
  }
);
addCardModal.setEventListeners();

/** Установка слушателя клика по кнопке редактирования профиля пользователя */
editButton.addEventListener('click', () => {
  editProfileModal.open(userInfo.getUserInfo());
});

/** Установка слушателя клика по кнопке добавления карточки */
addButton.addEventListener('click', () => {
  addCardModal.open();
});

/** Отрисовка галереи карточек */
cardGallery.renderItems();

/** Установка валидаторов форм */
const formList = Array.from(document.querySelectorAll(settings.formSelector));

formList.forEach((formElement) => {
  new FormValidator(settings, formElement).enableValidation();
});