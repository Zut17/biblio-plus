<template>
  <footer class="app-footer">
    <p class="app-footer__name">Bibliothèque municipale</p>
    <p>Ouvert du mardi au samedi, de 9h à 18h</p>
    <p><RouterLink to="/contact">Nous contacter</RouterLink></p>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: var(--space-6);
  background: var(--color-text);
  color: var(--color-primary-contrast);
  text-align: center;
}
.app-footer p { margin: 0 0 var(--space-2); }
.app-footer__name { font-weight: 700; }
.app-footer a { color: inherit; }
</style>