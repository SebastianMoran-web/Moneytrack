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
    Importe: 50.00,
    Categoria:"Transferencia",
    Fecha:"27/02/2025"

},
{

    Id:"2",
    Concepto:"Alimentación",
    Importe: -251.36,
    Categoria:"Alimentación",
    Fecha:"01/03/2025"

},
{

    Id:"3",
    Concepto:"Hipoteca",
    Importe: -835.58,
    Categoria:"Hogar",
    Fecha:"30/03/2025"

},
{

    Id:"4",
    Concepto:"Nomina",
    Importe: 1452.28,
    Categoria:"Nomina",
    Fecha:"30/04/2025"

},
{

    Id:"5",
    Concepto:"Transeferencia Recibida",
    Importe: 500.00,
    Categoria:"Transferencia",
    Fecha:"20/04/2025"

},
{

    Id:"6",
    Concepto:"Streaming Suscripción",
    Importe: -12.99,
    Categoria:"Suscripciones y Tecnología",
    Fecha:"30/05/2025"

}
]


function totalIngresos(movs) {
  let suma = 0;

  movs.forEach(movimiento => {
    if (movimiento.Importe > 0) {
      suma += movimiento.Importe;
    }
  });

  return suma;
}

console.log(totalIngresos(movimientos));


function totalGastos(movis) {
  let resta = 0;

  movis.forEach(movimiento => {
    if (movimiento.Importe < 0) {
      resta += movimiento.Importe;
    }
  });

  return resta;
}

console.log(totalGastos(movimientos));

function saldoDefinitivo() {

    return saldoActual + totalIngresos(movimientos) + totalGastos(movimientos);
}



console.log("Saldo Definitivo:" + formatearDinero(saldoDefinitivo()));
console.log("Total de Gastos:" + formatearDinero(totalGastos(movimientos)));
console.log("Total de Ingresos:" + formatearDinero(totalIngresos(movimientos)));

const cuerpoTabla = document.getElementById("cuerpoTabla");
const selectCategoria = document.getElementById("filtroCategoria");

function pintarTabla(listaMovimientos) {

  cuerpoTabla.innerHTML = "";

  listaMovimientos.forEach(movimiento => {
    const fila = document.createElement("tr");

    const claseImporte = movimiento.Importe >= 0 ? "ingreso" : "gasto";

    fila.innerHTML = `
      <td>${movimiento.Id}</td>
      <td>${movimiento.Concepto}</td>
      <td class="${claseImporte}">${formatearDinero(movimiento.Importe)} ${simboloMon}</td>
      <td>${movimiento.Categoria}</td>
      <td>${movimiento.Fecha}</td>
    `;

    cuerpoTabla.appendChild(fila);
  });
}

selectCategoria.addEventListener("change", (e) => {
  const categoriaSeleccionada = e.target.value;

  if (categoriaSeleccionada === "todas") {
    pintarTabla(movimientos);
  } else {
    const movimientosFiltrados = movimientos.filter(movimiento => {
      return movimiento.Categoria === categoriaSeleccionada;
    });

    pintarTabla(movimientosFiltrados);
  }
});

pintarTabla(movimientos);