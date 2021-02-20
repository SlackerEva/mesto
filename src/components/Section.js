class Section {
  constructor({data, renderer}, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, array) { 
    if (Array.isArray(array)) { 
      this._container.append(element); 
    } else { 
      this._container.prepend(element); 
    } 
  }
}

export {Section};
