export default class Section {
  constructor({items, renderer}, selector) {
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach(item => {
      this._container.append(this._renderer(item));
    });
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }
}
