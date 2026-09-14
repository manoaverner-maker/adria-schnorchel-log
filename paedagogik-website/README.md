# Website Pädagogische Beratung

Grundgerüst der Website — dreisprachig (Deutsch, Englisch, Französisch),
ohne Datenbank, ohne Baukasten. Reines HTML, CSS und etwas JavaScript.
Das heisst: sehr schnell, sehr günstig zu betreiben und in zehn Jahren
noch lauffähig.

## Lokal ansehen

Die Dateien lassen sich per Doppelklick auf `index.html` öffnen. Sauberer
ist ein kleiner lokaler Server, damit sich die Seite genau so verhält wie
später im Netz:

```
cd paedagogik-website
python3 -m http.server 8000
```

Dann im Browser `http://localhost:8000` aufrufen.

## Welche Datei wofür

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite (Hero, Angebot, Ablauf, Über uns, Referenzen, Kontakt) |
| `impressum.html` | Impressum |
| `datenschutz.html` | Datenschutzerklärung |
| `assets/js/translations.js` | **Alle Texte**, in allen drei Sprachen |
| `assets/css/style.css` | Gestaltung — Farben ganz oben gesammelt |
| `assets/css/fonts.css` | Schrift-Einbindung (wird nicht von Hand gepflegt) |
| `assets/js/site.js` | Sprachumschaltung |
| `assets/img/` | Bilder |
| `assets/fonts/` | Schriftdateien samt Lizenztexten |

## Texte ändern

Alle sichtbaren Texte stehen in `assets/js/translations.js`. Jeder Text
existiert dreimal — einmal unter `de`, einmal unter `en`, einmal unter
`fr`. Geändert wird nur das, was rechts vom Doppelpunkt in
Anführungszeichen steht:

```js
"hero.title": "Klarheit für Eltern, Kinder und Schule.",
```

Die Schlüssel links (`hero.title`) bleiben unverändert — sie verbinden den
Text mit der Stelle auf der Seite.

**Massgebend ist immer `translations.js`.** Was dort steht, erscheint auf
der Seite.

Die deutschen Texte stehen zusätzlich im HTML. Das ist eine Rückfallebene
für den seltenen Fall, dass JavaScript nicht lädt — dann bleibt die Seite
auf Deutsch vollständig lesbar. Wird ein deutscher Text geändert, darf er
im HTML bei Gelegenheit nachgezogen werden; nötig ist es nicht. Eine
Änderung nur im HTML dagegen bleibt wirkungslos, weil `translations.js`
sie wieder überschreibt.

## Fotos einsetzen

1. Foto nach `assets/img/` legen, zum Beispiel `portrait-hans.jpg`
2. In `index.html` die Stelle suchen, an der
   `assets/img/portrait-platzhalter.svg` steht
3. Dateinamen ersetzen

Empfehlung: Hochformat (Seitenverhältnis 3:4), mindestens 600 × 800 Pixel,
als JPG gespeichert und auf unter 300 KB komprimiert. Die Seite schneidet
das Bild automatisch passend zu.

## Was noch ausgefüllt werden muss

Alles in eckigen Klammern `[ … ]` ist ein Platzhalter. Solange ein Text
noch ein Platzhalter ist, wird er auf der Seite **farbig hinterlegt** —
so ist auf einen Blick sichtbar, was noch fehlt.

Offen sind zurzeit:

- [ ] Name der Praxis (`brand.name`, kommt an vielen Stellen vor)
- [ ] Ort und Region (`hero.eyebrow`, `facts.2.text`)
- [ ] Namen, Funktionen und Werdegänge der beiden (`about.1.*`, `about.2.*`)
- [ ] Diplome und Abschlüsse (`about.*.cred1` bis `cred3`)
- [ ] Gemeinsame Haltung, zwei Sätze (`about.lead`)
- [ ] Zwei Portraitfotos
- [ ] Telefon, E-Mail, Adresse, Erreichbarkeit (stehen direkt in `index.html`)
- [ ] Volle Adresse in `impressum.html` und `datenschutz.html`
- [ ] Datum in `datenschutz.html` („Stand“)
- [ ] Echte Rückmeldungen — oder den Abschnitt „Referenzen“ vorläufig entfernen

**Vor dem Aufschalten:** in `assets/css/style.css` den Abschnitt
„13. Platzhalter-Kennzeichnung“ suchen und die Regel `.placeholder`
auskommentieren. Dann verschwindet die farbige Markierung.

## Sprachen

Die Seite startet in der Sprache des Browsers, sofern Deutsch, Englisch
oder Französisch — sonst auf Deutsch. Eine von Hand gewählte Sprache wird
im Browser gemerkt und hat immer Vorrang.

Soll die Seite stattdessen **immer** auf Deutsch starten: in
`assets/js/site.js` ganz oben `FOLGE_BROWSERSPRACHE` auf `false` setzen.

Eine weitere Sprache (zum Beispiel Italienisch oder Tschechisch)
hinzufügen:

1. In `translations.js` den ganzen `de`-Block kopieren, in `it` umbenennen
   und übersetzen
2. In `site.js` bei `SUPPORTED` das Kürzel ergänzen
3. In allen drei HTML-Dateien beim Sprachumschalter eine Schaltfläche
   ergänzen: `<button type="button" data-lang="it" aria-pressed="false" lang="it">IT</button>`

Für Tschechisch sind die nötigen Sonderzeichen bereits in den
Schriftdateien enthalten.

## Veröffentlichen

Die Seite braucht keinen besonderen Server — es genügt Webhosting, das
Dateien ausliefert. In der Schweiz zum Beispiel Infomaniak, Hostpoint oder
Metanet.

1. Domain registrieren (rund 15–20 CHF pro Jahr)
2. Webhosting-Paket dazu buchen
3. Den **Inhalt** des Ordners `paedagogik-website` in das
   Web-Verzeichnis hochladen (meist `public_html` oder `www`) — nicht den
   Ordner selbst, sondern was darin liegt
4. HTTPS aktivieren (bei allen genannten Anbietern kostenlos)

Danach ist die Seite unter der eigenen Domain erreichbar.

## Technische Entscheide, kurz begründet

- **Keine Cookies, kein Tracking, keine Dienste Dritter.** Die Schriften
  liegen lokal auf dem eigenen Server statt bei Google. Das ist schneller
  und deckt sich mit der Datenschutzerklärung.
- **Kein Kontaktformular.** Ein Formular braucht einen Dienst, der die
  Nachrichten entgegennimmt. Solange es den nicht gibt, wäre ein Formular
  eine Attrappe. Stattdessen sind Telefon und E-Mail direkt anklickbar.
  Ein Formular lässt sich später jederzeit ergänzen.
- **Eine Seite statt vieler.** Bei diesem Umfang wirkt eine durchgehende
  Startseite aufgeräumter als fünf kurze Unterseiten. Impressum und
  Datenschutz sind separat, weil sie dorthin gehören.
