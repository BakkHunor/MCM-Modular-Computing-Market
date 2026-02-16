# MCM – Modular Computing Market Frontend (Angular) – BHPSHM 2026

Ez egy **front-end only** (Angular) demo, Eneba/Kinguin-szerű felépítéssel:
- Főoldal kiemelt termékekkel
- Kereső a fejlécben → átvisz a találati oldalra (`/search?q=...`)
- Találati oldal szűrőkkel (ár + kategória) és termék kártyákkal
- Termék részletező oldal
- Belépés / Regisztráció (csak UI, backend később)

## Telepítés (Windows CMD)

1) Kibontás után:

```bat
cd mcm-frontend
npm install
npm start
```

2) Megnyitás:
- http://localhost:4200

## Tipp
A mock adatokat itt találod:
- `src/app/services/product.service.ts`

Később, ha kész a backend:
- a `ProductService.getProducts()` helyére jön az HTTP hívás.
