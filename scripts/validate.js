/**
 * Показывает сообщение об ошибке.
 * 
 * @param {*} formElement 
 * @param {*} inputElement 
 * @param {*} errorMessage 
 */
const showInputError = (formElement, inputElement, errorMessage, selectorsList) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  inputElement.classList.add(selectorsList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorsList.errorClass);
};

/**
 * Скрывает сообщение об ошибке.
 * 
 * @param {*} formElement 
 * @param {*} inputElement 
 */
const hideInputError = (formElement, inputElement, selectorsList) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  inputElement.classList.remove(selectorsList.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(selectorsList.errorClass);
};

/**
 * Делает кнопку неактивной.
 * 
 * @param {*} buttonElement 
 * @param {*} inactiveButtonClass 
 */
const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.classList.remove('darkling-button');
  buttonElement.disabled = true;
};

/**
 * Делает кнопку активной.
 * 
 * @param {*} buttonElement 
 * @param {*} inactiveButtonClass 
 */
const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.classList.add('darkling-button');
  buttonElement.disabled = false;
};

/**
 * Проверяет валидность данных, указанных в поле.
 * 
 * @param {*} formElement 
 * @param {*} inputElement 
 */
const isValid = (formElement, inputElement, selectorsList) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectorsList);
  } else {
    hideInputError(formElement, inputElement, selectorsList);
  }
};

/**
 * Проверяет валидность полей формы.
 * @param {*} inputList 
 */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

/**
 * Меняет состояние кнопки в зависимости от валидности полей формы.
 * @param {*} inputList 
 * @param {*} buttonElement 
 */
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {        
    enableButton(buttonElement, inactiveButtonClass);
  }
};

/**
 * Устанавливает слушатели события ввода данных для всех полей формы.
 * 
 * @param {*} formElement 
 */
const setEventListeners = (formElement, selectorsList) => {
  const inputList = Array.from(formElement.querySelectorAll(selectorsList.inputSelector));    
  const saveButton = formElement.querySelector(selectorsList.submitButtonSelector);
    
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, selectorsList);
      toggleButtonState(inputList, saveButton, selectorsList.inactiveButtonClass);
    });
  });
};

/**
 * Подготавливает форму к повторному открытию:
 * вычисляет актуальное состояние кнопки Сохранить и скрывает сообщения об ошибках.
 */
const resetForm = (formElement, selectorsList) => {
  const inputList = Array.from(formElement.querySelectorAll(selectorsList.inputSelector));
  const saveButton = formElement.querySelector(selectorsList.submitButtonSelector);
  toggleButtonState(inputList, saveButton, selectorsList.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, selectorsList);
  });  
};

/**
 * Включает валидацию для всех форм на странице.
 */
const enableValidation = (selectorsList) => {
  const formList = Array.from(document.querySelectorAll(selectorsList.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();         
    });

    formElement.addEventListener('reset', () => {
      resetForm(formElement, selectorsList);            
    });

    setEventListeners(formElement, selectorsList);
  });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
});