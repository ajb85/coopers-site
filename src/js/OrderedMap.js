export default class OrderedMap {
  constructor(images = []) {
    this.storage = images
      .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
      .reduce((acc, img, i, arr) => {
        const prevID = i === 0 ? null : arr[i - 1].id;
        const prev = prevID ? acc.get(prevID) : null;
        const node = { value: img, prev };
        if (prev) {
          prev.next = node;
        }
        acc.set(img.id, node);
        return acc;
      }, new Map());

    this.length = this.storage.size;
  }

  get(id) {
    const node = this.storage.get(id);
    if (node) {
      this.id = id;
      return node.value;
    }
    return {};
  }

  nextID(id) {
    return this._cycle(id, 'next');
  }

  prevID(id) {
    return this._cycle(id, 'prev');
  }

  lastID() {
    return this._findEndID('last');
  }

  keys() {
    return this.storage.keys();
  }

  map(cb) {
    const data = [];
    let i = 0;
    const arr = [...this.storage.values()].map(({ value }) => value);
    this.storage.forEach(v => {
      data.push(cb(v.value, i, arr));
      i++;
    });

    return data;
  }

  _findEndID(end) {
    if (!this.length) {
      return 0;
    }
    const keys = [...this.keys()];
    return end === 'first' ? keys[keys.length - 1] : keys[0];
  }

  _cycle(id, direction) {
    if (!this.length) {
      return {};
    }
    const currentNode = this.storage.get(id);
    if (currentNode) {
      const node = currentNode[direction];

      const otherEnd = direction === 'prev' ? 'first' : 'last';
      const newImage = node
        ? node.value
        : this.storage.get(this._findEndID(otherEnd)).value;

      this.id = newImage.id;
      return newImage.id;
    }
    return 0;
  }
}
