<script setup>
import { ref, computed, onMounted } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import BookList from '@/components/BookList.vue'
import BookCarousel from '@/components/BookCarousel.vue'
import { useBooks } from '@/composables/useBooks'
import { useFavoritesStore } from '@/stores/favorites'

const { books, loading, error, load } = useBooks()
const favorites = useFavoritesStore()
const query = ref('')

const coupsDeCoeur = computed(() => books.value.slice(0, 5))

const featured = computed(() =>
  books.value
    .filter((b) => b.title.toLowerCase().includes(query.value.toLowerCase()))
    .slice(0, 8),
)

onMounted(load)
</script>

<template>
  <section class="hero">
    <h1>Bienvenue à la bibliothèque</h1>
    <SearchBar v-model="query" />
  </section>

  <section class="featured" aria-labelledby="coeur">
    <h2 id="coeur">Coups de coeur</h2>
    <p v-if="loading" role="status">Chargement…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button type="button" @click="load">Réessayer</button>
    </div>
    <BookCarousel
      v-else-if="coupsDeCoeur.length"
      :items="coupsDeCoeur"
      :favorites="favorites.ids"
      @toggle-favorite="favorites.toggle"
    />
  </section>

  <section v-if="!loading && !error" class="featured" aria-labelledby="selection">
    <h2 id="selection">Notre sélection</h2>
    <p v-if="!featured.length">Aucun résultat.</p>
    <BookList
      v-else
      :books="featured"
      :favorites="favorites.ids"
      @toggle-favorite="favorites.toggle"
    />
  </section>
</template>

<style scoped>
.hero {
  padding: var(--space-6) var(--space-4);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}
.hero h1 { font-size: var(--fs-600); margin: 0 0 var(--space-4); }
.featured { padding: var(--space-6) var(--space-4); }
.featured h2 { margin-top: 0; }
@media (min-width: 48em) {
  .hero, .featured { padding: var(--space-6); }
}
</style>
