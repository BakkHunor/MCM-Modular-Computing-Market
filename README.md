## MCM – Modular Computing Market

Az MCM (Modular Computing Market) egy teljes stack webshop alkalmazás, amely számítástechnikai hardverek és digitális játék kulcsok értékesítésére készült. A rendszer Angular frontendből és egy Node.js/Express backend API-ból áll, amely MariaDB adatbázissal kommunikál.

A rendszer lehetővé teszi a felhasználók számára:

- termékek böngészését

- kosár használatát

- rendelés leadását

- digitális kulcsok vásárlását

- rendelési előzmények megtekintését

## Projekt áttekintése

Az alkalmazás egy online számítástechnikai webshop, amely kétféle terméktípust kezel:

- Hardver termékek (processzorok, videókártyák, memóriák)

- Digitális termékek (játék kulcsok és gift cardok)

A backend REST API-n keresztül kommunikál a frontenddel.

## Használt technológiák
### Backend

- Node.js

- Express.js

- Sequelize ORM

- MariaDB / MySQL

- JWT autentikáció

- bcrypt jelszó titkosítás

### Frontend

- Angular

- TypeScript

- Angular Material

- SCSS

- RxJS

## Rendszer követelmények

A projekt futtatásához szükséges:

- Node.js 18 vagy újabb

- npm

- Angular CLI

- MariaDB vagy MySQL

- XAMPP vagy más adatbázis szerver

### Angular CLI telepítése:

npm install -g @angular/cli
## Projekt letöltése

A repository klónozása:

git clone https://github.com/USERNAME/MCM-Modular-Computing-Market.git

Majd lépj be a projekt mappába:

cd MCM-Modular-Computing-Market
## Adatbázis létrehozása

Nyisd meg a phpMyAdmin-t vagy MySQL konzolt, majd hozd létre az adatbázist:

CREATE DATABASE mcm;

Ezután importáld az adatbázis SQL fájlt a projektből.

Ez létrehozza a szükséges táblákat:

- users

- products

- orders

- order_items

- gamekeys

- giftcards

- addresses

## Backend telepítése és indítása

Navigálj a backend mappába:

cd backend

Telepítsd a függőségeket:

npm install

Hozz létre egy .env fájlt a backend mappában:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mcm
JWT_SECRET=secret_key
PORT=3000

Indítsd el a backend szervert:

npm start

A backend API elérhető lesz:

http://localhost:3000
## Frontend telepítése és indítása

Navigálj a frontend mappába:

cd frontend

Telepítsd a csomagokat:

npm install

Indítsd el az Angular fejlesztői szervert:

npm start

A webalkalmazás elérhető lesz:

http://localhost:4200
## Projekt struktúra
MCM/

│

├── backend

│   ├── controllers

│   ├── models

│   ├── routes

│   ├── middleware

│   └── config

│

└── frontend

    ├── src
    
    │   ├── app
    
    │   │   ├── features
    
    │   │   ├── shared
    
    │   │   └── services
    
    │   ├── assets
    
    │   └── styles
    
## API végpontok
### Autentikáció
POST /api/auth/register
POST /api/auth/login
### Termékek
GET /api/products
GET /api/products/:id
### Kosár
POST /api/cart/add
POST /api/cart/remove
### Checkout
POST /api/checkout
### Profil
GET /api/profile
PUT /api/profile/address
### Rendelések
GET /api/orders
## Biztonság

A rendszer több biztonsági mechanizmust használ:

JWT token alapú autentikáció

bcrypt jelszó titkosítás

backend oldali validáció

védett API végpontok

## Fejlesztési eszközök

### Ajánlott fejlesztői környezet:

Visual Studio Code

Node.js

Angular CLI

MariaDB

Postman

### Ajánlott VS Code kiegészítők:

Angular Language Service

ESLint

Prettier

GitLens

SQLTools
