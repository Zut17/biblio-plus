<script setup>
import { useFavoritesStore } from '@/stores/favorites'
import NavDropdown from '@/components/NavDropdown.vue'

const favorites = useFavoritesStore()
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="app-header__logo">Biblio+</RouterLink>
    <nav aria-label="Navigation principale">
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
.app-header__logo { font-size: var(--fs-300); font-weight: 700; }
.app-header__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-4);
  list-style: none;
  margin: 0;
  padding: 0;
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
@media (min-width: 48em) {
  .app-header { padding: var(--space-4) var(--space-6); }
}
</style>