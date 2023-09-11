# Bitchest Backend

## Configuration requise

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

-   [XAMPP](https://www.apachefriends.org/index.html) (ou MAMP, WAMP)
-   [Composer](https://getcomposer.org/download/)
-   [PHP](https://www.php.net/downloads.php) (version recommandée : PHP 7.4 ou supérieure)

## Installation

1.  Clonez ce dépôt dans le répertoire de votre choix :

    git clone https://github.com/Corentin-kzk/bitchest.git

    cd votre-projet

2.  Copiez le fichier `.env.example` pour créer un fichier `.env` :

`cp .env.example .env`

3.  Générez une nouvelle clé d'application :

`php artisan key:generate`

4.  Configurez votre base de données dans le fichier `.env`. Utiliser MySQL avec XAMPP, modifiez les informations de la base de données comme suit :

`DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=votre_base_de_donnees
DB_USERNAME=votre_nom_utilisateur
DB_PASSWORD=votre_mot_de_passe`

5.  Installez les dépendances PHP en utilisant Composer :

`composer install`

6.  Exécutez les migrations pour créer les tables de base de données :

`php artisan migrate --seed`

7.  Lancez le serveur de développement :

`php artisan serve`

Votre application Laravel devrait maintenant être accessible à l'adresse [http://localhost:8000](http://localhost:8000/).

## Roadmap

Ceci est une version de développement précoce. Je travaille actuellement sur les fonctionnalités suivantes :

-   [x] Setting up the database. (Seeders, Migrations, Models)
-   [x] Setting up the API routes.
-   [x] Setting up the API Controllers.
-   [x] Setting up the API Middleware. (Breeze & Sanctum)
-   [x] Setting up the API Requests.
-   [x] Login and Logout system.
-   [x] Requesting data from the API with Controllers.
-   [x] CRUD system for users.
-   [x] Setting up requests about transactions. (Buy/Sell currencies)

## Contributions

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez soumettre une pull request.
