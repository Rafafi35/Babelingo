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
        }
    ]
}
const fremdTextAnzeige = document.getElementById("fremdText")
const lückentextAnzeige = document.getElementById("lückenText")

let loesungswort = ""

fremdTextAnzeige.textContent = data.aufgaben[0].fremdSatz
let lückenText = data.aufgaben[0].lückenSatz
lückentextAnzeige.textContent = lückenText
let lückenTextTeile = lückenText.split("_")

document.addEventListener("keydown", function (event) {
    loesungswort += event.key
    lückentextAnzeige.textContent = lückenTextTeile[0] + loesungswort + lückenTextTeile[1]

})