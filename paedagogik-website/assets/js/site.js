/* =========================================================
   Sprachumschaltung und Kleinigkeiten.

   An dieser Datei muss normalerweise nichts geändert werden.
   Texte stehen in translations.js.

   Ablauf: Die Seite ist in HTML auf Deutsch geschrieben. Ist
   eine andere Sprache gewählt, ersetzt dieses Skript die Texte.
   Ohne JavaScript bleibt die deutsche Fassung sichtbar und
   vollständig lesbar.
   ========================================================= */

(function () {
  "use strict";

  var SUPPORTED = ["de", "en", "fr"];
  var FALLBACK = "de";
  var STORAGE_KEY = "sprache";
  var THEME_KEY = "erscheinungsbild";
  var aktuelleSprache = FALLBACK;

  /* Auf true: Besucher mit englisch- oder französischsprachigem Browser
     sehen die Seite beim ersten Aufruf gleich in ihrer Sprache.
     Auf false: alle starten auf Deutsch und wechseln selbst.
     Eine einmal von Hand gewählte Sprache hat immer Vorrang. */
  var FOLGE_BROWSERSPRACHE = true;

  /* --- Speicher: in manchen Browsern gesperrt, darum abgesichert --- */
  function readStored() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function writeStored(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* Speichern nicht möglich — die Seite funktioniert trotzdem. */
    }
  }

  /* --- Welche Sprache? URL vor Speicher vor Browsersprache vor Deutsch --- */
  function detectLanguage() {
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (SUPPORTED.indexOf(fromUrl) !== -1) return fromUrl;

    var stored = readStored();
    if (SUPPORTED.indexOf(stored) !== -1) return stored;

    if (FOLGE_BROWSERSPRACHE) {
      var preferred = navigator.languages || [navigator.language || ""];
      for (var i = 0; i < preferred.length; i++) {
        var code = String(preferred[i]).slice(0, 2).toLowerCase();
        if (SUPPORTED.indexOf(code) !== -1) return code;
      }
    }
    return FALLBACK;
  }

  /* --- Einen Text holen; fehlt er, wird Deutsch verwendet --- */
  function text(key, lang) {
    var dict = (window.SITE_TEXT && window.SITE_TEXT[lang]) || {};
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];

    var fallbackDict = (window.SITE_TEXT && window.SITE_TEXT[FALLBACK]) || {};
    if (Object.prototype.hasOwnProperty.call(fallbackDict, key)) {
      console.warn("Übersetzung fehlt:", key, "(" + lang + ")");
      return fallbackDict[key];
    }
    console.warn("Unbekannter Textschlüssel:", key);
    return "";
  }

  /* --- Helle oder dunkle Darstellung ---
     Ohne eigene Wahl gilt die Einstellung des Geräts. Ein Klick auf den
     Umschalter legt die Darstellung fest und wird im Browser gemerkt. */
  function aktuellesErscheinungsbild() {
    var gesetzt = document.documentElement.getAttribute("data-theme");
    if (gesetzt === "light" || gesetzt === "dark") return gesetzt;
    var dunkel = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return dunkel ? "dark" : "light";
  }

  function beschrifteUmschalter() {
    var knopf = document.querySelector("[data-theme-toggle]");
    if (!knopf) return;
    var schluessel = aktuellesErscheinungsbild() === "dark" ? "theme.toLight" : "theme.toDark";
    var beschriftung = text(schluessel, aktuelleSprache);
    knopf.setAttribute("aria-label", beschriftung);
    knopf.setAttribute("title", beschriftung);
  }

  function wechsleErscheinungsbild() {
    var neu = aktuellesErscheinungsbild() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", neu);
    try {
      window.localStorage.setItem(THEME_KEY, neu);
    } catch (e) {
      /* Speichern nicht möglich — gilt dann nur für diesen Seitenaufruf. */
    }
    beschrifteUmschalter();
  }

  /* --- Sprache auf die Seite anwenden --- */
  function apply(lang) {
    var year = String(new Date().getFullYear());
    aktuelleSprache = lang;

    function resolve(key) {
      return text(key, lang).replace("{year}", year);
    }

    document.documentElement.setAttribute("lang", lang);

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = resolve(nodes[i].getAttribute("data-i18n"));
    }

    var images = document.querySelectorAll("[data-i18n-alt]");
    for (var j = 0; j < images.length; j++) {
      images[j].setAttribute("alt", resolve(images[j].getAttribute("data-i18n-alt")));
    }

    var labelled = document.querySelectorAll("[data-i18n-aria-label]");
    for (var k = 0; k < labelled.length; k++) {
      labelled[k].setAttribute("aria-label", resolve(labelled[k].getAttribute("data-i18n-aria-label")));
    }

    var metaTitleKey = document.body.getAttribute("data-meta-title");
    if (metaTitleKey) document.title = resolve(metaTitleKey);

    var metaDescKey = document.body.getAttribute("data-meta-description");
    var metaDescTag = document.querySelector('meta[name="description"]');
    if (metaDescKey && metaDescTag) metaDescTag.setAttribute("content", resolve(metaDescKey));

    var buttons = document.querySelectorAll("[data-lang]");
    for (var m = 0; m < buttons.length; m++) {
      buttons[m].setAttribute("aria-pressed", String(buttons[m].getAttribute("data-lang") === lang));
    }

    carryLanguageInLinks(lang);
    beschrifteUmschalter();
  }

  /* --- Sprache auf Impressum/Datenschutz mitnehmen, auch ohne Speicher --- */
  function carryLanguageInLinks(lang) {
    var links = document.querySelectorAll('a[href$=".html"], a[href*=".html#"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      if (!href || /^[a-z]+:/i.test(href) || href.indexOf("//") === 0) continue;

      var hashIndex = href.indexOf("#");
      var hash = hashIndex === -1 ? "" : href.slice(hashIndex);
      var path = (hashIndex === -1 ? href : href.slice(0, hashIndex)).split("?")[0];
      links[i].setAttribute("href", path + "?lang=" + lang + hash);
    }
  }

  /* --- Sprache in der Adresszeile festhalten, damit Links teilbar sind --- */
  function updateUrl(lang) {
    try {
      var params = new URLSearchParams(window.location.search);
      params.set("lang", lang);
      window.history.replaceState(
        null,
        "",
        window.location.pathname + "?" + params.toString() + window.location.hash
      );
    } catch (e) {
      /* Bei lokal geöffneten Dateien nicht möglich — unkritisch. */
    }
  }

  function setLanguage(lang, persist) {
    if (SUPPORTED.indexOf(lang) === -1) lang = FALLBACK;
    apply(lang);
    if (persist) {
      writeStored(lang);
      updateUrl(lang);
    }
  }

  /* --- Start --- */
  function init() {
    setLanguage(detectLanguage(), false);

    var switcher = document.querySelector("[data-lang-switch]");
    if (switcher) {
      switcher.addEventListener("click", function (event) {
        var button = event.target.closest("[data-lang]");
        if (!button) return;
        setLanguage(button.getAttribute("data-lang"), true);
      });
    }

    var umschalter = document.querySelector("[data-theme-toggle]");
    if (umschalter) {
      umschalter.addEventListener("click", wechsleErscheinungsbild);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
