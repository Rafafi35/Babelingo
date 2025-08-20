const fremdTextAnzeige = document.getElementById("fremdText")
const ersterTeilAnzeige = document.getElementById("ersterTeil")
const zweiterTeilAnzeige = document.getElementById("zweiterTeil")
const lösungswortAnzeige = document.getElementById("lösungswort")

let data
let lösungswort = ""
let aufgabenIndex = 0

fetch("./data.json")
  .then(response => response.json())
  .then(json => {
    data = json

    fremdTextAnzeige.textContent = data.aufgaben[0].fremdSatz
    ersterTeilAnzeige.textContent = data.aufgaben[0].ersterTeil
    zweiterTeilAnzeige.textContent = data.aufgaben[0].zweiterTeil
  })
  .catch(err => console.error("Fehler beim Laden von JSON:", err))

document.addEventListener("keydown", function (event) {
    if (!data) return
    if (event.key.length === 1) {
        if (lösungswort.length < 25) {
            lösungswort += event.key
            lösungswortAnzeige.textContent = lösungswort
        }
    } else if (event.key === "Backspace") {
        lösungswort = lösungswort.slice(0, -1)
        lösungswortAnzeige.textContent = lösungswort
    } else if (event.key === "Enter") {
        if (lösungswort === data.aufgaben[aufgabenIndex].lösungswort) {
            console.log("Korrekt")
        } else {
            console.log("Falsch")
        }
        nächsteAufgabe()
    }
})

function nächsteAufgabe() {
    if (!data) return
    if (aufgabenIndex >= data.aufgaben.length - 1) {
        aufgabenIndex = 0
    } else {
        aufgabenIndex++
    }
    lösungswort = ""
    fremdTextAnzeige.textContent = data.aufgaben[aufgabenIndex].fremdSatz
    ersterTeilAnzeige.textContent = data.aufgaben[aufgabenIndex].ersterTeil
    zweiterTeilAnzeige.textContent = data.aufgaben[aufgabenIndex].zweiterTeil
    lösungswortAnzeige.textContent = lösungswort
}