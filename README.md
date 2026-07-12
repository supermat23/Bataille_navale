# 🚢 Bataille Navale — Opération Tempête

Plongez dans une expérience de jeu de stratégie navale intense et modernisée. 
Affrontez des IA tactiques, débloquez de nouvelles armes, des capacités spéciales, et gravissez les échelons jusqu'au grade d'Amiral de la flotte !

![Statut du projet](https://img.shields.io/badge/Statut-En%20ligne-success) ![PWA](https://img.shields.io/badge/PWA-Installable-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

---

## 🌟 Fonctionnalités Principales

- **Système de Grades et de Progression :** Cumulez des points de carrière pour gravir 10 grades militaires, du simple Matelot à l'Amiral de la flotte.
- **5 Niveaux d'IA :** Affrontez 5 adversaires uniques, de la Recrue au **Fantôme** (une IA ultime qui utilise les probabilités, économise ses points d'action et active des contre-mesures).
- **Arsenal Tactique :** Utilisez des armes spéciales (Ligne, Croix, Diagonale, Sonar) et des capacités propres à chaque navire (Frappe orbitale, Salve lourde, Bouclier, etc.).
- **Obstacles Mortels :** Jouez sur des cartes truffées de rochers (qui bloquent les tirs) et de mines (qui explosent en chaîne).
- **Mode Brouillard de Guerre :** (Débloqué au Grade 7) Les ratés ne s'affichent plus ! Utilisez la **Téléportation Tactique** pour sauver vos navires endommagés.
- **Thèmes de Carte :** Personnalisez l'apparence de votre océan (Volcan, Arctique, Nuit).
- **Multiplateforme (PWA) :** Installez le jeu sur votre ordinateur ou votre téléphone pour y jouer en plein écran, même hors-ligne.
- **Multijoueur :** Défiez un ami en local (2 joueurs sur le même appareil) ou en ligne via un code de partie (Peer-to-Peer).

---

## 🧠 Les Adversaires (IA)

Le jeu propose une difficulté évolutive pour tester vos compétences :

1. **Recrue** : Tire au hasard. Parfait pour apprendre.
2. **Tactique** : Chasse vos navires et utilise le sonar.
3. **Stratège** : Utilise un pattern en damier et des armes spéciales.
4. **Amiral** : Utilise un calcul de probabilités avancé pour traquer vos navires.
5. **Fantôme** *(Rang 7)* : L'IA ultime. Elle économise ses PA, évite les zones vides, active son bouclier quand elle est en danger, et vous traque sans pitié.

---

## 🏆 Contenu et Réjouissances

- **Plus de 220 Succès** (du commun à l'ultime) à débloquer.
- **Défis Quotidiens et Hebdomadaires** pour des récompenses régulières.
- **Tableau des scores** local avec sauvegarde automatique.
- **Exportation / Importation** de vos sauvegardes (format JSON).

---

## 🛠️ Technologies Utilisées

- **HTML5 / CSS3** : Structure et design (avec Tailwind CSS).
- **JavaScript (Vanilla)** : Toute la logique de jeu, l'intelligence artificielle et la gestion d'état.
- **Web Audio API** : Génération de sons et d'effets sonores dynamiques.
- **PeerJS** : Pour la connexion multijoueur en ligne (P2P).
- **Service Workers** : Pour le fonctionnement hors-ligne (PWA).

---

## 🚀 Installation et Utilisation

### Option 1 : Jouer en ligne (ou en local)
Ouvrez simplement le fichier `index.html` dans votre navigateur préféré.

### Option 2 : Installer en tant qu'application (PWA)
1. Ouvrez le jeu dans votre navigateur (Chrome, Edge, Safari...).
2. Cliquez sur l'icône d'installation dans la barre d'URL (ou le bouton "Installer l'application" dans le menu du jeu).
3. Le jeu sera ajouté à votre bureau ou votre écran d'accueil et jouable en plein écran !

### Hébergement de votre propre version
Si vous souhaitez héberger le jeu sur votre propre serveur ou GitHub Pages :
1. Clonez ce dépôt.
2. Assurez-vous que les fichiers `index.html`, `manifest.json`, `sw.js` et le dossier `icons/` sont à la racine.
3. Déployez le tout sur votre hébergeur (GitHub Pages, Netlify, Vercel...).

---

## 🎮 Comment jouer ?

1. Entrez votre nom de commandant.
2. Choisissez votre adversaire et les options de partie (taille de l'océan, obstacles, etc.).
3. Placez vos navires sur la grille (manuellement ou aléatoirement). Appuyez sur `R` pour pivoter un navire.
4. Cliquez sur la grille ennemie pour tirer. Gagnez des Points d'Action (PA) à chaque tir réussi pour déclencher vos armes spéciales !
5. Coulez toute la flotte ennemie avant qu'elle ne coule la vôtre.

---

## 💡 Astuces de Commandant

- **Le Sonar est votre meilleur ami** : Surtout en mode Brouillard de Guerre ou contre le Fantôme.
- **Gérez vos PA** : Ne gaspillez pas vos armes spéciales. Utilisez la Croix ou la Ligne pour achever un navire déjà identifié.
- **Attention aux Mines** : Un tir sur une mine provoque une explosion en chaîne. Utilisez l'Éclaireur lourd pour les repérer sur les grandes cartes.
- **La Téléportation** : Si un de vos navires est mortellement touché, téléportez-le (en Brouillard de Guerre) pour effacer ses dégâts et tromper l'ennemi !

---

*Bon vent, Commandant ! ⚓*
```

##⭐ Contribuer ou aider

Vous pouvez aider le projet en :

* ⭐ Star le repository
* 🔁 Partageant l'application
* ☕ Soutenant via Ko-fi

👉 https://ko-fi.com/supermatv2

---

## 📜 Licence

Projet personnel — utilisation libre pour le jeu personnel.
