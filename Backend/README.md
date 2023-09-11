## Backend Laravel

Laravel is a web application framework used here API oriented to communicate easily with our database.

## Installation

Clone the repository and install the dependencies.
We will assume here you have a local developpment environment with PHP and Composer installed, and first want to run the project locally in developpement env.

If you need to install PHP and Composer, you can follow the instructions on the official documentation :

-   [PHP](https://www.php.net/manual/fr/install.php)
-   [Composer](https://getcomposer.org/download/)
-   [Laravel](https://laravel.com/docs/10.x/installation)

`bash
git clone
composer install
cp .env.example .env
php artisan key:generate
`

If you are in a local developpment environment, you can use the following command to create a local database.

`bash
php artisan migrate:fresh --seed
`

## Usage

`bash
php artisan serve
`

## Roadmap

This is early development version. I am currently working on the following features:

-   [x] Setting up the database. (Seeders, Migrations, Models)
-   [x] Setting up the API routes.
-   [x] Setting up the API Controllers.
-   [x] Setting up the API Middleware. (Breeze & Sanctum)
-   [x] Setting up the API Requests.
-   [x] Login and Logout system.
-   [x] Requesting data from the API with Controllers.
-   [x] CRUD system for users.
-   [x] Setting up requests about transactions. (Buy/Sell currencies)

### Main Front functionalities

-   [x] Login and logout system.
-   [x] Fetching & Displaying user and currencies data.
-   [x] Creating currencies charts to follow actual trends.
-   [x] Create an admin dashboard to manage users.
-   [x] Create a user dashboard to manage his wallet.
-   [x] Create a system to trade currencies between the app and the user.
