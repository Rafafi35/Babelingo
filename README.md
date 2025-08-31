# Babelingo - Sprachenlern-App

Ein Browserbasiertes Sprachenlern Tool mit mehreren Sprachen und Niveaus (B1 - C2). Lies den Satz in der Fremdsprache und fülle das Fehlende Wort in die Deutsche übersetzung ein.

Öffne die App über https://rafafi35.github.io/Babelingo/
oder öffne index.html mit einem Live Server (z.B über VS Code)

## Learnings
- Arbeiten mit Tastatur eingabe (Eventlistener "Keydown")
- Verarbeiten von Daten aus einer .json Datei
- Daten aus MySql Datenbank über js backend im Frontend verwenden (Feature noch nicht fertig)

## Funktionen
- Mehrsprachige Auswahl: Englisch, Französisch, Spanisch
- Niveaus: B1, B2, C1, C2
- Tastatur eingabe (Keine Formulare)
- Mehrere Richtige Antworten
- Zwei Antwort versuche
- Richtiges Wort wird nach zwei Fehlern angezeigt
- Zufällige Aufgaben Reihenfolge

## Bedienung
- Buchstaben / Zeichen: Ergänzen das Lösungswort (max. 25 Zeichen)
- Backspace: Letztes Zeichen löschen
- Enter: Lösung prüfen
- Escape: Zurück zum Hauptmenü (Fortschritt der aktuellen Runde wird verworfen)

## Erweitern

Um die vorgegebenen Aufgaben zu erweitern:
1. `data.json` öffnen.
2. Neuen Schlüssel wie `italienischB1` hinzufügen:
   ```json
   "italienischB1": [
     {
       "fremdSatz": "Questo è un esempio.",
       "ersterTeil": "Dies ist ein ",
       "lösungswort": ["Beispiel"],
       "zweiterTeil": "."
     }
3. Im HTML ein neues Block-Fragment ergänzen (analog zu Englisch/Französisch/Spanisch):
   ```html
   <div class="sprache">
     <button>Italiano</button>
     <button onclick="spracheFestlegen('italienischB1')">B1</button>
     ...
   </div>
   ```

## Roadmap
- Funktion zur erstellung eigener Lernsets in der App. Speichern dieser Sets in einer lokalen MySql Datenbank.
