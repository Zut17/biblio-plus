import { defineStore } from 'pinia'
import { ref } from 'vue'

const KEY = 'biblio:reservations'

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export const useReservationsStore = defineStore('reservations', () => {
  const items = ref(read())

  function add(reservation) {
    items.value.push({ ...reservation, date: new Date().toISOString() })
    localStorage.setItem(KEY, JSON.stringify(items.value))
  }

  return { items, add }
})
