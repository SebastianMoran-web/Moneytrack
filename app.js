const titularCuenta = "Sebastián"
let saldoActual = 92.5215
const simboloMon = "€"

/*Esta función devuelve los numeros de sus parametros,
redondeados a los dos primeros decimales */ 
function formatearDinero(cantidad){

    return Number.parseFloat(cantidad).toFixed(2);

}

console.log(formatearDinero(saldoActual) + simboloMon)

let movimientos = [{

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

/*Crea una variable local de esta  funcion, y con cada movimiento realiza una condicional 
haciendoo que los positivos se sumen con la variable local, y al final devolver el resultado final*/ 
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


/*Crea una variable local de esta funcion, y con cada movimiento realiza una condicional 
haciendoo que los negativos se acumulan en la variable local, y al final devolver el resultado final*/ 

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

/*Devuelve la suma del salso inicial y la suma de ingresos y gastos*/

function saldoDefinitivo() {

    return saldoActual + totalIngresos(movimientos) + totalGastos(movimientos);
}



console.log("Saldo Definitivo:" + formatearDinero(saldoDefinitivo()));
console.log("Total de Gastos:" + formatearDinero(totalGastos(movimientos)));
console.log("Total de Ingresos:" + formatearDinero(totalIngresos(movimientos)));

const cuerpoTabla = document.getElementById("cuerpoTabla");
const selectCategoria = document.getElementById("filtroCategoria");
const filtroCategoria = document.getElementById("filtroCategoria");
const formulario = document.getElementById("formularioMovimiento");
const inputConcepto = document.getElementById("inputConcepto");
const inputImporte = document.getElementById("inputImporte");
const selectCategoriaForm = document.getElementById("selectCategoriaForm");
const spanSaldo = document.getElementById("spanSaldo");
const contenedorMayorGasto = document.getElementById("categoriaMayorGasto");

/*En la tabla de id "cuerpo-tabla", la vaciamos y por cada movimiento se crea una fila en la tabla
se evalua para saber si es gasto o ingreso, y se coloca al final de la tabla */

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
      <td><button class="btn-borrar" data-id="${movimiento.Id}">Borrar</button></td>
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

const totalGastado = movimientos.reduce((acumulador, mov) => {
  if (mov.Importe < 0) {
    return acumulador + mov.Importe;
  }
  return acumulador;
}, 0);

console.log("Total gastado:", totalGastado); 

/* Agrupa y suma los gastos de los moviemientos, recorre todoo el array de movimientos, inicia con el acumulador vacio 
para sumar los gastos, se centra en los negativos, transforma los negativos en positivos para calcularlos mejor
agrupa las categorias repetidas y crea las nuevas dandoles un valor 0, lo suma todo en una variable y lo devuelve al final*/

function gastosPorCategoria(movs) {
  return movs.reduce((acumulador, mov) => {

    if (mov.Importe < 0) {
      const cat = mov.Categoria;
      const gastoPositivo = Math.abs(mov.Importe); 

      if (!acumulador[cat]) {
        acumulador[cat] = 0;
      }

      acumulador[cat] += gastoPositivo;
    }

    return acumulador;
  }, {});
}

const resumenGastos = gastosPorCategoria(movimientos);
console.log(resumenGastos);

/*Transforma el objeto en un arra de arrays,osea separando cada elemento e importe en uno, se hace para recorrerlo mejor,
si no hay gastos se detiene inmediatamente, busca al mayor gasto y extrae el nombre e importe,
y lo coloca en el elemento con id "categoriaMayorGasto y lo inyecta en un parrafo en el HTML*/

function mostrarMayorGasto(gastosAgrupados) {
  const entradas = Object.entries(gastosAgrupados); 

  if (entradas.length === 0) return;

  const [mayorCategoria, mayorImporte] = entradas.reduce((max, actual) => {
    return actual[1] > max[1] ? actual : max;
  });

  const contenedor = document.getElementById("categoriaMayorGasto");
  contenedor.innerHTML = `
    <p><strong>Categoría con mayor gasto:</strong> ${mayorCategoria} (${formatearDinero(mayorImporte)} ${simboloMon})</p>
  `;
}

mostrarMayorGasto(resumenGastos);

/*
Suma los importes de todos los movimientos de la tabla y lo suma con el saldo inicial
Llama a la funcion de calcularGastosPorCategoria para agrupar a los gastos, si la lista no tiene gastos se para y suelta un mensaje,
despues busca a la cateogria con el importe mas alto y lo inyecta en el HTML
 */
function actualizarEstadisticas(lista) {
  const sumaMovimientos = lista.reduce((total, mov) => total + mov.Importe, 0);
  const saldoFinal = saldoActual + sumaMovimientos;
  
  if (spanSaldo) {
    spanSaldo.textContent = `${formatearDinero(saldoFinal)} ${simboloMon}`;
  }

  const gastosAgrupados = gastosPorCategoria(lista);
  const entradas = Object.entries(gastosAgrupados);

  if (!contenedorMayorGasto) return;

  if (entradas.length === 0) {
    contenedorMayorGasto.innerHTML = "<p>No hay gastos registrados.</p>";
    return;
  }

  const [mayorCategoria, mayorImporte] = entradas.reduce((max, actual) => {
    return actual[1] > max[1] ? actual : max;
  });

  contenedorMayorGasto.innerHTML = `
    <p><strong>Categoría con mayor gasto:</strong> ${mayorCategoria} (${formatearDinero(mayorImporte)} ${simboloMon})</p>
  `;
}

/*Obtiene la cateogria seleccionada en el menu, y usa un filtro para que se cree una lista que coincidan con la cetegoria
se usa la funcion pintarTabla() para redibujar la tabla, y llama a otra función para calcular los totales */
function refrescar() {
  const categoriaSeleccionada = filtroCategoria ? filtroCategoria.value : "todas";

  const listaParaMostrar = categoriaSeleccionada === "todas"
    ? movimientos
    : movimientos.filter(m => m.Categoria === categoriaSeleccionada);

  pintarTabla(listaParaMostrar);
  actualizarEstadisticas(movimientos); 
}

/**
 * Elimina un movimiento del array global usando filter().
 * Reasigna el array con todos los elementos excepto el que coincida con el ID recibido.
 
*/
function borrarMovimiento(idABorrar) {
  movimientos = movimientos.filter(mov => mov.Id !== idABorrar);
  refrescar();
}


if (formulario) {
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const conceptoValor = inputConcepto.value.trim();
    const importeValor = parseFloat(inputImporte.value);
    const categoriaValor = selectCategoriaForm.value;

    if (conceptoValor === "" || isNaN(importeValor)) {
      alert("Por favor, introduce un concepto y un importe válidos.");
      return;
    }

    const nuevoMovimiento = {
      Id: Date.now().toString(),
      Concepto: conceptoValor,
      Importe: importeValor,
      Categoria: categoriaValor,
      Fecha: new Date().toLocaleDateString("es-ES")
    };

    movimientos.push(nuevoMovimiento);

    formulario.reset();

    refrescar();
  });
}

if (cuerpoTabla) {
  cuerpoTabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-borrar")) {
      const id = e.target.getAttribute("data-id");
      borrarMovimiento(id);
    }
  });
}

if (filtroCategoria) {
  filtroCategoria.addEventListener("change", refrescar);
}

refrescar();