export default class OrderedMap {
  constructor(images = []) {
    this.storage = images.reduce((acc, img, i, arr) => {
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
    return this.storage.size ? this.storage.get(id).value : {};
  }

  next(id) {
    return this.storage.size ? this.storage.get(id).next : {};
  }

  prev(id) {
    return this.storage.size ? this.storage.get(id).prev : {};
  }

  lastID() {
    return this.storage.size ? Math.max(...this.keys()) : 0;
  }

  keys() {
    return this.storage.keys();
  }
}
