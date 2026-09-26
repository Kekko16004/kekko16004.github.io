/* ==========================================================================
   REAL OLIMPIA TERLIZZI — FILE DEI CONTENUTI
   --------------------------------------------------------------------------
   Questo e' il SOLO file che devi modificare per aggiornare il sito:
   rosa, staff, risultati, sponsor, contatti, opzioni delle notizie.
   Non serve alcun programma di compilazione: salva e ricarica la pagina.
   ========================================================================== */

/* ---------------------------------------------------------------- SOCIETA' */
const SITE = {
  nome: "Real Olimpia Terlizzi",
  nomeBreve: "Real Olimpia",
  soprannome: "Rossoblu",
  fondazione: "",                       // es. "1998" — lascia vuoto se non certo
  stagione: "2026/27",
  campionato: "Prima Categoria Puglia",
  girone: "Girone A",
  citta: "Terlizzi (BA)",
  colori: "Rosso e Blu",

  // Impianto di gioco
  stadio: {
    nome: 'Stadio "Paolo Poli"',
    citta: "Molfetta (BA)",
    indirizzo: 'Via Giuseppe Saverio Poli, 70056 Molfetta (BA)',
    mapsQuery: "Stadio Paolo Poli Molfetta",
    nota: 'Le gare interne si giocano a Molfetta per i lavori di ristrutturazione del "Comunale" di Terlizzi.',
    casaStorica: 'Stadio Comunale di Terlizzi (in ristrutturazione)'
  },

  contatti: {
    email: "info@realolimpiaterlizzi.it",
    telefono: "",                       // es. "+39 333 1234567"
    sede: "Terlizzi (BA)"
  },

  social: {
    instagram: "https://www.instagram.com/realolimpiaterlizzi/",
    instagramUser: "realolimpiaterlizzi",
    /* Post da mettere in vetrina: incolla i link dei post (o reel) che vuoi
       mostrare nel sito. Con la lista vuota viene mostrato il profilo intero.
       Esempio: ["https://www.instagram.com/p/CxAbCdEfGhI/"]                  */
    instagramPost: [],
    facebook: "",
    tiktok: "",
    youtube: "",
    whatsapp: ""                        // link invito gruppo/canale
  }
};

/* --------------------------------------------------------------- PAGINE
   Ordine e visibilita' delle voci di menu.
   - attiva:false  -> la voce scompare dal menu e dal footer, e ogni link
                      interno che punta a quella pagina viene nascosto.
   - l'ORDINE di questo elenco e' l'ordine del menu: sposta le righe per
     riordinare (es. metti Classifica come seconda voce).
------------------------------------------------------------------------- */
const PAGINE = [
  { file: "index.html", voce: "Home", attiva: true, footer: null },
  { file: "squadra.html", voce: "Squadra", attiva: true, footer: "club" },
  { file: "risultati.html", voce: "Risultati", attiva: true, footer: "campionato" },
  { file: "classifica.html", voce: "Classifica", attiva: true, footer: "campionato" },
  { file: "news.html", voce: "News", attiva: true, footer: "campionato" },
  { file: "media.html", voce: "Foto e Video", attiva: true, footer: "club" },
  { file: "societa.html", voce: "Societa", attiva: true, footer: "club" },
  { file: "stadio.html", voce: "Stadio", attiva: true, footer: "club" },
  { file: "sponsor.html", voce: "Sponsor", attiva: true, footer: "club" },
  { file: "contatti.html", voce: "Contatti", attiva: true, footer: "campionato" }
];

/* ------------------------------------------------------- LOGHI AVVERSARIE
   Come funziona, in ordine di priorita':
   1) se esiste il file assets/images/squadre/<nome-squadra>.png viene usato
      quello (nome tutto minuscolo, spazi sostituiti da "-": es. "olimpia-bitonto.png");
   2) altrimenti, se qui sotto c'e' un indirizzo per quella squadra, usa quello
      (puoi incollare l'URL del logo che vedi sui widget Tuttocampo:
       click destro sull immagine > "Copia indirizzo immagine");
   3) altrimenti compare un tondo con le iniziali, sempre elegante.
   Nessun logo va scaricato a mano perche' il sito prova prima il punto 1.
------------------------------------------------------------------------- */
const LOGHI_SQUADRE = {
  /* Schema degli indirizzi Tuttocampo:
     https://b2-content.tuttocampo.it/Teams/40/<idSquadra>.png
     Per aggiungerne uno: apri il girone su tuttocampo.it, click destro sullo
     stemma > "Copia indirizzo immagine" e incolla qui la riga.             */

  /* raccolti dal widget del girone (stagione 2026/27) */
  "Academy Giovinazzo": "https://b2-content.tuttocampo.it/Teams/40/1173694.png",
  "Accademia Calcio Monte": "https://b2-content.tuttocampo.it/Teams/40/1137631.png",
  "Audace Ascoli Satriano": "https://b2-content.tuttocampo.it/Teams/40/1208144.png",
  "Eagles Bisceglie": "https://b2-content.tuttocampo.it/Teams/40/1173955.png",
  "Elce": "https://b2-content.tuttocampo.it/Teams/40/70772.png",
  "Gioventu Calcio San Severo": "https://b2-content.tuttocampo.it/Teams/40/1084958.png",
  "Real San Giovanni": "https://b2-content.tuttocampo.it/Teams/40/1065845.png",
  "Real Sannicandro": "https://b2-content.tuttocampo.it/Teams/40/921476.png",
  "Red Heart Sannicandro Garganico": "https://b2-content.tuttocampo.it/Teams/40/1208148.png",
  "San Giovanni Rotondo": "https://b2-content.tuttocampo.it/Teams/40/1130355.png",
  "Sant'Agata Di Puglia": "https://b2-content.tuttocampo.it/Teams/40/914446.png",
  "Soccer Ruvo": "https://b2-content.tuttocampo.it/Teams/40/1208133.png",
  "Virtus Calcio Foggia": "https://b2-content.tuttocampo.it/Teams/40/1208151.png",
  "Virtus Molfetta": "https://b2-content.tuttocampo.it/Teams/40/921827.png",
  "Virtus Sammarco": "https://b2-content.tuttocampo.it/Teams/40/1208152.png",
  "Triggiano": "https://b2-content.tuttocampo.it/Teams/120/1236841.png"
};

/* --------------------------------------------------------------- VIDEO
   Incolla i link YouTube (o gli id) dei video da mostrare in Foto e Video.
------------------------------------------------------------------------- */
const VIDEO = [
  // { titolo: "Highlights vs Triggiano", url: "https://www.youtube.com/watch?v=XXXXXXXXXXX" }
];

/* ------------------------------------------------------------------ CONFIG */
const CONFIG = {
  /* --- Tuttocampo: ID squadra usato dai widget ufficiali --- */
  /* ID del Girone A di Prima Categoria Puglia (stagione in corso).
     Lo stesso identificativo vale per tutti i widget: Classifica, Marcatori,
     Risultati, Ultima partita e Prossima partita. Se in futuro i widget
     tornano a mostrare il girone sbagliato, rigenera l'ID dalla pagina
     "Widget" del tuo account Tuttocampo e incollalo qui. */
  tuttocampoId: "2daa7d1b-9eac-43e6-ab98-d5e7bc1730dc",
  tuttocampoWidget: "https://www.tuttocampo.it/WidgetV2",
  /* pagina Tuttocampo aperta dal pulsante "TC" sulle righe partita e dai link
     "vedi su Tuttocampo". Punta alla pagina Risultati del Girone A, NON piu'
     all'elenco generale di tutta la Prima Categoria.
     Per portare una singola partita direttamente alla sua scheda, aggiungi il
     campo "urlTuttocampo" alla partita in PARTITE (vedi la prima riga):
     in quel caso il click sulla riga e il tasto TC aprono proprio quella. */
  tuttocampoUrl: "https://www.tuttocampo.it/Puglia/PrimaCategoria/GironeA/Risultati",

  /* --- NOTIZIE ---------------------------------------------------------
     soloRealOlimpia : true  -> mostra SOLO gli articoli che citano la squadra
                       false -> mostra tutte le notizie sportive delle fonti
     paroleChiave    : termini cercati nel titolo/estratto (minuscolo)
     soloSport       : tiene solo gli articoli della sezione sport
     maxNotizie      : quante notizie mostrare al massimo
     fonti           : elenco feed RSS. cors:true = leggibile direttamente,
                       cors:false = passa da un proxy pubblico (vedi proxy).
     ------------------------------------------------------------------- */
  news: {
    soloRealOlimpia: true,
    soloSport: true,
    maxNotizie: 12,
    paroleChiave: ["real olimpia", "realolimpia", "rossoblu", "rossoblù"],
    /* usate solo per le fonti senza una sezione sport riconoscibile:
       niente termini generici come "terlizzi", farebbero passare la cronaca */
    paroleChiaveSport: [
      "calcio", "prima categoria", "seconda categoria", "promozione", "eccellenza",
      "campionato", "derby", "volley", "basket", "atletica", "pallavolo", "trasferta"
    ],
    /* Proxy usati SOLO per le fonti con cors:false (possono essere lenti
       o non disponibili: se falliscono, la fonte viene semplicemente saltata) */
    proxy: [
      "https://api.codetabs.com/v1/proxy?quest=",
      "https://api.allorigins.win/raw?url="
    ],

    /* attiva:false = fonte ignorata.
       TerlizziViva e' la fonte principale: pubblica tutte le cronache del
       Real Olimpia ed e' leggibile direttamente (nessun proxy necessario).
       TerlizziLive e' disattivata perche' il suo feed riporta cronaca
       cittadina generica, in gran parte duplicata, e richiede un proxy.
       Mettila a true se vuoi allargare la rassegna stampa. */
    fonti: [
      { nome: "TerlizziViva", attiva: true, url: "https://www.terlizziviva.it/rss/", cors: true, sezioneSport: "/sport/" },
      { nome: "TerlizziLive", attiva: false, url: "https://www.terlizzilive.it/feed/", cors: false, sezioneSport: null, categorieSport: ["sport", "calcio", "volley", "basket"] }
    ]
  },

  /* --- Funzioni attivabili/disattivabili --- */
  features: {
    countdown: true,            // countdown alla prossima gara in home
    instagram: true,            // riquadro Instagram
    revealAnimazioni: true,     // animazioni all'ingresso (solo desktop)
    partiteCliccabili: true,    // le righe partita aprono la cronaca dell'articolo
    logoAvversarie: true        // prova a mostrare i loghi delle altre squadre
  }
};

/* ------------------------------------------------------- PROSSIMA PARTITA
   Compila quando il calendario 2026/27 e' ufficiale.
   Se resta null, la home mostra il widget Tuttocampo e l'ultima gara giocata.
   Esempio:
   const PROSSIMA_PARTITA = {
     data: "2026-09-13T16:30:00",
     casa: "Real Olimpia Terlizzi",
     ospite: "Squadra Ospite",
     competizione: "Prima Categoria - Girone A",
     giornata: "1a giornata",
     campo: 'Stadio "Paolo Poli", Molfetta'
   };
------------------------------------------------------------------------- */
const PROSSIMA_PARTITA = null;

/* -------------------------------------------------------------------- STAFF
   ruolo: etichetta breve  |  foto: "assets/images/giocatori/xxx.jpg" o ""
------------------------------------------------------------------------- */
const STAFF = [
  { nome: "Giovanni Deliso", ruolo: "Allenatore", foto: "", bio: "Torna sulla panchina rossoblu per la stagione 2026/27 dopo l'esperienza in Seconda Categoria, conclusa con la finale playoff sfiorata." },
  { nome: "Marco De Lucia", ruolo: "Direttore Sportivo", foto: "", bio: "Guida l'area tecnica e il mercato del club." },
  { nome: "Alessandro Cataldi", ruolo: "Co-Presidente", foto: "", bio: "" },
  { nome: "Sidi Mandri", ruolo: "Co-Presidente", foto: "", bio: "" }
];

/* --------------------------------------------------------------------- ROSA
   RUOLI ammessi (usati dai filtri): Portiere, Difensore, Centrocampista,
   Attaccante, Movimento
   Campi: numero (o null), nome, cognome, ruolo, piede, anno, altezza,
          presenze, gol, foto, capitano, nota
   NOTA: i nominativi qui sotto derivano dalle cronache locali delle ultime
   stagioni. Aggiorna numeri, ruoli e statistiche con la rosa ufficiale
   2026/27 e imposta ROSA_IN_AGGIORNAMENTO = false per togliere l'avviso.
------------------------------------------------------------------------- */
const ROSA_IN_AGGIORNAMENTO = true;

const ROSA = [
  { numero: null, nome: "Nicolo", cognome: "Barile", ruolo: "Portiere", piede: "", anno: null, presenze: null, gol: null, foto: "", capitano: false, nota: "Portiere" },
  { numero: null, nome: "Emanuele", cognome: "Calo", ruolo: "Portiere", piede: "", anno: null, presenze: null, gol: null, foto: "", capitano: false, nota: "Portiere" },
  { numero: null, nome: "Gianfranco", cognome: "Amendolagine", ruolo: "Movimento", piede: "", anno: null, presenze: null, gol: null, foto: "", capitano: true, nota: "Capitano" },
  { numero: null, nome: "Fabio", cognome: "Magarelli", ruolo: "Attaccante", piede: "", anno: null, presenze: null, gol: null, foto: "", capitano: false, nota: "Tra i migliori marcatori 2025/26" },
  { numero: null, nome: "Francesco", cognome: "Garbetta", ruolo: "Attaccante", piede: "", anno: null, presenze: null, gol: null, foto: "", capitano: false, nota: "" },
  { numero: null, nome: "Pasquale", cognome: "Rubini", ruolo: "Movimento", piede: "", anno: null, presenze: null, gol: null, foto: "", capitano: false, nota: "" },
  { numero: null, nome: "Nunzio", cognome: "Desimine", ruolo: "Movimento", piede: "Sinistro", anno: null, presenze: null, gol: null, foto: "", capitano: false, nota: "" },
  { numero: null, nome: "Damiano", cognome: "Pozzerese", ruolo: "Movimento", piede: "", anno: null, presenze: null, gol: null, foto: "", capitano: false, nota: "" },
  { numero: null, nome: "Vincenzo", cognome: "Astorino", ruolo: "Movimento", piede: "", anno: null, presenze: null, gol: null, foto: "", capitano: false, nota: "" },
  { numero: null, nome: "Francesco", cognome: "De Sario", ruolo: "Portiere", piede: "", anno: null, presenze: null, gol: null, foto: "", capitano: false, nota: "Portiere titolare nella seconda parte della stagione 2025/26" },
  { numero: null, nome: "Damiano", cognome: "Pinto", ruolo: "Movimento", piede: "", anno: null, presenze: null, gol: null, foto: "", capitano: false, nota: "" },
  { numero: null, nome: "Simone", cognome: "Tesoro", ruolo: "Movimento", piede: "", anno: null, presenze: null, gol: null, foto: "", capitano: false, nota: "" }
];

/* -------------------------------------------------------- ULTIME PARTITE
   esito: "V" vittoria | "N" pareggio | "P" sconfitta | "" da giocare
   Ordine libero: il sito le ordina automaticamente per data (piu' recenti).
------------------------------------------------------------------------- */
const PARTITE = [
  { data: "2026-04-26", casa: "Real Olimpia Terlizzi", ospite: "Triggiano", gc: 2, go: 3, esito: "P", comp: "Prima Categoria - Girone A", giornata: "26a", campo: '"Paolo Poli", Molfetta', marcatori: "Garbetta 52', Magarelli 67'", urlTuttocampo: "https://www.tuttocampo.it/2025-26/Puglia/BA/PrimaCategoria/GironeA/Partita/26.2/real-olimpia-terlizzi-triggiano-calcio" },
  { data: "2026-04-19", casa: "San Giovanni Rotondo", ospite: "Real Olimpia Terlizzi", gc: 3, go: 1, esito: "P", comp: "Prima Categoria - Girone A", giornata: "25a", campo: '"Mario Massa", San Giovanni Rotondo', marcatori: "Magarelli 40'", urlTuttocampo: "https://www.tuttocampo.it/2025-26/Puglia/BA/PrimaCategoria/GironeA/Partita/25.3/san-giovanni-rotondo-real-olimpia-terlizzi" },
  { data: "2026-04-12", casa: "Real Olimpia Terlizzi", ospite: "Olimpia Bitonto", gc: 1, go: 1, esito: "N", comp: "Prima Categoria - Girone A", giornata: "24a", campo: '"Paolo Poli", Molfetta', marcatori: "Magarelli 35'", urlTuttocampo: "https://www.tuttocampo.it/2025-26/Puglia/BA/PrimaCategoria/GironeA/Partita/24.5/real-olimpia-terlizzi-olimpia-bitonto" },
  { data: "2026-03-22", casa: "Molfetta Sportiva", ospite: "Real Olimpia Terlizzi", gc: 0, go: 6, esito: "V", comp: "Prima Categoria - Girone A", giornata: "23a", campo: '"Benedetto Petrone", Molfetta', marcatori: "Garbetta, Rubini, Magarelli 2, Amendolagine 20' - gara sospesa sullo 0-5, omologato 0-6", urlTuttocampo: "https://www.tuttocampo.it/2025-26/Puglia/BA/PrimaCategoria/GironeA/Partita/23.4/molfetta-sportiva-1917-real-olimpia-terlizzi" },
  { data: "2026-03-15", casa: "Real Olimpia Terlizzi", ospite: "Passion Sport Manfredonia", gc: 0, go: 1, esito: "P", comp: "Prima Categoria - Girone A", giornata: "22a", campo: '"Paolo Poli", Molfetta', marcatori: "Decide Stoppiello al 55' per gli ospiti", urlTuttocampo: "https://www.tuttocampo.it/2025-26/Puglia/BA/PrimaCategoria/GironeA/Partita/22.5/real-olimpia-terlizzi-passion-sport-manfredonia" },
  { data: "2026-03-08", casa: "Bitetto", ospite: "Real Olimpia Terlizzi", gc: 3, go: 0, esito: "P", comp: "Prima Categoria - Girone A", giornata: "21a", campo: '"Antonucci", Bitetto', marcatori: "", urlTuttocampo: "https://www.tuttocampo.it/2025-26/Puglia/BA/PrimaCategoria/GironeA/Partita/21.2/bitetto-real-olimpia-terlizzi" },
  { data: "2026-03-01", casa: "Real Olimpia Terlizzi", ospite: "Troia", gc: 1, go: 2, esito: "P", comp: "Prima Categoria - Girone A", giornata: "20a", campo: '"Paolo Poli", Molfetta', marcatori: "Magarelli", urlTuttocampo: "https://www.tuttocampo.it/2025-26/Puglia/BA/PrimaCategoria/GironeA/Partita/20.5/real-olimpia-terlizzi-g-s-troia" },
  { data: "2026-02-22", casa: "Real Zapponeta", ospite: "Real Olimpia Terlizzi", gc: 1, go: 1, esito: "N", comp: "Prima Categoria - Girone A", giornata: "19a", campo: '"Saverio De Martino", Zapponeta', marcatori: "", urlTuttocampo: "https://www.tuttocampo.it/2025-26/Puglia/BA/PrimaCategoria/GironeA/Partita/19.6/real-zapponeta-real-olimpia-terlizzi" }
];
/* --------------------------------------------------- RIEPILOGO STAGIONE
   Dati verificati della stagione appena conclusa.
------------------------------------------------------------------------- */
const STAGIONE_PRECEDENTE = {
  etichetta: "2025/26",
  campionato: "Prima Categoria Puglia - Girone A",
  posizione: 6,
  punti: 37,
  giornate: 26,
  allenatore: "Francesco Larosa",
  vincitrici: "Triggiano e Ideale Bari (58 punti, playoff per la Promozione)",
  nota: "Prima stagione in Prima Categoria, conquistata tramite ripescaggio nell'estate 2025."
};

/* ------------------------------------------------------------------- STORIA */
const STORIA = [
  { anno: "Le origini", titolo: "Nasce il Real Olimpia Terlizzi", testo: "Il club nasce per dare continuita' al calcio cittadino di Terlizzi, con l'obiettivo di far crescere ragazzi del territorio e riportare entusiasmo intorno alla squadra." },
  { anno: "2024/25", titolo: "Playoff sfiorati in Seconda Categoria", testo: "Con Giovanni Deliso in panchina i rossoblu arrivano a un passo dalla Prima Categoria: la promozione sfuma solo nella finale playoff, decisa da un calcio di rigore trasformato da Michele Biancofiore del San Giovanni Rotondo." },
  { anno: "Estate 2025", titolo: "Il salto in Prima Categoria", testo: "Il club viene ammesso in Prima Categoria attraverso i ripescaggi. Contemporaneamente, per i lavori al \"Comunale\" di Terlizzi, le gare interne vengono spostate allo stadio \"Paolo Poli\" di Molfetta." },
  { anno: "2025/26", titolo: "Sesto posto al debutto", testo: "Alla prima stagione nella categoria la squadra allenata da Francesco Larosa chiude al sesto posto con 37 punti nel Girone A, restando a lungo agganciata al gruppo di testa." },
  { anno: "2026/27", titolo: "A volte ritornano", testo: "Giovanni Deliso torna sulla panchina rossoblu per dare continuita' a un progetto ambizioso, con l'obiettivo di alzare l'asticella nel secondo campionato di Prima Categoria." }
];

/* ------------------------------------------------------------------ SPONSOR
   tipo: "main" | "gold" | "partner" | "tecnico"
   logo: "assets/images/sponsor/nome.png" (se vuoto mostra il nome scritto)
------------------------------------------------------------------------- */
const SPONSOR = [
  { nome: "Spazio Main Sponsor", tipo: "main", logo: "", url: "" },
  { nome: "Sponsor Gold", tipo: "gold", logo: "", url: "" },
  { nome: "Sponsor Gold", tipo: "gold", logo: "", url: "" },
  { nome: "Partner", tipo: "partner", logo: "", url: "" },
  { nome: "Partner", tipo: "partner", logo: "", url: "" },
  { nome: "Partner", tipo: "partner", logo: "", url: "" },
  { nome: "Sponsor Tecnico", tipo: "tecnico", logo: "", url: "" }
];

const PACCHETTI_SPONSOR = [
  { titolo: "Main Sponsor", voci: ["Logo sul fronte maglia gara", "Logo su tutti i materiali social e sito", "Striscione a bordocampo", "Presenza nella grafica pre-partita"] },
  { titolo: "Sponsor Gold", voci: ["Logo sul retro maglia o pantaloncino", "Spazio dedicato sul sito", "Striscione a bordocampo", "Post dedicato sui social"] },
  { titolo: "Partner Ufficiale", voci: ["Logo nella pagina sponsor", "Menzione nei post di fine gara", "Striscione a bordocampo"] },
  { titolo: "Sostenitore", voci: ["Nome nella lista sostenitori", "Ringraziamento pubblico sui canali social"] }
];

/* ---------------------------------------------------------------- GALLERIA
   Inserisci i file in assets/images/gallery/ e aggiungili qui.
   Esempio: { src:"assets/images/gallery/foto1.jpg", alt:"Esultanza" }
------------------------------------------------------------------------- */
const GALLERIA = [];

/* --------------------------------------------------------------------- FAQ */
const FAQ = [
  { d: "Dove gioca in casa il Real Olimpia Terlizzi?", r: 'Le gare interne si disputano allo stadio "Paolo Poli" di Molfetta, in attesa del completamento dei lavori di ristrutturazione del "Comunale" di Terlizzi.' },
  { d: "In quale campionato milita la squadra?", r: "Prima Categoria pugliese, Girone A. La stagione 2026/27 e' la seconda consecutiva nella categoria." },
  { d: "Come si fa a diventare sponsor?", r: "Scrivi dalla pagina Contatti indicando il pacchetto che ti interessa: ti ricontattiamo con tutti i dettagli e le tempistiche." },
  { d: "Posso venire a provare con la squadra?", r: "Si. Usa il modulo nella pagina Contatti selezionando \"Provino / tesseramento\" e indica anno di nascita, ruolo ed esperienze precedenti." },
  { d: "Dove trovo classifica e marcatori aggiornati?", r: "Nella pagina Classifica: i dati arrivano in tempo reale dai widget ufficiali Tuttocampo del nostro campionato." }
];

/* ----------------------------------------------------------- NOTIZIE FISSE
   Usate come riserva se i feed non sono raggiungibili, e sempre mostrate
   in cima con evidenza se metti in_evidenza: true.
------------------------------------------------------------------------- */
const NOTIZIE_FISSE = [
  {
    data: "2026-07-19",
    titolo: "A volte ritornano: Giovanni Deliso allenera' il Real Olimpia",
    estratto: "Il tecnico torna sulla panchina rossoblu per la seconda stagione consecutiva in Prima Categoria pugliese, con l'obiettivo di dare continuita' al progetto.",
    url: "https://www.terlizziviva.it/sport/a-volte-ritornano-mister-giovanni-deliso-allenera-il-real-olimpia/",
    fonte: "TerlizziViva",
    in_evidenza: true
  },
  {
    data: "2026-04-27",
    titolo: "Dignitoso sesto posto per il Real Olimpia Terlizzi",
    estratto: "La stagione si chiude con il 2-3 interno contro il Triggiano: sesto posto e 37 punti nel Girone A al primo anno in Prima Categoria.",
    url: "https://www.terlizziviva.it/sport/dignitoso-sesto-posto-per-il-real-olimpia-terlizzi/",
    fonte: "TerlizziViva",
    in_evidenza: false
  },
  {
    data: "2025-08-01",
    titolo: 'Il Real Olimpia Terlizzi giochera\u0027 al "Paolo Poli" di Molfetta',
    estratto: 'Per i lavori di ristrutturazione del "Comunale" la squadra trova casa nella vicina Molfetta.',
    url: "https://www.terlizziviva.it/sport/il-real-olimpia-terlizzi-giochera-al-paolo-poli/",
    fonte: "TerlizziViva",
    in_evidenza: false
  }
];
