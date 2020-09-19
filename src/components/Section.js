export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    
    this._container = document.querySelector(containerSelector);
  }

  /**
   * Выполняет отрисовку списка карточек.
   */
  renderItems(items) {
    const oldItems = Array.from(this._container.children);
    oldItems.forEach((item) => item.remove());

    items.forEach(item => this._renderer(item));
  }

  /**
   * Добавляет карточку в разметку.
   * @param {*} element 
   */
  addItem(element) {
    this._container.append(element);
  }
}