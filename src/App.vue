<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <a href="#contenu" class="sr-only">Aller au contenu</a>
  <AppHeader />
  <main id="contenu"><RouterView /></main>
  <AppFooter />
</template>