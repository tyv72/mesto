let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let popupNameField = document.querySelector('.popup__field_item_name');
let popupAboutField = document.querySelector('.popup__field_item_about');
let popupForm = document.querySelector('.popup__container');

let nameField = document.querySelector('.profile__name');
let aboutField = document.querySelector('.profile__about');

let closePopup = function() {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
}

let openPopup = function() {
  popup.classList.add('popup_opened');
  popup.classList.remove('popup_closed'); 

  popupNameField.value = nameField.innerText;
  popupAboutField.value = aboutField.innerText;
}

let saveInfo = function(event) {
  event.preventDefault();

  nameField.textContent = popupNameField.value;  
  aboutField.textContent = popupAboutField.value;

  closePopup();  
}

closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);
popupForm.addEventListener('submit', saveInfo);