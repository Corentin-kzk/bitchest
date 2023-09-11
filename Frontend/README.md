# Bitchest

## Table des matières

- [Aperçu](#aperçu)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du Projet](#structure-du-projet)
- [Contribuer](#contribuer)

## Aperçu

BitChest a pour vocation de permettre à des particuliers d’acheter et de vendre des crypto
monnaies (Cryptocurrencies), tel que le Bitcoin ou l’Ethereum.

## Prérequis

- Node.js et npm installés
- Connaissance de base de ReactJS

## Installation

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/Corentin-kzk/bitchest.git`

   ```

2. Accédez au répertoire du projet :

   `cd Frontend`

3. Installez les dépendances en utilisant npm :
   `npm install`

## Utilisation

1.  Exécutez l'application en mode développement :

    `npm run dev`

    L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000/) dans votre navigateur.

2.  Pour créer une version de production optimisée, exécutez la commande suivante :

    `npm run build`

    Les fichiers optimisés seront générés dans le répertoire `build`.

## Structure du Projet

- `src/` : Contient le code source de l'application React.
- `public/` : Contient les fichiers statiques et la page HTML de base.
- `package.json` : Fichier de configuration npm avec les dépendances et les scripts.

## Roadmap

- [x] Login page
- [x] Home page
- [x] Admin page
- [x] User page
- [x] User Wallet page
- [x] currencies page
- [x] currency chart page

### Main Front functionalities

- [x] Login and logout system.
- [x] Fetching & Displaying user and currencies data.
- [x] Creating currencies charts to follow actual trends.
- [x] Create an admin dashboard to manage users.
- [x] Create a user dashboard to manage his wallet.
- [x] Create functions and requests to trade currencies between the app and the user.

## Contribuer

Si vous souhaitez contribuer à ce projet, suivez ces étapes :

1.  Fork du projet
2.  Créez une branche pour votre fonctionnalité (`git checkout -b feature/new-feature`)
3.  Faites vos modifications et commit (`git commit -m 'Ajout de la nouvelle fonctionnalité'`)
4.  Poussez les modifications vers votre fork (`git push origin  feature/new-feature`)
5.  Créez une Pull Request vers ce dépôt
