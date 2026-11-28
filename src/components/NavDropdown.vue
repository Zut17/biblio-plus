<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <li
    class="nav__item"
    @mouseenter="open = true"
    @mouseleave="open = false"
    @keydown.esc="open = false"
  >
    <button
      type="button"
      class="nav__trigger"
      aria-haspopup="true"
      :aria-expanded="open"
      @click="open = !open"
    >
      Services
    </button>
    <Transition name="fade">
      <ul v-if="open" class="nav__submenu" @click="open = false">
        <li><RouterLink to="/catalogue">Catalogue</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
      </ul>
    </Transition>
  </li>
</template>

<style scoped>
.nav__item { position: relative; }
.nav__trigger {
  min-height: 44px;
  padding: 0;
  background: transparent;
  border: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.nav__submenu {
  list-style: none;
  margin: 0;
  padding: var(--space-2);
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
}
.nav__submenu a {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0 var(--space-2);
  color: var(--color-text);
  text-decoration: none;
}
@media (min-width: 64em) {
  .nav__submenu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 10rem;
    z-index: 50;
  }
}
</style>
