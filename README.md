# Runopis — cedule pro Valheim

Český rich text editor s živým náhledem cedule, barvami, formátováním vybraného textu, posuny, symboly, předlohami, ručním kódem a kopírováním do hry. Přehled značek a odkazy na zdroje najdeš přímo v aplikaci.

## EasyPanel

1. Vytvoř **App** službu a v **Source** připoj tento repozitář (nebo nahraj archiv celého projektu).
2. **Build Path:** `/` — kořen této aplikace obsahující Dockerfile a package.json. Při použití nadřazeného repozitáře nastav cestu `/web`.
3. V **Build** vyber **Dockerfile**, cesta `Dockerfile`.
4. V **Domains** nastav cílový port **80**, protokol **HTTP** a zapni HTTPS pro veřejnou doménu.
5. Klikni na **Deploy**.

Nepotřebuješ proměnné prostředí, databázi ani diskové svazky. HTTPS umožní přímé kopírování do schránky; pokud ho prohlížeč nepovolí, aplikace označí kód pro ruční kopírování. Není třeba měnit příkaz spuštění. Healthcheck je na `/healthz`.

[Oficiální dokumentace EasyPanel App Service](https://easypanel.io/docs/services/app)

## Lokální Docker

```sh
docker compose up --build -d
```

Otevři http://localhost:8080. Samostatně:

```sh
docker build -t valheim-runopis .
docker run --rm -p 8080:80 valheim-runopis
```

Docker používá Node 24 pouze při buildu, výsledný kontejner servíruje statické soubory přes nginx. Nepotřebuje Sites ani Cloudflare účet. Tagy základních obrazů přijímají aktualizace v dané řadě; při požadavku na identický obraz je připni na digest.

## Vývoj

Node 22.13+ (doporučeno 24).

```sh
npm ci
npm run dev:docker
```

Výchozí Vite port je 5173. `npm run build:docker` vytvoří samostatný web v `dist-static`. `npm test` ověřuje generátor a parser; `npm run typecheck` kontroluje typy. `npm run dev` / `npm run build` slouží pro variantu Sites, samostatný Docker je na nich nezávislý.

## Přesnost a limity

Výchozí rozpočet je 50 jednotek vstupu včetně značek. Počítadlo ukazuje UTF-16 jednotky (obvyklé počítání Unity/C#), navíc UTF‑8 bajty. Zdroje se v jednotce limitu rozcházejí; text s diakritikou proto dostane upozornění, pokud přesáhne 50 bajtů. Profil 999 je pro odpovídající mod, limit vanilla hry nijak nemění.

Náhled je aproximace přes bezpečný parser a React textové uzly, nikoli spouštění HTML. Přesný font a měřítko ve hře, auto-sizing, vzhled materiálu, řádkové zarovnání, fontové assety a některé složité TMP značky nelze v prohlížeči zaručit. Neznámé značky mají upozornění. Značky s assety vyžadují nastavení ve hře; nejsou prezentovány jako zaručené vanilla funkce.

[Rešerše a zdroje](docs/rich-text-research.md)

Obrázek náhledu je originální generovaná ilustrace, ne screenshot hry. Runopis není oficiální produkt Iron Gate ani Coffee Stain.
