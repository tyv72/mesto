export const settings = {
  me: 'e582c5c0-e824-4601-99f2-9d5d04a6885a',
  formSelector: '.popup__form',
  validatedFormSelector: '.popup__form_validated',
  popupContainerSelector: '.popup__container',
  inputSelector: '.popup__field',
  closeButtonSelector: '.popup__close-button',
  submitButtonSelector: '.popup__save-button',
  openPopupClass: 'popup_opened',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active',
  darklingButtonClass: 'darkling-button'
};

/** Предопределенный массив с данными для заполнения карточек */
export const initialCards = [
  {
      _id: '11111',
      place: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      likes: [],
      owner: 'e582c5c0-e824-4601-99f2-9d5d04a6885a'
  },
  {
      _id: '11112',
      place: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      likes: [],
      owner: 'e582c5c0-e824-4601-99f2-9d5d04a6885a'
  },
  {
      _id: '11113',
      place: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      likes: [],
      owner: 'e582c5c0-e824-4601-99f2-9d5d04a6885b'
  },
  {
      _id: '11114',
      place: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      likes: [],
      owner: 'e582c5c0-e824-4601-99f2-9d5d04a6885d'
  },
  {
      _id: '11115',
      place: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      likes: [],
      owner: 'e582c5c0-e824-4601-99f2-9d5d04a6885a'
  },
  {
      _id: '11116',
      place: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      likes: [],
      owner: 'e582c5c0-e824-4601-99f2-9d5d04a6885a'
  }
];