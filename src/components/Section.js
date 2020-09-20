export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    
    this._container = document.querySelector(containerSelector);
  }

  /**
   * Выполняет отрисовку списка элементов.
   */
  renderItems(items) {
    const oldItems = Array.from(this._container.children);
    oldItems.forEach((item) => item.remove());

    items.forEach(item => this._renderer(item));
  }

  /**
   * Добавляет элемент в разметку.
   * В зависимости от переданного флага добавляется в начало либо в конец контейнера.
   * @param {*} element 
   * @param {*} isPrepended 
   */
  addItem(element, isPrepended) {
    if (isPrepended) { 
      this._container.prepend(element); 
    } else { 
      this._container.append(element); 
    } 
  }
}