const fremdTextAnzeige = document.getElementById("fremdText")
const ersterTeilAnzeige = document.getElementById("ersterTeil")
const zweiterTeilAnzeige = document.getElementById("zweiterTeil")
const lösungswortAnzeige = document.getElementById("lösungswort")

let data
let lösungswort = ""
let aufgabenIndex
let erledigteAufgaben = []
let versuch = 1

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// der Inhalt von data.json ist KI-Generiert
fetch("./data.json")
    .then(response => response.json())
    .then(json => {
        data = json

        aufgabenIndex = Math.floor(Math.random() * data.aufgaben.length)
        fremdTextAnzeige.textContent = data.aufgaben[aufgabenIndex].fremdSatz
        ersterTeilAnzeige.textContent = data.aufgaben[aufgabenIndex].ersterTeil
        zweiterTeilAnzeige.textContent = data.aufgaben[aufgabenIndex].zweiterTeil
    })
    .catch(err => console.error("Fehler beim Laden von JSON:", err))

document.addEventListener("keydown", async function (event) {
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
        lösungswort = lösungswort.toLowerCase()
        if (data.aufgaben[aufgabenIndex].lösungswort.includes(lösungswort)) {
            lösungswortAnzeige.style.color = "#0b7e0bff"
            await sleep(500)
            lösungswortAnzeige.style.color = ""
            nächsteAufgabe()
        } else {
            await falsch()
        }
    }
})

async function falsch() {
    lösungswortAnzeige.style.color = "red"
    lösungswortAnzeige.classList.add("falsch")
    await sleep(750)
    lösungswortAnzeige.style.color = ""
    lösungswortAnzeige.classList.remove("falsch")
    lösungswort = ""
    lösungswortAnzeige.textContent = lösungswort
    if (versuch === 1) {
        versuch = 2
    } else if (versuch === 2) {
        nächsteAufgabe()
        versuch = 1
    }
}

function nächsteAufgabe() {
    if (!data) return
    erledigteAufgaben.push(aufgabenIndex)
    if (erledigteAufgaben.length >= data.aufgaben.length) {
        console.log("alle aufgaben gelöst")
    } else {
        while (erledigteAufgaben.includes(aufgabenIndex)) {
            aufgabenIndex = Math.floor(Math.random() * data.aufgaben.length)
        }
    }
    lösungswort = ""
    fremdTextAnzeige.textContent = data.aufgaben[aufgabenIndex].fremdSatz
    ersterTeilAnzeige.textContent = data.aufgaben[aufgabenIndex].ersterTeil
    zweiterTeilAnzeige.textContent = data.aufgaben[aufgabenIndex].zweiterTeil
    lösungswortAnzeige.textContent = lösungswort
}