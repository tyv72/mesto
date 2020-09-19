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
   * Очищает значения полей формы.
   */
  _clearInputValues() {
    this._inputList.forEach(input => input.value = '');      
  }

  /**
   * Устанавливает дополнительные слушатели для событий формы:
   * - слушатель сабмита.
   */
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues());      
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
   * @param {*} initialValues 
   */
  open(initialValues) {
    this._submitButton.textContent = 'Сохранить';
    
    if (initialValues) {
      this._setInitialInputValues(initialValues);      
    } else {
      this._clearInputValues();
    }  

    this._form.reset();
    super.open();
  }
}