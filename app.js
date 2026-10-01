const titularCuenta = "Sebastián"
let saldoActual = 92.5215
const simboloMon = "€"

function formatearDinero(cantidad){

    return Number.parseFloat(cantidad).toFixed(2);

}

console.log(formatearDinero(saldoActual) + simboloMon)