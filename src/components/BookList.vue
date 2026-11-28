<script setup>
import BookCard from './BookCard.vue'

defineProps({
  books: { type: Array, required: true },
  favorites: { type: Array, default: () => [] },
})
defineEmits(['toggle-favorite'])
</script>

<template>
  <ul class="book-list">
    <li v-for="(book, i) in books" :key="book.id">
      <BookCard
        :book="book"
        :favorite="favorites.includes(book.id)"
        :eager="i < 2"
        @toggle-favorite="$emit('toggle-favorite', $event)"
      />
    </li>
  </ul>
</template>

<style scoped>
.book-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;
}
@media (min-width: 40em) {
  .book-list { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 64em) {
  .book-list { grid-template-columns: repeat(4, 1fr); }
}
</style>