import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const KEY = 'biblio:favorites'

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export const useFavoritesStore = defineStore('favorites', () => {
  const ids = ref(read())
  const count = computed(() => ids.value.length)
  const has = (id) => ids.value.includes(id)

  function toggle(id) {
    ids.value = has(id) ? ids.value.filter((i) => i !== id) : [...ids.value, id]
  }

  watch(ids, (value) => localStorage.setItem(KEY, JSON.stringify(value)), {
    deep: true,
  })

  return { ids, count, has, toggle }
})
