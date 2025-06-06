// /InMemoryCacheHandler.js

module.exports = class InMemoryCacheHandler {
  constructor() {
    this.store = new Map();
    console.log('🚀 cacheHandler personalizado inicializado');
  }

  async get(key) {
    const item = this.store.get(key);
    if (!item) {
      console.log(`🔍 Miss → ${key}`);
      return null;
    }

    console.log(`✅ Hit → ${key}`);
    return item.value;
  }

  async set(key, data) {
    this.store.set(key, {
      value: data,
      createdAt: Date.now(),
    });
    console.log(`💾 Guardado en caché → ${key}`);
  }

  async revalidateTag() {
    // Implementación vacía si no se usa `revalidateTag`
  }
}