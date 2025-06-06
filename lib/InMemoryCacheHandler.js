// lib/InMemoryCacheHandler.js

const cache = new Map();

module.exports = class InMemoryCacheHandler {
  constructor(options) {
    this.options = options;
    // Inicializa cacheHandler personalizado
  }

  // Devuelve contenido cacheado, si existe.
  async get(key) {
    const item = cache.get(key);
    if (!item) {
      // Cuando no encuentra el contenido
      return null;
    }

    // Retorna el contenido cacheable
    return item;
  }

  // Guarda el HTML generado para una ruta específica.
  async set(key, data, ctx) {
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
    });
  }

  // (Opcional) para invalidar por etiquetas.
  async revalidateTag() {
    // Implementación vacía si no se usa `revalidateTag`
  }
}