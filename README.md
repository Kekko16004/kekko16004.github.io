# Sito ufficiale Real Olimpia Terlizzi

Sito statico (HTML + CSS + JavaScript, nessuna dipendenza) pubblicato su GitHub Pages.
Tutti i contenuti modificabili stanno in **un solo file**: `assets/js/data.js`.

## Pagine

| File | Contenuto |
|---|---|
| `index.html` | Home: prossima gara, forma, ultime partite, numeri stagione, news, classifica, sponsor |
| `squadra.html` | Rosa con filtri per ruolo + schede giocatore, staff e dirigenza |
| `risultati.html` | Prossima gara, archivio partite, widget risultati del girone |
| `classifica.html` | Classifica e marcatori (widget Tuttocampo) + riepilogo stagione precedente |
| `news.html` | Rassegna stampa automatica con filtro "solo Real Olimpia" / "tutto lo sport" |
| `societa.html` | Chi siamo, valori, dirigenza, storia, FAQ, galleria |
| `stadio.html` | Impianto di gioco, mappa, informazioni utili |
| `sponsor.html` | Vetrina sponsor e pacchetti commerciali |
| `contatti.html` | Modulo contatti (apre l'email) e contatti diretti |
| `media.html` | Foto e Video: flusso Instagram, galleria con lightbox, video YouTube, rassegna stampa |
| `404.html` | Pagina di errore |

## Come si aggiorna

Apri `assets/js/data.js` con un editor di testo e modifica le sezioni:

* **`PAGINE`** – accende/spegne le pagine e ne decide l'**ordine nel menu**.
  Metti `attiva: false` e la voce scompare dal menu, dal footer e da ogni
  pulsante interno che la richiama; sposta le righe dell'elenco per riordinare
  (per avere Classifica come seconda voce, basta spostarla in seconda posizione).
* **`LOGHI_SQUADRE`** – indirizzi dei loghi delle avversarie (facoltativo:
  vedi `assets/images/squadre/LEGGIMI.txt`).
* **`VIDEO`** – link YouTube mostrati nella pagina Foto e Video.
* **`SITE`** – nome, stagione, campionato, stadio, contatti, social.
* **`CONFIG.tuttocampoId`** – identificativo squadra usato dai widget Tuttocampo.
* **`CONFIG.news`** – `soloRealOlimpia: true/false` per filtrare le notizie,
  numero massimo, parole chiave e fonti (`attiva: true/false`).
* **`PROSSIMA_PARTITA`** – appena esce il calendario, compila data/avversario/campo:
  la home mostra automaticamente la card con il **countdown**. Finche' resta `null`,
  al suo posto compare l'ultima gara giocata.
* **`ROSA`** – un oggetto per giocatore (numero, nome, ruolo, presenze, gol, foto).
  Quando la rosa e' definitiva metti `ROSA_IN_AGGIORNAMENTO = false` per far
  sparire l'avviso giallo.
* **`STAFF`, `STORIA`, `SPONSOR`, `PACCHETTI_SPONSOR`, `FAQ`, `GALLERIA`, `PARTITE`**.

### Foto

* Giocatori e staff: `assets/images/giocatori/` (verticali, taglio dalla vita in su).
* Loghi sponsor: `assets/images/sponsor/` (PNG con fondo trasparente).
* Galleria: `assets/images/gallery/`, poi aggiungi le voci in `GALLERIA`.

Senza foto il sito mostra automaticamente silhouette e iniziali: nessuna immagine rotta.

### Instagram

In `SITE.social.instagramPost` puoi incollare i link dei post da mettere in vetrina.
Con la lista vuota viene incorporato il profilo intero.

## Modificare intestazione, menu o footer

Sono in `_sorgenti/head.html` e `_sorgenti/foot.html`; il corpo di ogni pagina in
`_sorgenti/corpo_<pagina>.html`. Dopo una modifica rigenera le pagine:

```bash
bash _sorgenti/genera.sh
```

Le pagine `.html` nella cartella principale sono il risultato finale: se preferisci,
puoi modificarle direttamente, ricordando che il generatore le sovrascrive.

## Pubblicazione

Ogni push sul branch `main` attiva `.github/workflows/static.yml` e aggiorna il sito.

## Cosa si aggiorna da solo e cosa no

Si aggiorna **da solo**, senza toccare nulla:

* prossima partita, risultati di giornata, classifica e marcatori (widget Tuttocampo);
* rassegna stampa e news (feed RSS di TerlizziViva, filtrato sulla squadra);
* riquadro Instagram (mostra i post nuovi appena pubblicati);
* anno nel footer, voce di menu attiva, countdown quando c'e' una gara futura.

Richiede una **modifica manuale in `data.js`** (poche righe, una volta per stagione):

* rosa e staff quando cambiano i giocatori;
* archivio `PARTITE` se vuoi le righe cliccabili con marcatori e cronaca
  (i risultati "grezzi" restano comunque visibili nei widget Tuttocampo);
* sponsor, foto della galleria e video.

## ID Tuttocampo

`CONFIG.tuttocampoId` in `assets/js/data.js` e' l'identificativo dei widget
ufficiali Tuttocampo del **Girone A di Prima Categoria Puglia**. Lo stesso ID
vale per tutti i widget (Classifica, Marcatori, Risultati, Ultima e Prossima
partita).

Se in futuro i widget tornano a mostrare il girone o la stagione sbagliata,
rigenera l'ID dalla pagina "Widget" del tuo account Tuttocampo e incollalo li'.

Il pulsante "TC" e il click sulle righe partita portano alla pagina Risultati
del Girone A; se una partita ha il campo `urlTuttocampo` (vedi la prima riga di
`PARTITE`), il click apre direttamente la scheda di quella partita.

## Note sui dati

* Classifica, marcatori, risultati di giornata e prossima partita arrivano dai widget
  ufficiali **Tuttocampo** (si aggiornano da soli).
* Le notizie arrivano dal feed RSS di **TerlizziViva**, filtrate sulle parole chiave
  della squadra. **TerlizziLive** e' predisposta ma disattivata: il suo feed contiene
  cronaca cittadina generica e richiede un proxy esterno.
* Dati stagione 2025/26 (6&deg; posto, 37 punti, Girone A) e nominativi verificati
  sulle cronache di TerlizziViva.
