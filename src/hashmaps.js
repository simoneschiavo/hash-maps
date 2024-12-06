class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.bucketsList = [];
    for (let i = 0; i < capacity; i++) {
      this.bucketsList.push([]);
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    for (let i = 0; i < this.bucketsList[hashCode].length; i++) {
      if (this.bucketsList[hashCode][i][0] === key) {
        this.bucketsList[hashCode][i][1] = value;
        return;
      }
    }
    this.bucketsList[hashCode].push([key, value]);
  }
}
