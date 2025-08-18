const lückentext = document.getElementById("lückenText")

let loesungswort = ""
document.addEventListener("keypress", function (event) {
    loesungswort += event.key
    lückentext.textContent = loesungswort

})