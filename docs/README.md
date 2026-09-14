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
cd docs
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
| `robots.txt` | hält Suchmaschinen von der Vorschau fern |
| `.nojekyll` | sagt GitHub, die Dateien unverändert auszuliefern |

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

## Helle und dunkle Darstellung

Die Seite richtet sich zunächst nach der Einstellung des Geräts: wer sein
Handy oder seinen Rechner auf Dunkelmodus gestellt hat, sieht die dunkle
Fassung. Über die Schaltfläche mit Mond beziehungsweise Sonne oben rechts
lässt sich das jederzeit umstellen, und die Wahl bleibt gespeichert.

Soll die Seite **immer** hell erscheinen, unabhängig vom Gerät: in
`assets/css/style.css` die beiden Blöcke löschen, die mit
`@media (prefers-color-scheme: dark)` und mit `:root[data-theme="dark"]`
beginnen. Dann kann auch die Schaltfläche aus den drei HTML-Dateien
entfernt werden (sie trägt `class="theme-toggle"`).

## Die Wellenlinien im Kopfbereich

Unter dem Einstiegstext liegt ein Band aus feinen, geschwungenen Linien.
Es ist reine Gestaltung und steht als SVG direkt in `index.html`
(`<div class="hero-waves">`). Zwei Stellschrauben in `style.css`:

- `--wave` bei den Farben ganz oben: Deckkraft, je Darstellung getrennt
- `.hero-waves { height: ... }`: Höhe des Bands

Wer es ganz weglassen will, löscht den `<div class="hero-waves">` samt
Inhalt aus `index.html`.

## Veröffentlichen

Die Seite braucht keinen besonderen Server — es genügt Webhosting, das
Dateien ausliefert. In der Schweiz zum Beispiel Infomaniak, Hostpoint oder
Metanet.

1. Domain registrieren (rund 15–20 CHF pro Jahr)
2. Webhosting-Paket dazu buchen
3. Den **Inhalt** des Ordners `docs` in das Web-Verzeichnis hochladen
   (meist `public_html` oder `www`), nicht den Ordner selbst, sondern was
   darin liegt. Die Datei `robots.txt` dabei weglassen: sie gehört nur
   zur Vorschau und würde die echte Seite vor Suchmaschinen verstecken
4. HTTPS aktivieren (bei allen genannten Anbietern kostenlos)

Danach ist die Seite unter der eigenen Domain erreichbar.

## Vorschau ohne eigene Domain

Solange es keine Domain gibt, kann GitHub die Seite kostenlos unter einer
Adresse der Form `https://<benutzername>.github.io/adria-schnorchel-log/`
bereitstellen. Genau dafür heisst dieser Ordner `docs`: GitHub Pages
liefert in der einfachen Betriebsart entweder das Wurzelverzeichnis oder
einen Ordner namens `docs` aus, und das Wurzelverzeichnis ist hier schon
vom Schnorchel-Log belegt.

Einzustellen, einmalig und von Hand:

1. Im Repository auf **Settings → Pages**
2. Bei *Source* **Deploy from a branch** wählen
3. Als *Branch* den gewünschten Branch und als Ordner **`/docs`** wählen
4. **Save**

Nach ein bis zwei Minuten ist die Seite unter der Adresse erreichbar, die
auf derselben Einstellungsseite erscheint. Ab dann veröffentlicht jeder
Push auf diesen Branch die neue Fassung von selbst.

Die Datei `robots.txt` hält Suchmaschinen von der Vorschau fern, solange
noch Platzhalter darin stehen. Sie gehört nicht auf die spätere echte
Domain.


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
