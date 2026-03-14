MCM – Modular Computing Market

Az MCM (Modular Computing Market) egy webalapú webshop alkalmazás, amely számítástechnikai hardverek és digitális játék kulcsok értékesítésére készült. A rendszer célja egy modern, felhasználóbarát felület biztosítása, ahol a látogatók könnyen böngészhetnek a termékek között, kosárba helyezhetik azokat, majd rendelést adhatnak le.

Az alkalmazás egy full-stack rendszer, amely egy Angular frontendből és egy Node.js/Express backend API-ból áll, amely MariaDB adatbázissal kommunikál.

Áttekintés

A rendszer két fő részből áll:

Frontend

Az Angular alapú kliens alkalmazás jeleníti meg a webshop felületét, kezeli a felhasználói interakciókat és kommunikál a backend API-val.

Backend

A backend egy REST API szerver, amely a felhasználók, termékek és rendelések kezeléséért felel. A szerver az adatokat egy MariaDB adatbázisban tárolja.

A rendszer fő képességei

Az alkalmazás az alábbi funkciókat biztosítja a felhasználók számára:

felhasználói fiók létrehozása

bejelentkezés és hitelesítés

termékek böngészése

termékek keresése

kosár kezelés

rendelés leadása

szállítási adatok mentése

korábbi rendelések megtekintése

A digitális termékek esetén a rendszer automatikusan kiosztja a megvásárolt játék kulcsot.

Használt technológiák
Backend környezet

A szerveroldali rész Node.js környezetben fut.

Használt eszközök:

Node.js

Express.js

Sequelize ORM

MariaDB / MySQL

JWT autentikáció

bcrypt jelszó titkosítás

A backend REST API végpontokon keresztül szolgáltat adatokat a frontend számára.

Frontend környezet

A kliensoldali alkalmazás Angular framework segítségével készült.

Technológiák:

Angular

TypeScript

Angular Material

SCSS

RxJS

Angular Router

A frontend felel a felhasználói felület megjelenítéséért és az API kommunikációért.

Telepítés

A projekt futtatásához szükséges:

Node.js

npm

MariaDB vagy MySQL

Angular CLI

Backend indítása

Navigálj a backend könyvtárba:

cd backend

Telepítsd a csomagokat:

npm install

Hozz létre egy .env fájlt:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mcm
JWT_SECRET=secret
PORT=3000

Indítsd el a szervert:

npm start

A backend API elérhető:

http://localhost:3000
Frontend indítása

Navigálj a frontend könyvtárba:

cd frontend

Telepítsd a függőségeket:

npm install

Indítsd el a fejlesztői szervert:

npm start

A webalkalmazás elérhető:

http://localhost:4200
Projekt mappastruktúra

A projekt két fő könyvtárra oszlik:

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
Adatkezelés

A rendszer egy relációs adatbázist használ, amely több különálló táblából áll.

A legfontosabb táblák:

users
Felhasználói adatok és hitelesítés

products
A webshopban elérhető termékek

orders
Leadott rendelések

order_items
A rendeléshez tartozó termékek

gamekeys
Digitális játék kulcsok

giftcards
Ajándékkártya kódok

addresses
Szállítási adatok

API működés

A backend REST API formában szolgáltat adatokat.

Példák:

Felhasználó regisztráció:

POST /api/auth/register

Bejelentkezés:

POST /api/auth/login

Termékek lekérése:

GET /api/products

Rendelés leadása:

POST /api/checkout

Rendelési előzmények:

GET /api/orders
Biztonság

A rendszer több biztonsági megoldást alkalmaz:

JWT token alapú autentikáció

bcrypt jelszó hash-elés

védett API végpontok

backend oldali adat validáció

Fejlesztési környezet

A projekt fejlesztéséhez ajánlott eszközök:

Visual Studio Code

Angular CLI

Nodemon

ESLint

Prettier

Ajánlott VS Code kiegészítők:

Angular Language Service

ESLint

Prettier

GitLens

Projekt célja

A projekt célja egy modern webshop rendszer létrehozása, amely képes kezelni digitális és fizikai termékek értékesítését, miközben egyszerű és átlátható felhasználói élményt biztosít.
