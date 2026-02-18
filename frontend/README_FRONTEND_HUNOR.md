# MCM – Modular Computing Market – Frontend (Angular) – Hunor

Ez egy **kész, futtatható** Angular frontend scaffold a BHPSHM projekthez (Eneba/Kinguin-szerű keresés + listázás).

## Funkciók (frontend demo)
- Főoldal (kiemelt termékek)
- Header kereső (Enter / gomb) → átvisz a `/search?q=...` oldalra
- Találati oldal: szűrők (max ár, kategória, platform) + rendezés
- Termék részletező oldal `/product/:id`
- Login / Register UI (backend nélkül)

## Telepítés és futtatás (Windows CMD)
1. Kibontás után lépj a mappába:
```bat
cd mcm-frontend
```

2. Függőségek telepítése:
```bat
npm install
```

3. Indítás:
```bat
npm start
```

4. Megnyitás böngészőben:
- http://localhost:4200

## Megjegyzés
- Jelenleg mock adatok mennek (`src/app/services/product.service.ts`).
- Ha Simon backendje kész, akkor a Service-ben cserélitek `of(mock)`-ot `HttpClient` hívásra.

## Hasznos útvonalak
- `/` – főoldal
- `/search?q=fifa` – keresés
- `/product/1` – termékoldal példa
- `/login` – belépés UI
- `/register` – regisztráció UI
