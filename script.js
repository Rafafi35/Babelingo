const data = {
    "aufgaben": [
        {
            "fremdSatz": "This place is wonderful!",
            "lückenSatz": "Dieser Ort ist _!",
            "lösungswort": "wunderbar"
        },
        {
            "fremdSatz": "This is a once-in-a-lifetime oppertunity!",
            "lückenSatz": "Dies ist eine einmalige _!",
            "lösungswort": "Gelegenheit"
        },
        {
            "fremdSatz": "I am feeling very tired today.",
            "lückenSatz": "Ich fühle mich heute sehr _.",
            "lösungswort": "müde"
        },
        {
            "fremdSatz": "She always speaks the truth.",
            "lückenSatz": "Sie sagt immer die _.",
            "lösungswort": "Wahrheit"
        },
        {
            "fremdSatz": "We need to hurry or we will be late.",
            "lückenSatz": "Wir müssen uns _ oder wir kommen zu spät.",
            "lösungswort": "beeilen"
        },
        {
            "fremdSatz": "He is an excellent musician.",
            "lückenSatz": "Er ist ein hervorragender _.",
            "lösungswort": "Musiker"
        },
        {
            "fremdSatz": "I forgot my homework at home.",
            "lückenSatz": "Ich habe meine Hausaufgaben zu _ vergessen.",
            "lösungswort": "Hause"
        },
        {
            "fremdSatz": "They are very friendly people.",
            "lückenSatz": "Sie sind sehr _ Menschen.",
            "lösungswort": "freundliche"
        },
        {
            "fremdSatz": "Can you help me with this problem?",
            "lückenSatz": "Kannst du mir bei diesem _ helfen?",
            "lösungswort": "Problem"
        },
        {
            "fremdSatz": "I enjoy reading books in my free time.",
            "lückenSatz": "Ich lese in meiner Freizeit gerne _.",
            "lösungswort": "Bücher"
        },
        {
            "fremdSatz": "It is raining heavily outside.",
            "lückenSatz": "Draußen regnet es _.",
            "lösungswort": "stark"
        },
        {
            "fremdSatz": "She bought a beautiful dress for the party.",
            "lückenSatz": "Sie hat ein wunderschönes _ für die Party gekauft.",
            "lösungswort": "Kleid"
        }
    ]
}
const fremdTextAnzeige = document.getElementById("fremdText")
const lückentextAnzeige = document.getElementById("lückenText")

let loesungswort = ""
let aufgabenIndex = 0

fremdTextAnzeige.textContent = data.aufgaben[0].fremdSatz
let lückenText = data.aufgaben[0].lückenSatz
lückentextAnzeige.textContent = lückenText
let lückenTextTeile = lückenText.split("_")

document.addEventListener("keydown", function (event) {
    if (event.key.length === 1) {
        if (loesungswort.length < 25) {
            loesungswort += event.key
            lückentextAnzeige.textContent = lückenTextTeile[0] + loesungswort + lückenTextTeile[1]
        }
    } else if (event.key === "Backspace") {
        loesungswort = loesungswort.slice(0, -1)
        lückentextAnzeige.textContent = lückenTextTeile[0] + loesungswort + lückenTextTeile[1]
    } else if (event.key === "Enter") {
        if (loesungswort === data.aufgaben[aufgabenIndex].lösungswort) {
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
    loesungswort = ""
    fremdTextAnzeige.textContent = data.aufgaben[aufgabenIndex].fremdSatz
    lückenText = data.aufgaben[aufgabenIndex].lückenSatz
    lückentextAnzeige.textContent = lückenText
    lückenTextTeile = lückenText.split("_")
}