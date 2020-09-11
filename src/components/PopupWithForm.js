import { settings } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._form = this._popup.querySelector(settings.formSelector);
    this._inputList = Array.from(this._popup.querySelectorAll(settings.inputSelector));
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector(settings.submitButtonSelector);
  }

  /**
   * Получает массив значений полей формы.
   */
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
    return this._formValues;
  }

  /**
   * Устанавливает начальные значения полей формы.
   * @param {*} initialValues 
   */
  _setInitialInputValues(initialValues) {
    this._inputList.forEach(input => input.value = 
      initialValues[input.name] ? initialValues[input.name] : ''
    );      
  }

  /**
   * Делает кнопку Сохранить на форме недоступной.
   */
  _disableSubmitButton() {
    this._submitButton.classList.add(settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  };

  /**
   * Делает кнопку Сохранить на форме доступной.
   */
  _enableSubmitButton() {
    this._submitButton.classList.remove(settings.inactiveButtonClass);
    this._submitButton.disabled = false;
  };

  /**
   * Устанавливает дополнительные слушатели для событий формы:
   * - слушатель сабмита;
   * - слушатель клика по фону (форма должна закрываться).
   */
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();  
      this._handleEscClose();
    });

    this._popup.addEventListener('click', (evt) => {
      if (!evt.target.closest(settings.formSelector)) {
        this.close();
        this._handleEscClose();      
      }                
    });
  }

  /**
   * Закрывает форму.
   */
  close() {
    super.close();
    this._form.reset();
  }

  /**
   * Открывает форму. 
   * Заполняет поля начальными значениями, если таковые имеются.
   * Управляет доступностью кнопки Сохранить в зависимости от заполненности
   * полей формы. 
   * @param {*} initialValues 
   */
  open(initialValues) {
    if (initialValues) {
      this._setInitialInputValues(initialValues);
      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    }   

    super.open();
  }
}