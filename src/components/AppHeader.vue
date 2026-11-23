<template>
  <header class="app-header">
    <RouterLink to="/" class="app-header__logo">Biblio+</RouterLink>
    <nav aria-label="Navigation principale">
      <ul class="app-header__nav">
        <li><RouterLink to="/">Accueil</RouterLink></li>
        <li><RouterLink to="/catalogue">Catalogue</RouterLink></li>
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
  gap: var(--space-2) var(--space-4);
  list-style: none;
  margin: 0;
  padding: 0;
}
.app-header__nav a.router-link-active {
  font-weight: 700;
  border-bottom: 2px solid currentColor;
}
@media (min-width: 48em) {
  .app-header { padding: var(--space-4) var(--space-6); }
}
</style>