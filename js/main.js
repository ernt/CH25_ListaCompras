let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");
let idTimeout;
let precio = 0;
let cont = 0;
let table = document.getElementById("tablaListaCompras");
let cuerpoTabla = table.getElementsByTagName("tbody");
let isValid = true;
let contProduct = document.getElementById("contadorProductos");
let productTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");
let totalEnProduct = 0;
let costoTotal = 0;

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  txtNombre.value = txtNombre.value.trim();
});
btnClear.addEventListener("click", function (event) {
  event.preventDefault();
  txtNombre.value = "";
  txtNumber.value = "";
  cuerpoTabla[0].innerHTML = "";
  cont = 0;
  totalEnProduct = 0;
  costoTotal = 0;
  contProduct.innerText = 0;
  productTotal.innerText = "0";
  precioTotal.innerText = "$ 0";
  localStorage.setItem("contProduct", cont);
  localStorage.setItem("totalEnProduct", totalEnProduct);
  localStorage.setItem("costoTotal", costoTotal.toFixed(2));
});
function validarCantidad() {
  if (txtNumber.value.length == 0) {
    return false;
  }
  if (isNaN(txtNumber.value)) {
    return false;
  }
  if (parseFloat(txtNumber.value) <= 0) {
    return false;
  }

  return true;
}

function getPrecio() {
  return Math.floor(Math.random() * 50 * 100) / 100;
}

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  clearTimeout(idTimeout);
  isValid = true;
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  let lista = "Lo siguientes campos deben ser llenados correctamente <ul>";
  if (txtNombre.value.length < 2) {
    txtNombre.style.border = "solid thin red";
    lista += "<li>Se debe escribir un nombre valido</li>";
    /*  alertValidacionesTexto.innerHTML="Se debe escribir un nombre valido"; */
    alertValidaciones.style.display = "block";
    isValid = false;
  } else {
    txtNombre.style.border = "";
  }
  if (!validarCantidad()) {
    txtNumber.style.border = "solid thin red";
    /* alertValidacionesTexto.innerHTML+="Se debe escribir una cantidad valida"; */
    alertValidaciones.style.display = "block";
    lista += "<li>Se debe escribir un numero valido</li>";
    isValid = false;
  } else {
    txtNumber.style.border = "";
  }
  lista += "</ul>";
  alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
  idTimeout = setTimeout(() => {
    alertValidaciones.style.display = "none";
  }, 5000);

  if (isValid) {
    precio = getPrecio();
    cont++;

    let row = `<tr>
             <th>${cont}</th>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
            </tr>`;
    cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
    contProduct.innerText = cont;
    totalEnProduct += parseFloat(txtNumber.value);
    productTotal.innerText = totalEnProduct;
    costoTotal += precio * parseFloat(txtNumber.value);
    precioTotal.innerHTML = `$ ${costoTotal.toFixed(2)}`;
    /* localStorage.setItem("contProduct", cont);
    localStorage.setItem("totalEnProduct", totalEnProduct);
    localStorage.setItem("costoTotal", costoTotal.toFixed(2));
    
    */
    let resumen = `{"contProduct":${cont},
                "totalEnProductos":${totalEnProduct},
                "costoTotal": ${costoTotal.toFixed(2)}    }`;
    localStorage.setItem("resumen", resumen);
    txtNombre.value = "";
    txtNumber.value = "";
    txtNombre.focus();
  }
});

txtNumber.addEventListener("blur", function (event) {
  event.preventDefault();
  txtNumber.value = txtNumber.value.trim();
});
txtNombre.addEventListener("blur", function (event) {
  event.preventDefault();
  txtNombre.value = txtNombre.value.trim();
});

window.addEventListener("load", function (event) {
  if (this.localStorage.getItem("resumen") == null) {
    let resumen = `{"contProduct":${cont},
    "totalEnProductos":${totalEnProduct},
    "costoTotal": ${costoTotal.toFixed(2)}    }`;
  }
localStorage.setItem("resumen",resumen);
let res= JSON.parse(resumen);

  cont = res.cont;
  totalEnProduct = res.totalEnProduct;
  costoTotal = res.costoTotal;

  contProduct.innerText = cont;
  productTotal.innerText = totalEnProduct;
  precioTotal.innerText = `$ ${costoTotal}`;
});
