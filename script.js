const fremdTextAnzeige = document.getElementById("fremdText")
const ersterTeilAnzeige = document.getElementById("ersterTeil")
const zweiterTeilAnzeige = document.getElementById("zweiterTeil")
const lösungswortAnzeige = document.getElementById("lösungswort")
const aufgabenDiv = document.getElementById("aufgabenDiv")
const hauptmenü = document.getElementById("hauptmenü")
const customMenü = document.getElementById("customMenü")

let data
let lösungswort = ""
let aufgabenIndex
let erledigteAufgaben = []
let versuch = 1
let lernsetName = ""
let customData

// der Inhalt von data.json ist KI-Generiert
fetch("./data.json")
    .then(response => response.json())
    .then(json => {
        data = json
    })
    .catch(err => console.error("Fehler beim Laden von JSON:", err))

fetch("/api/lernsets")
    .then(res => res.json())
    .then(rows => {
        customData = rows
        Object.keys(rows).forEach(lernsetName => {
            if (!data[lernsetName]) {
                data[lernsetName] = rows[lernsetName];
            }
        })
    })
    .catch(err => err)

function lernsetFestlegen(x) {
    lernsetName = x
    hauptmenü.style.display = "none"
    aufgabenDiv.style.display = "flex"
    if (data[lernsetName]) {
        aufgabenIndex = Math.floor(Math.random() * data[lernsetName].length)
        fremdTextAnzeige.textContent = data[lernsetName][aufgabenIndex].fremdSatz
        ersterTeilAnzeige.textContent = data[lernsetName][aufgabenIndex].ersterTeil
        zweiterTeilAnzeige.textContent = data[lernsetName][aufgabenIndex].zweiterTeil
    }
}

function customMenüAufrufen() {
    hauptmenü.style.display = "none"
    customMenü.style.display = "flex"
}

document.addEventListener("keydown", async function handleKeydown(event) {
    if (!data) return
    if (event.key.length === 1) {
        if (lösungswort.length < 25) {
            lösungswort += event.key
            lösungswortAnzeige.textContent = lösungswort
        }
    } else if (event.key === "Backspace") {
        lösungswort = lösungswort.slice(0, -1)
        lösungswortAnzeige.textContent = lösungswort
    } else if (event.key === "Escape") {
        hauptmenü.style.display = ""
        aufgabenDiv.style.display = "none"
        erledigteAufgaben = []
    } else if (event.key === "Enter") {
        lösungswort = lösungswort.toLowerCase()
        if (data[lernsetName][aufgabenIndex].lösungswort.includes(lösungswort)) {
            lösungswortAnzeige.style.color = "#0b7e0bff"
            await sleep(500)
            lösungswortAnzeige.style.color = ""
            versuch = 1
            nächsteAufgabe()
        } else {
            await falsch()
        }
    }

    function sleep(ms) {
        document.removeEventListener("keydown", handleKeydown)
        return new Promise(resolve => {
            setTimeout(() => {
                document.addEventListener("keydown", handleKeydown)
                resolve()
            }, ms)
        })
    }

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
            lösungswortAnzeige.textContent = data[lernsetName][aufgabenIndex].lösungswort[0]
            lösungswortAnzeige.style.color = "darkviolet"
            await sleep(1500)
            lösungswortAnzeige.style.color = ""
            nächsteAufgabe()
            versuch = 1
        }
    }
})

function nächsteAufgabe() {
    if (!data) return
    erledigteAufgaben.push(aufgabenIndex)
    if (erledigteAufgaben.length >= data[lernsetName].length) {
        console.log("alle aufgaben gelöst")
        hauptmenü.style.display = ""
        aufgabenDiv.style.display = "none"
        erledigteAufgaben = []
    } else {
        while (erledigteAufgaben.includes(aufgabenIndex)) {
            aufgabenIndex = Math.floor(Math.random() * data[lernsetName].length)
        }
    }
    lösungswort = ""
    fremdTextAnzeige.textContent = data[lernsetName][aufgabenIndex].fremdSatz
    ersterTeilAnzeige.textContent = data[lernsetName][aufgabenIndex].ersterTeil
    zweiterTeilAnzeige.textContent = data[lernsetName][aufgabenIndex].zweiterTeil
    lösungswortAnzeige.textContent = lösungswort
}