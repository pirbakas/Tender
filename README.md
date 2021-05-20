# Welcome to Tender

The Fun Guy Factory application to share our cook from others.

## How to initiate the project

### Front
Go into /tender-front
First you will need to install the node package management run
the following code line on your directory terminal `npm install`.

### Back
Go into /tender-back
Initiating the back by opening the tender back repository and download the Laravell
package management `composer install`

Create a postgresql 
Create a file call .env (copy by .env.example and edit it)
Into .env set the pgsql information and stmp for email.

Now it’s time to migrate our database with our work use the code line `PHP artisan
migrate` to run your post database with a different terminal.

then to complete the installation, do `php artisan passport:install` for security.

Hope that help you.

Fun Guy Factory Team
