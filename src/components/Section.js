export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    
    this._container = document.querySelector(containerSelector);
  }

  /**
   * Выполняет отрисовку списка карточек.
   */
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  /**
   * Добавляет карточку в разметку.
   * @param {*} element 
   */
  addItem(element) {
    this._container.append(element);
  }
}