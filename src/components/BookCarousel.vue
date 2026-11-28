<script setup>
import { ref, computed, watch } from 'vue'
import BookCard from '@/components/BookCard.vue'

const props = defineProps({
  items: { type: Array, required: true },
  favorites: { type: Array, default: () => [] },
})
defineEmits(['toggle-favorite'])

const index = ref(0)
const current = computed(() => props.items[index.value])
const next = () => (index.value = (index.value + 1) % props.items.length)
const prev = () =>
  (index.value = (index.value - 1 + props.items.length) % props.items.length)

watch(() => props.items.length, () => (index.value = 0))
</script>

<template>
  <section
    class="carousel"
    aria-roledescription="carrousel"
    aria-label="Coups de coeur"
    @keydown.left="prev"
    @keydown.right="next"
  >
    <button type="button" class="carousel__btn" aria-label="Livre precedent" @click="prev">‹</button>
    <Transition name="slide" mode="out-in">
      <BookCard
        v-if="current"
        :key="current.id"
        class="carousel__card"
        :book="current"
        :favorite="favorites.includes(current.id)"
        eager
        @toggle-favorite="$emit('toggle-favorite', $event)"
      />
    </Transition>
    <button type="button" class="carousel__btn" aria-label="Livre suivant" @click="next">›</button>
    <p class="sr-only" aria-live="polite">
      Livre {{ index + 1 }} sur {{ items.length }}
    </p>
  </section>
</template>

<style scoped>
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}
.carousel__card { flex: 1 1 auto; max-width: 18rem; min-width: 0; }
.carousel__btn {
  flex: none;
  min-width: 44px;
  min-height: 44px;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--color-primary-contrast);
  background: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 50%;
  cursor: pointer;
}
</style>
