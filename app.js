const titularCuenta = "Sebastián"
let saldoActual = 92.5215
const simboloMon = "€"

function formatearDinero(cantidad){

    return Number.parseFloat(cantidad).toFixed(2);

}

console.log(formatearDinero(saldoActual) + simboloMon)

const movimientos = [{

    Id:"1",
    Concepto:"Transferencia recibida",
    Importe:"+50.00",
    Categoria:"Transferencia",
    Fecha:"27/02/2025"

},
{

    Id:"2",
    Concepto:"Alimentación",
    Importe:"-251.36",
    Categoria:"Alimentación",
    Fecha:"01/03/2025"

},
{

    Id:"3",
    Concepto:"Hipoteca",
    Importe:"-835.58",
    Categoria:"Hogar",
    Fecha:"30/03/2025"

},
{

    Id:"4",
    Concepto:"Nomina",
    Importe:"+1452.28",
    Categoria:"Nomina",
    Fecha:"30/04/2025"

},
{

    Id:"5",
    Concepto:"Transeferencia Recibida",
    Importe:"+500.00",
    Categoria:"Transferencia",
    Fecha:"20/04/2025"

},
{

    Id:"6",
    Concepto:"Streaming Suscripción",
    Importe:"-12.99",
    Categoria:"Suscripciones y Tecnología",
    Fecha:"30/05/2025"

}
]