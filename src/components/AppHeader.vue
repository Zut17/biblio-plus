<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import NavDropdown from '@/components/NavDropdown.vue'

const favorites = useFavoritesStore()
const route = useRoute()
const menuOpen = ref(false)

watch(() => route.fullPath, () => (menuOpen.value = false))
</script>

<template>
  <header class="app-header" @keydown.esc="menuOpen = false">
    <RouterLink to="/" class="app-header__logo">Biblio+</RouterLink>

    <button
      class="nav__toggle"
      type="button"
      aria-controls="main-nav"
      :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen"
    >
      Menu
    </button>

    <nav
      id="main-nav"
      class="nav"
      :class="{ 'is-open': menuOpen }"
      aria-label="Navigation principale"
    >
      <ul class="app-header__nav">
        <li><RouterLink to="/">Accueil</RouterLink></li>
        <li><RouterLink to="/catalogue">Catalogue</RouterLink></li>
        <NavDropdown />
        <li>
          <RouterLink to="/favoris">
            Favoris
            <span class="badge" aria-hidden="true">{{ favorites.count }}</span>
            <span class="sr-only">, {{ favorites.count }} au total</span>
          </RouterLink>
        </li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2) var(--space-4);
  padding: var(--space-4);
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}
.app-header a { color: inherit; text-decoration: none; }
.app-header__logo {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: var(--fs-300);
  font-weight: 700;
}
.nav__toggle {
  min-width: 44px;
  min-height: 44px;
  padding: 0 var(--space-4);
  background: transparent;
  color: inherit;
  border: 2px solid currentColor;
  border-radius: var(--radius);
  font: inherit;
  cursor: pointer;
}
.nav { display: none; flex-basis: 100%; }
.nav.is-open { display: block; }
.app-header__nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
}
.app-header__nav a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
}
.app-header__nav a.router-link-active {
  font-weight: 700;
  border-bottom: 2px solid currentColor;
}
.badge {
  display: inline-block;
  min-width: 1.5rem;
  padding: 0 0.4rem;
  border-radius: 999px;
  background: var(--color-primary-contrast);
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
}
@media (min-width: 64em) {
  .app-header { padding: var(--space-4) var(--space-6); }
  .nav__toggle { display: none; }
  .nav { display: block; flex-basis: auto; }
  .app-header__nav {
    flex-direction: row;
    align-items: center;
    gap: var(--space-2) var(--space-4);
  }
}
</style>
