const data = {
    "aufgaben": [
        {
            "fremdSatz": "This place is wonderful!",
            "ersterTeil": "Dieser Ort ist ",
            "lösungswort": "wunderbar",
            "zweiterTeil": "!"
        },
        {
            "fremdSatz": "This is a once-in-a-lifetime opportunity!",
            "ersterTeil": "Dies ist eine einmalige ",
            "lösungswort": "Gelegenheit",
            "zweiterTeil": "!"
        },
        {
            "fremdSatz": "I am feeling very tired today.",
            "ersterTeil": "Ich fühle mich heute sehr ",
            "lösungswort": "müde",
            "zweiterTeil": "."
        },
        {
            "fremdSatz": "She always speaks the truth.",
            "ersterTeil": "Sie sagt immer die ",
            "lösungswort": "Wahrheit",
            "zweiterTeil": "."
        },
        {
            "fremdSatz": "We need to hurry or we will be late.",
            "ersterTeil": "Wir müssen uns ",
            "lösungswort": "beeilen",
            "zweiterTeil": " oder wir kommen zu spät."
        },
        {
            "fremdSatz": "He is an excellent musician.",
            "ersterTeil": "Er ist ein hervorragender ",
            "lösungswort": "Musiker",
            "zweiterTeil": "."
        },
        {
            "fremdSatz": "I forgot my homework at home.",
            "ersterTeil": "Ich habe meine Hausaufgaben zu ",
            "lösungswort": "Hause",
            "zweiterTeil": " vergessen."
        },
        {
            "fremdSatz": "They are very friendly people.",
            "ersterTeil": "Sie sind sehr ",
            "lösungswort": "freundliche",
            "zweiterTeil": " Menschen."
        },
        {
            "fremdSatz": "Can you help me with this problem?",
            "ersterTeil": "Kannst du mir bei diesem ",
            "lösungswort": "Problem",
            "zweiterTeil": " helfen?"
        },
        {
            "fremdSatz": "I enjoy reading books in my free time.",
            "ersterTeil": "Ich lese in meiner Freizeit gerne ",
            "lösungswort": "Bücher",
            "zweiterTeil": "."
        },
        {
            "fremdSatz": "It is raining heavily outside.",
            "ersterTeil": "Draußen regnet es ",
            "lösungswort": "stark",
            "zweiterTeil": "."
        },
        {
            "fremdSatz": "She bought a beautiful dress for the party.",
            "ersterTeil": "Sie hat ein wunderschönes ",
            "lösungswort": "Kleid",
            "zweiterTeil": " für die Party gekauft."
        }
    ]
}

const fremdTextAnzeige = document.getElementById("fremdText")
const ersterTeilAnzeige = document.getElementById("ersterTeil")
const zweiterTeilAnzeige = document.getElementById("zweiterTeil")
const lösungswortAnzeige = document.getElementById("lösungswort")

let lösungswort = ""
let aufgabenIndex = 0

fremdTextAnzeige.textContent = data.aufgaben[0].fremdSatz
let ersterTeil = data.aufgaben[0].ersterTeil
let zweiterTeil = data.aufgaben[0].zweiterTeil
ersterTeilAnzeige.textContent = ersterTeil
zweiterTeilAnzeige.textContent = zweiterTeil

document.addEventListener("keydown", function (event) {
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
    if (aufgabenIndex >= data.aufgaben.length - 1) {
        aufgabenIndex = 0
    } else {
        aufgabenIndex++
    }
    lösungswort = ""
    fremdTextAnzeige.textContent = data.aufgaben[aufgabenIndex].fremdSatz
    ersterTeil = data.aufgaben[aufgabenIndex].ersterTeil
    zweiterTeil = data.aufgaben[aufgabenIndex].zweiterTeil
    ersterTeilAnzeige.textContent = ersterTeil
    zweiterTeilAnzeige.textContent = zweiterTeil
    lösungswortAnzeige.textContent = lösungswort
}