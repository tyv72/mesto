import './index.css'; 

import Api from './../components/Api.js';

import Card from './../components/Card.js';
import PopupWithForm from './../components/PopupWithForm.js';
import PopupWithImage from './../components/PopupWithImage.js';
import Section from './../components/Section.js';
import UserInfo from './../components/UserInfo.js';
import FormValidator from './../components/FormValidator.js';
import { settings } from './../utils/constants.js';

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-15/",
  headers: {
    authorization: settings.me,
    "content-type": "application/json",
  }
});

/** Элементы на странице */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatarImg = document.querySelector('.avatar');
const profileAvatar = document.querySelector('.profile__avatar');

/** Объект профиля пользователя */
const userInfo = new UserInfo('.profile__name', '.profile__about');

/** Объект для просмотра выбранной карточки */
const cardViewModal = new PopupWithImage('.popup_type_view-card');
cardViewModal.setEventListeners();

/** Объект формы для подтверждения удаления карточки */
const cardRemoveModal = new PopupWithForm(
  '.popup_type_delete-card',
  (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        // при каждом локальном обновлении списка карт (добавлении и удалении карточки)
        // перерисовывается весь список (т.к. другие пользователи могли добавить
        // новые карточки).
        return api.getAllCards();
      })
      .then((cards) => {
        cardGallery.renderItems(cards);
        // форма закрывается только после успешного завершения удаления.
        cardRemoveModal.close();
      })
      .catch((err) => console.log(err));            
  }
);
cardRemoveModal.setEventListeners();

/** Объект-контейнер для хранения списка карточек */
const cardGallery = new Section(
  (data) => {
    // Определяется, нужно ли рисовать иконку удаления на карточке, по данным владельца.
    const isMyCard = data.owner._id === userInfo.getUserId();
    // При создании карточки по данным с сервера определяется, есть ли на ней лайк пользователя,
    // чтобы правильно стилизовать кнопку лайка.
    const hasMyLike = data.likes.some((like) => {return like._id === userInfo.getUserId()});
    
    const card = new Card(
      data,
      isMyCard,
      hasMyLike,
      cardViewModal.open.bind(cardViewModal), 
      cardRemoveModal.open.bind(cardRemoveModal),
      api,
      '#card'
    );
    cardGallery.addItem(card.getView(), isMyCard);
  },
  '.card-gallery'
);

/** Объект формы редактирования профиля пользователя */
const editProfileModal = new PopupWithForm(
  '.popup_type_edit-profile', 
  (user) => {
    api
      .updateUserInfo(user)
      .then((data) => {
        userInfo.setUserInfo(data._id, data.name, data.about);
        profileName.textContent = data.name;  
        profileAbout.textContent = data.about;
        editProfileModal.close();
      })
      .catch((err) => console.log(err));
  }
);
editProfileModal.setEventListeners();

/** Объект формы редактирования аватара */
const editAvatarModal = new PopupWithForm(
  '.popup_type_add-avatar', 
  (avatar) => {
    api
      .updateUserAvatar(avatar)
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
        profileAvatarImg.src = data.avatar;
        editAvatarModal.close();
      })
      .catch((err) => console.log(err));
  }
);
editAvatarModal.setEventListeners();

/** Установка слушателя клика по аватару */
profileAvatar.addEventListener('click', () => {
  editAvatarModal.open({avatar: profileAvatarImg.src});
});

/** Объект формы добавления карточки */
const addCardModal = new PopupWithForm(
  '.popup_type_add-card', 
  ({name, link}) => {
    api
      // перед каждым добавлением карточки обновляется весь список 
      // (т.к. другие пользователи могли добавить новые карточки).
      .getAllCards()
      .then((cards) => {
        cardGallery.renderItems(cards);
        return api.addCard({name, link});
      })
      .then((data) => {
        const card = new Card(
          data,
          true,
          false,
          cardViewModal.open.bind(cardViewModal), 
          cardRemoveModal.open.bind(cardRemoveModal),
          api,
          '#card'
        );
        cardGallery.addItem(card.getView(), true);
        addCardModal.close();
      })      
      .catch((err) => console.log(err));    
  }
);
addCardModal.setEventListeners();

/** Получение данных о пользователе и карточках */
Promise.all([api.getUserInfo(), api.getAllCards()])
  .then((values) => {
    const userData = values[0];
    const cardsData = values[1];
    
    userInfo.setUserInfo(userData._id, userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);

    profileName.textContent = userData.name;  
    profileAbout.textContent = userData.about;
    profileAvatarImg.src = userData.avatar;

    const initialCards = cardsData.map((card) => ({
      _id: card._id, name: card.name, link: card.link, likes: card.likes, owner: card.owner
    }));
    cardGallery.renderItems(initialCards);
  })
  .catch((err) => console.log(err));

/** Установка слушателя клика по кнопке редактирования профиля пользователя */
editButton.addEventListener('click', () => {
  editProfileModal.open(userInfo.getUserInfo());
});

/** Установка слушателя клика по кнопке добавления карточки */
addButton.addEventListener('click', () => {
  addCardModal.open();
});

/** Установка валидаторов форм */
const formList = Array.from(document.querySelectorAll(settings.validatedFormSelector));

formList.forEach((formElement) => {
  new FormValidator(settings, formElement).enableValidation();
});