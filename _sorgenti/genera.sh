#!/usr/bin/env bash
# Ricompone le pagine HTML unendo head.html + corpo_<pagina>.html + foot.html
# Uso:  bash _sorgenti/genera.sh
set -euo pipefail
cd "$(dirname "$0")/.."
BASE_URL="https://realolimpiaterlizzi.github.io"

pagina() {           # $1 file  $2 titolo  $3 descrizione
  local out="$1" titolo="$2" desc="$3" corpo="_sorgenti/corpo_${1%.html}.html"
  sed -e "s|{{TITLE}}|$titolo|g" -e "s|{{DESC}}|$desc|g" -e "s|{{CANON}}|$BASE_URL/$1|g" _sorgenti/head.html > "$out"
  cat "$corpo" >> "$out"
  cat _sorgenti/foot.html >> "$out"
  echo "  generata $out"
}

pagina index.html      "Real Olimpia Terlizzi - Sito ufficiale"                  "Sito ufficiale dell A.S.D. Real Olimpia Terlizzi: rosa, risultati, classifica, notizie e sponsor della squadra rossoblu di Prima Categoria pugliese."
pagina squadra.html    "Rosa e staff - Real Olimpia Terlizzi"                    "La rosa completa e lo staff tecnico del Real Olimpia Terlizzi, stagione 2026/27 di Prima Categoria Puglia."
pagina risultati.html  "Risultati e calendario - Real Olimpia Terlizzi"          "Tutti i risultati, il calendario e le prossime partite del Real Olimpia Terlizzi in Prima Categoria pugliese."
pagina classifica.html "Classifica e marcatori - Real Olimpia Terlizzi"          "Classifica aggiornata del Girone A di Prima Categoria Puglia e classifica marcatori del Real Olimpia Terlizzi."
pagina news.html       "News - Real Olimpia Terlizzi"                            "Ultime notizie sul Real Olimpia Terlizzi e sullo sport terlizzese da TerlizziViva e TerlizziLive."
pagina media.html      "Foto e video - Real Olimpia Terlizzi"                    "Gallerie fotografiche, video e contenuti social del Real Olimpia Terlizzi."
pagina societa.html    "Societa e storia - Real Olimpia Terlizzi"                "La storia, i dirigenti e i valori dell A.S.D. Real Olimpia Terlizzi."
pagina stadio.html     "Stadio e come arrivare - Real Olimpia Terlizzi"          "Lo stadio Paolo Poli di Molfetta, casa temporanea del Real Olimpia Terlizzi: indirizzo, mappa e informazioni utili."
pagina sponsor.html    "Sponsor e partner - Real Olimpia Terlizzi"               "Diventa sponsor del Real Olimpia Terlizzi: pacchetti, visibilita e contatti commerciali."
pagina contatti.html   "Contatti - Real Olimpia Terlizzi"                        "Contatta il Real Olimpia Terlizzi per sponsorizzazioni, provini, tesseramenti e informazioni."
pagina 404.html        "Pagina non trovata - Real Olimpia Terlizzi"              "La pagina cercata non esiste."
echo "Fatto."
