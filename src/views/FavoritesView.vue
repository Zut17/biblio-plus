<script setup>
import { computed, onMounted } from 'vue'
import { useBooks } from '@/composables/useBooks'
import { useFavoritesStore } from '@/stores/favorites'
import BookList from '@/components/BookList.vue'

const { books, loading, error, load } = useBooks()
const favorites = useFavoritesStore()
onMounted(load)

const list = computed(() => books.value.filter((b) => favorites.has(b.id)))
</script>

<template>
  <div class="page">
    <h1>Mes favoris</h1>

    <p v-if="loading" role="status">Chargement…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button type="button" @click="load">Réessayer</button>
    </div>
    <p v-else-if="!list.length">
      Vous n'avez pas encore de favori.
      <RouterLink to="/catalogue">Parcourir le catalogue</RouterLink>
    </p>
    <section v-else aria-labelledby="fav-list">
      <h2 id="fav-list" class="sr-only">Livres favoris</h2>
      <BookList
        :books="list"
        :favorites="favorites.ids"
        @toggle-favorite="favorites.toggle"
      />
    </section>
  </div>
</template>
