# The Lab — Vintage Store — site vitrine

Friperie / vintage store à Saint-Junien (87200).

- Adresse : Place Guy Mocquet, 87200 Saint-Junien (numéro à confirmer)
- Instagram : [@thelab.vintage](https://www.instagram.com/thelab.vintage/)
- Contact : à compléter (Prénom NOM, téléphone, email)
- Statut du projet : maquette démo (avant devis)
- Domaine : à définir — registrar : — expire le : — au nom de : client
- Code : https://github.com/BYOBBB/the-lab-saint-junien (privé, branche main) — dossier publié : `site/` — à transférer plus tard sur le GitHub d'un associé
- Hébergement : à définir
- Mise en ligne : —
- Contrat maintenance : —

## Historique
- 01/10/2026 : démo refaite avec la nouvelle méthode (`site-immersif-skill`) : thème clair, accent jaune #FEDE5A, preuve en masonry. Ancienne démo gpt-taste archivée dans `_admin/ancienne-demo-gpt-taste/` (non suivie par git, reste dans l'historique). Mise en conformité faite : polices auto-hébergées, SEO + Open Graph + JSON-LD en dur, noindex (démo), pages légales, 404, robots.txt, sitemap.xml, `_headers` sans domaine externe. Aperçu local : config `thelab-immersif` (port 4385)
- 30/09/2026 : couleurs de la marque (jaune #FEDE5A / violet #8256D5, relevées sur la photo de profil Instagram, à confirmer avec le logo HD) à la place de l'indigo ; logo provisoire « THE LAB. » dans le menu et le pied de page ; nom de la boutique dans le haut de page
- 30/09/2026 : site déplacé dans `site/` (seul dossier à publier) + `site/_headers` (modèle, CSP à adapter : GSAP, Fontshare)
- 29/09/2026 : ouverture du dossier projet, maquette démo de l'accueil (index.html), mise sur GitHub (privé)

## Checklist (voir _methode/3-etapes-creation.md)
- [ ] Devis signé + acompte reçu
- [ ] Questionnaire + infos légales reçus
- [ ] Contenus reçus : logo, photos, textes
- [ ] Arborescence + maquette accueil validée
- [ ] Développement
- [ ] Recette
- [ ] Audit sécurité (fiche 7)
- [ ] Mise en ligne

## Contenu provisoire (démo du 01/10/2026)

Toute modif de contenu : `site/content.js` uniquement (+ textes miroirs dans `site/index.html`). Nouvelles photos : `site/images/`, mêmes noms de fichiers.

- **Photos** : 0 photo de la boutique, 41 fichiers Unsplash (36 photos distinctes) — provenance fichier par fichier dans `_admin/sources-photos-unsplash.txt`. À remplacer par les vraies photos
- **E-mail** `contact@thelab-vintage.fr` : inventé (domaine pas encore choisi), affiché dans le pied de page
- **Domaine** `thelab-vintage.fr` : provisoire dans canonical, og:url, JSON-LD, sitemap, robots.txt
- **Témoignage** inventé : « Camille — cliente », chiffre 12 €, citation — à remplacer par un vrai avis (Google / Instagram) avec accord, ou à retirer
- **Textes déduits** (à valider avec la boutique) : accroche « Du vintage choisi, pièce par pièce. », manifeste, « Chinée / Vérifiée / Abordable », les 3 étapes (on chine / on vérifie / vous trouvez), « Pas de neuf. Pas de série. Pas de frime. », titres des 8 pièces de la sélection (décrivent des photos de banque)
- **Signature** « GENUINE VINTAGE STORE » : reprise du logo Instagram
- **Logo** : photo de profil Instagram @thelab.vintage (seule taille disponible : 150×150 px, original dans `_admin/contenu-recu/logo/`) → `site/images/logo.jpg`, utilisée en pastille ronde dans le menu, au-dessus du contact en pied de page, en favicon et apple-touch-icon. **Demander le logo HD** (SVG ou PNG ≥ 1000 px) et remplacer `site/images/logo.jpg` sous le même nom
- **Pages légales** : tout ce qui est surligné en jaune entre crochets manque (raison sociale, SIRET, n° de la place, téléphone, e-mail, responsable de publication, hébergeur, médiateur)
- **Facebook** : pas de lien tant que l'adresse exacte de la page n'est pas connue

## Ancienne maquette démo (29/09/2026, archivée)

Page d'accueil seule, pour présenter le projet au client avant le devis.
Style : `gpt-taste` (sombre, vert « labo », animations GSAP au scroll). Aperçu local : config `thelab` dans `.claude/launch.json` (port 8780).

À remplacer / confirmer avant d'aller plus loin :
- Photos `site/assets/img/demo/` = photos Unsplash d'ambiance (chaque photo en 2 tailles : `-640` et `-1200`, WebP), à remplacer par les vraies photos de la boutique en gardant ce double format
- Horaires affichés = inventés, à confirmer
- Numéro exact place Guy Mocquet, téléphone, email
- Textes (arrivages chaque semaine, etc.) à valider avec la boutique
- Logo : pastille CSS « THE LAB. » jaune/violet provisoire (classe `.logo-badge`), à remplacer par le vrai logo HD
- Police Cabinet Grotesk chargée depuis Fontshare : à auto-héberger pour la mise en ligne
- Pages légales non créées (liens `#` dans le pied de page)
- Lien Facebook provisoire (`https://www.facebook.com/`, 2 endroits marqués TODO dans index.html) : demander l'adresse exacte de la page
- Vrai logo repéré sur Instagram : rond jaune, « THE LAB. » en violet, « Genuine Vintage Store » : à récupérer en haute définition

## Animation vidéo au scroll

29/09/2026 : essai PixVerse gratuit intégré puis retiré (qualité insuffisante, filigrane visible).
Images de départ/fin et vidéo d'essai gardées dans `_admin/contenu-recu/animation/` pour un prochain essai en version payante.

## Fond animé du haut de page (version principale depuis le 29/09/2026)

`site/index.html` : haut de page sombre avec la photo de la boutique tramée et animée (recréation Canvas2D
du réglage « Surf BG 2 » de 21st.dev/community/ascii, adoucie). Fichiers : `site/assets/css/ascii.css`,
`site/assets/js/ascii-bg.js`. L'ancienne version (photo flottante sur fond blanc) est gardée dans
`site/index-classique.html` (noindex), à supprimer avant la mise en ligne si elle n'est plus utile.
