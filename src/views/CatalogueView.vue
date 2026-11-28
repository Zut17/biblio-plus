<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useBooks } from '@/composables/useBooks'
import { useDebounce } from '@/composables/useDebounce'
import { useFavoritesStore } from '@/stores/favorites'
import BookList from '@/components/BookList.vue'

const { books, loading, error, load } = useBooks()
const favorites = useFavoritesStore()
onMounted(load)

const rawQuery = ref('')
const query = useDebounce(rawQuery, 300)
const category = ref('')
const sort = ref('title')
const page = ref(1)
const PER_PAGE = 8

const categories = computed(() => [
  ...new Set(books.value.map((b) => b.category).filter(Boolean)),
])

const filtered = computed(() =>
  books.value
    .filter((b) => !category.value || b.category === category.value)
    .filter((b) =>
      (b.title + ' ' + b.author)
        .toLowerCase()
        .includes(query.value.trim().toLowerCase()),
    )
    .sort((a, b) => (a[sort.value] > b[sort.value] ? 1 : -1)),
)

const pageCount = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)),
)

const visible = computed(() =>
  filtered.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE),
)

watch([query, category, sort], () => (page.value = 1))
</script>

<template>
  <div class="page">
    <h1>Catalogue</h1>

    <div class="toolbar">
      <input v-model="rawQuery" type="search" aria-label="Rechercher" placeholder="Titre, auteur…" />
      <select v-model="category" aria-label="Catégorie">
        <option value="">Toutes</option>
        <option v-for="c in categories" :key="c">{{ c }}</option>
      </select>
      <select v-model="sort" aria-label="Trier par">
        <option value="title">Titre</option>
        <option value="year">Année</option>
      </select>
    </div>

    <p v-if="loading" role="status">Chargement…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button type="button" @click="load">Réessayer</button>
    </div>
    <p v-else-if="!filtered.length">Aucun résultat.</p>
    <section v-else aria-labelledby="cat-results">
      <h2 id="cat-results" class="sr-only">Résultats</h2>
      <BookList
        :books="visible"
        :favorites="favorites.ids"
        @toggle-favorite="favorites.toggle"
      />
    </section>

    <nav class="pagination" aria-label="Pagination">
      <button :disabled="page === 1" @click="page--">Précédent</button>
      <span>Page {{ page }} / {{ pageCount }}</span>
      <button :disabled="page >= pageCount" @click="page++">Suivant</button>
    </nav>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}
.toolbar input,
.toolbar select {
  min-height: 44px;
  padding: var(--space-2) var(--space-4);
  color: var(--color-text);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
}
.toolbar input { flex: 1 1 14rem; min-width: 0; }
.toolbar select { flex: 1 1 8rem; min-width: 0; }

.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-2) var(--space-4);
  margin-top: var(--space-6);
}
.pagination button {
  min-height: 44px;
  padding: var(--space-2) var(--space-4);
  color: var(--color-primary-contrast);
  background: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius);
  cursor: pointer;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
