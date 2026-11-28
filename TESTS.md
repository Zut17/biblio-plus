# Tests de l'application Biblio+

## Tests responsive (Playwright + observation manuelle)

Les résultats ci-dessous viennent des tests Playwright Chromium et de leurs captures d'écran. Aucun débordement horizontal n'a été détecté. L'observation manuelle sur un appareil physique reste à faire.

| Page      | Taille d'écran | Résultat | Correctif appliqué |
|-----------|----------------|----------|--------------------|
| Accueil   | 320 px         | Réussi : aucun défilement horizontal. | Aucun correctif après le test. |
| Accueil   | 768 px         | Réussi : aucun défilement horizontal. | Aucun correctif après le test. |
| Accueil   | 1440 px        | Réussi : aucun défilement horizontal. | Aucun correctif après le test. |
| Catalogue | 375 px         | Réussi : aucun défilement horizontal. | Aucun correctif après le test. |
| Détail    | 375 px         | Réussi : aucun défilement horizontal. | Aucun correctif après le test. |
| Contact   | 320 px         | Réussi : aucun défilement horizontal. | Aucun correctif après le test. |

La suite responsive complète couvre 20 combinaisons page/largeur et les deux tests du menu burger : **22 tests réussis**. Le menu s'ouvre au clic sur mobile; son bouton est masqué sur ordinateur.

## Tests unitaires (Vitest)

**7 tests réussis** sur 3 suites :

- BookCard : rendu du titre et du statut, événement `toggle-favorite`
- Store favoris : ajout, retrait, sauvegarde dans localStorage
- ContactView : erreurs d'un formulaire vide, confirmation d'un formulaire valide

## Deux améliorations mobiles proposées

1. Sur l'accueil à 320 px, « Notre sélection » affiche jusqu'à huit cartes en colonne, ce qui allonge la page. Envisager d'en afficher moins sur mobile et de proposer un lien vers le catalogue.
2. À 375 px, les cartes du catalogue restent grandes et empilées avec leurs couvertures de 200 × 300. Envisager une présentation mobile plus compacte avec une miniature, tout en conservant des commandes faciles à toucher.

Ces améliorations sont des propositions; elles n'ont pas été appliquées ni validées par un audit manuel sur téléphone.

## Optimisations Lighthouse

Aucun audit Lighthouse ni score de performance n'a été mesuré. Pistes à évaluer :

1. Les couvertures de `books.json` utilisent des URL `placehold.co` et aucun fichier local n'est présent dans `public/covers/`. Les remplacer par des images locales compressées WebP/AVIF réduirait les dépendances réseau externes.
2. Sur l'accueil, le carrousel et les deux premières cartes demandent les images sans chargement différé. Réserver le chargement prioritaire à l'image réellement visible en premier et différer les autres pourrait réduire la concurrence réseau au chargement initial.
3. Fournir plusieurs résolutions avec `srcset` et `sizes` permettrait d'adapter le poids des couvertures à l'écran. Conserver leurs dimensions intrinsèques aiderait à éviter les décalages de mise en page.
