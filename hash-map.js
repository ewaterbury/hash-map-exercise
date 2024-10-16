class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    const newNode = (key, value) => {
      class Node {
        constructor(key, value) {
          this.key = key;
          this.value = value;
          this.next = null;
        }
      }
      return new Node(key, value);
    };

    const getTail = (list = this.head) => {
      if (list === null) return list;
      if (list.next === null) return list;
      return this.tail(list.next);
    };

    if (this.head === null) this.head = newNode(key, value);
    else {
      let node = getTail();
      node.next = newNode(key, value);
    }
  }

  getNode = (index, list = this.head, n = 0) => {
    if (list.next === null && index !== n) return false;
    if (index === n) return list;
    n++;
    return this.getNode(index, list.next, n);
  };

  getValue(key, list = this.head, index = 0) {
    if (list.key === key) return list.value;
    if (list.next === null) return null;
    index++;
    return this.getValue(key, list.next, index);
  }

  getKey(key, list = this.head, index = 0) {
    if (list.key === key) return list.key;
    if (list.next === null) return null;
    index++;
    return this.getKey(key, list.next, index);
  }

  hasKey(key, list = this.head, index = 0) {
    if (list.key === key) return true;
    if (list.next === null) return false;
    index++;
    return this.hasKey(key, list.next, index);
  }

  getIndex(key, index = 0, list = this.head) {
    if (list.key === key) return index;
    index++;
    return this.getIndex(key, index, list.next);
  }

  removeNode(index) {
    if (index === 0 && this.getNode(index + 1) === false) {
      this.head = null;
      return "empty";
    } else if (index === 0 && this.getNode(index + 1) !== false)
      this.head = this.getNode(index + 1);
    else {
      const before = this.getNode(index - 1);
      const after =
        this.getNode(index).next === null ? null : this.getNode(index + 1);
      before.next = after;
    }
  }

  nodeLength(list = this.head) {
    if (list === null) return 0;
    if (list.next === null) return 1;
    else return 1 + this.nodeLength(list.next);
  }
}

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = [];
  }

  hash(key) {
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = prime * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    if (this.length() / this.capacity >= this.loadFactor) {
      this.capacity *= 2;
      const pairs = this.entries();
      this.clear();
      pairs.forEach((pair) => {
        const hash = this.hash(pair[0]);
        if (this.buckets[hash] === undefined) {
          this.buckets[hash] = new LinkedList();
          this.buckets[hash].append(pair[0], pair[1]);
        } else this.buckets[hash].append(pair[0], pair[1]);
      });
    }

    const hash = this.hash(key);
    if (this.buckets[hash] === undefined) {
      this.buckets[hash] = new LinkedList();
      this.buckets[hash].append(key, value);
    } else this.buckets[hash].append(key, value);

    return;
  }

  get(key) {
    const hash = this.hash(key);
    if (this.buckets[hash] === undefined) return false;
    return this.buckets[hash].getValue(key);
  }

  has(key) {
    const hash = this.hash(key);
    if (this.buckets[hash] === undefined) return false;
    return this.buckets[hash].hasKey(key);
  }

  remove(key) {
    if (this.has(key) === true) {
      const hash = this.hash(key);
      let temp = this.buckets[hash].removeNode(
        this.buckets[hash].getIndex(key)
      );
      if (temp === "empty") this.buckets[hash] = undefined;
    } else return;
  }

  length() {
    let n = 0;
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i] !== undefined) {
        n += this.buckets[i].nodeLength();
      }
    }
    return n;
  }

  clear() {
    this.buckets = [];
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.capacity; i++) {
      let bucket = this.buckets[i];
      if (bucket !== undefined) {
        for (let j = 0; j < bucket.nodeLength(); j++) {
          keys.push(bucket.getNode(j).key);
        }
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.capacity; i++) {
      let bucket = this.buckets[i];
      if (bucket !== undefined) {
        for (let j = 0; j < bucket.nodeLength(); j++) {
          values.push(bucket.getNode(j).value);
        }
      }
    }
    return values;
  }

  entries() {
    let pairs = [];
    for (let i = 0; i < this.capacity; i++) {
      let bucket = this.buckets[i];
      if (bucket !== undefined) {
        for (let j = 0; j < bucket.nodeLength(); j++) {
          const node = bucket.getNode(j);
          pairs.push([node.key, node.value]);
        }
      }
    }
    return pairs;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("ring", "gold");
test.set("mug", "cyan");
test.set("juice", "magenta");
test.set("coffee", "beige");
console.log(test.entries());
console.log(test.keys());
console.log(test.values());
console.log(test.length());
console.log(test.get("hat"));
console.log(test.get("cup"));
console.log(test.has("hat"));
console.log(test.has("cup"));
test.remove("hat");
console.log(test.has("hat"));
console.log(test.get("hat"));
test.set("hat", "black");
console.log(test.has("hat"));
test.clear();
console.log(test.entries());
