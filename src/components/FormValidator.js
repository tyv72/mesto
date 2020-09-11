class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;
  }

  /**
   * Показывает сообщение об ошибке.
   */
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  /**
   * Скрывает сообщение об ошибке.
   */
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._settings.errorClass);
  };

  /**
   * Делает кнопку неактивной.
   */
  _disableButton = (buttonElement) => {
    buttonElement.classList.add(this._settings.inactiveButtonClass);
    buttonElement.classList.remove(this._settings.darklingButtonClass);
    buttonElement.disabled = true;
  };

  /**
   * Делает кнопку активной.
   */
  _enableButton = (buttonElement) => {
    buttonElement.classList.remove(this._settings.inactiveButtonClass);
    buttonElement.classList.add(this._settings.darklingButtonClass);
    buttonElement.disabled = false;
  };

  /**
   * Проверяет валидность данных, указанных в поле.
   */
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  /**
   * Проверяет валидность полей формы.
   */
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  /**
   * Меняет состояние кнопки в зависимости от валидности полей формы.
   */
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {        
      this._enableButton(buttonElement);
    }
  };

  /**
   * Устанавливает слушатели события ввода данных для всех полей формы.
   */
  _setEventListeners = () => {
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));    
    const saveButton = this._form.querySelector(this._settings.submitButtonSelector);
      
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, saveButton);
      });
    });
  };

  /**
   * Подготавливает форму к повторному открытию:
   * вычисляет актуальное состояние кнопки Сохранить и скрывает сообщения об ошибках.
   */
  _resetForm = () => {
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    const saveButton = this._form.querySelector(this._settings.submitButtonSelector);
    this._toggleButtonState(inputList, saveButton);

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });  
  };

  /**
   * Включает валидацию для формы.
   */
  enableValidation = () => {    
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();         
    });

    this._form.addEventListener('reset', (evt) => {
      evt.preventDefault();
      this._resetForm();            
    });

    this._setEventListeners();    
  };  

}

export default FormValidator;