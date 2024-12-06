class HashMaps {
    constructor(loadFactor, capacity) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.bucketsList = [];
        for (let i = 0; i < capacity; i++) {
            this.bucketsList.push([]);
        };
    }
}