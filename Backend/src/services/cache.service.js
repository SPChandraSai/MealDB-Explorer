class Cache {
    constructor() {
        this.data = new Map();
        this.ttl = 1000 * 60 * 5; // 5 min
    }

    set(key, value) {
        this.data.set(key, {
            value,
            expiresAt: Date.now() + this.ttl,
        });
    }

    get(key) {
        const item = this.data.get(key);
        if (!item) return null;
        if (Date.now() > item.expiresAt) {
            this.data.delete(key);
            return null;
        }
        return item.value;
    }
}

export const cache = new Cache();
