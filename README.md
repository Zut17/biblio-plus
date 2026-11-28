# biblio-plus

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

```URL du site :
### https://biblio-plus-mosv.netlify.app/

## Fonctionnalités réalisées

**Must**
- Page d'accueil avec carrousel « Coups de cœur »
- Catalogue : recherche (temporisée), filtre par catégorie, tri, pagination
- Page détail d'un livre et page 404
- Formulaire de contact validé et accessible

**Should**
- Favoris persistants (Pinia + localStorage), compteur dans l'en-tête, page Favoris
- Menu déroulant « Services » accessible au clavier
- Modale de réservation avec validation
- Design responsive mobile-first avec menu burger

## Captures d'écran

| Mobile | Desktop |
|--------|---------|
| ![Accueil mobile](captures/accueil-mobile.png) | ![Accueil desktop](captures/accueil-desktop.png) |

## Scores Lighthouse (mobile)

| Catégorie        | Avant | Après |
|------------------|-------|-------|
| Performance      | …     | …     |
| Accessibilité    | …     | …     |
| Bonnes pratiques | …     | …     |
| SEO              | …     | …     |

## Lancer le projet

```sh
npm install
npm run dev          # développement
npm run test:unit    # tests unitaires (Vitest)
npm run test:e2e     # tests responsive (Playwright)
npm run build        # build de production dans dist/
```

## Difficultés rencontrées

- À remplir avec ton binôme