class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
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
    this.grow();
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

  clear() {
    for (let i = 0; i < this.bucketsList.length; i++) {
      this.bucketsList[i] = [];
    }
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.bucketsList.length; i++) {
      for (let j = 0; j < this.bucketsList[i].length; j++) {
        keys.push(this.bucketsList[i][j][0]);
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.bucketsList.length; i++) {
      for (let j = 0; j < this.bucketsList[i].length; j++) {
        keys.push(this.bucketsList[i][j][1]);
      }
    }
    return values;
  }

  entries() {
    let keyValuesArray = [];
    for (let i = 0; i < this.bucketsList.length; i++) {
      for (let j = 0; j < this.bucketsList[i].length; j++) {
        keyValuesArray.push(this.bucketsList[i][j]);
      }
    }
    return keyValuesArray;
  }

  grow() {
    if (this.length() === 0) {
      return;
    }
    if (this.length() > this.loadFactor * this.capacity) {
      this.capacity *= 2;
      let newBucketList = [];
      const entries = this.entries();
      for (let i = 0; i < this.capacity; i++) {
        newBucketList.push([]);
      }
      this.bucketsList = newBucketList;
      for (let i = 0; i < entries.length; i++) {
        this.set(entries[i][0], entries[i][1]);
      }
    }
  }
}
