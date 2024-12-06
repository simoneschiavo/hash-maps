class HashMap {
  constructor(loadFactor, capacity = 16) {
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
    // ADD the code to handle list growth at some point when entries > loadFactor * capacity
    const hashCode = this.hash(key);
    for (let i = 0; i < this.bucketsList[hashCode].length; i++) {
      if (this.bucketsList[hashCode][i][0] === key) {
        this.bucketsList[hashCode][i][1] = value;
        return;
      }
    }
    this.bucketsList[hashCode].push([key, value]);
  }

  get(key) {
    const hashCode = this.hash(key);
    const bucket = this.bucketsList[hashCode];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return null;
  }

  has(key) {
    const hashCode = this.hash(key);
    const bucket = this.bucketsList[hashCode];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    const bucket = this.bucketsList[hashCode];
    const subIndex = bucket.findIndex((subBucket) => subBucket[0] === key);
    if (subIndex !== -1) {
      bucket.splice(subIndex, 1);
      return true;
    }
    return false;
  }

  length() {
    let entries = 0;
    for (let i = 0; i < this.bucketsList.length; i++) {
      for (let j = 0; j < this.bucketsList[i].length; j++) {
        entries++;
      }
    }
    return entries;
  }
}
