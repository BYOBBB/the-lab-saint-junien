# The Lab — Vintage Store — site vitrine

Friperie / vintage store à Saint-Junien (87200).

- Adresse : Place Guy Mocquet, 87200 Saint-Junien (numéro à confirmer)
- Instagram : [@thelab.vintage](https://www.instagram.com/thelab.vintage/)
- Contact : à compléter (Prénom NOM, téléphone, email)
- Statut du projet : maquette démo (avant devis)
- Domaine : à définir — registrar : — expire le : — au nom de : client
- Hébergement : à définir
- Mise en ligne : —
- Contrat maintenance : —

## Historique
- 29/09/2026 : ouverture du dossier projet, maquette démo de l'accueil (index.html)

## Checklist (voir _methode/3-etapes-creation.md)
- [ ] Devis signé + acompte reçu
- [ ] Questionnaire + infos légales reçus
- [ ] Contenus reçus : logo, photos, textes
- [ ] Arborescence + maquette accueil validée
- [ ] Développement
- [ ] Recette
- [ ] Audit sécurité (fiche 7)
- [ ] Mise en ligne

## Maquette démo (29/09/2026)

Page d'accueil seule, pour présenter le projet au client avant le devis.
Style : `gpt-taste` (sombre, vert « labo », animations GSAP au scroll). Aperçu local : config `thelab` dans `.claude/launch.json` (port 8780).

À remplacer / confirmer avant d'aller plus loin :
- Photos `assets/img/demo/` = photos Unsplash d'ambiance (chaque photo en 2 tailles : `-640` et `-1200`, WebP), à remplacer par les vraies photos de la boutique en gardant ce double format
- Horaires affichés = inventés, à confirmer
- Numéro exact place Guy Mocquet, téléphone, email
- Textes (arrivages chaque semaine, etc.) à valider avec la boutique
- Logo : pastille « L » provisoire
- Police Cabinet Grotesk chargée depuis Fontshare : à auto-héberger pour la mise en ligne
- Pages légales non créées (liens `#` dans le pied de page)
- Lien Facebook provisoire (`https://www.facebook.com/`, 2 endroits marqués TODO dans index.html) : demander l'adresse exacte de la page
- Vrai logo repéré sur Instagram : rond jaune, « THE LAB. » en violet, « Genuine Vintage Store » : à récupérer en haute définition

## Animation vidéo au scroll

29/09/2026 : essai PixVerse gratuit intégré puis retiré (qualité insuffisante, filigrane visible).
Images de départ/fin et vidéo d'essai gardées dans `_admin/contenu-recu/animation/` pour un prochain essai en version payante.

## Fond animé du haut de page (version principale depuis le 29/09/2026)

`index.html` : haut de page sombre avec la photo de la boutique tramée et animée (recréation Canvas2D
du réglage « Surf BG 2 » de 21st.dev/community/ascii, adoucie). Fichiers : `assets/css/ascii.css`,
`assets/js/ascii-bg.js`. L'ancienne version (photo flottante sur fond blanc) est gardée dans
`index-classique.html` (noindex), à supprimer avant la mise en ligne si elle n'est plus utile.
