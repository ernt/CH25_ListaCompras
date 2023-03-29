let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let btnClear =document.getElementById("btnClear");
let alertValidacionesTexto= document.getElementById("alertValidacionesTexto");
let alertValidaciones=document.getElementById("alertValidaciones");


btnAgregar.addEventListener("click",function (event) {
    event.preventDefault();
    txtNombre.value=txtNombre.value.trim();
})
btnClear.addEventListener("click",function (event) {
    event.preventDefault();
    txtNombre.value="";
    txtNumber.value="";
})

btnAgregar.addEventListener("click",function (event) {
    event.preventDefault();
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    let lista = "Lo siguientes campos deben ser llenados correctamente <ul>"
    if (txtNombre.value.length==0) {
        txtNombre.style.border="solid thin red";
        lista +="<li>Se debe escribir un nombre valido</li>"
       /*  alertValidacionesTexto.innerHTML="Se debe escribir un nombre valido"; */
        alertValidaciones.style.display="block";
    }else {
    txtNombre.style.border="";

    }
    if (txtNumber.value.length==0) {
        txtNumber.style.border="solid thin red";
        /* alertValidacionesTexto.innerHTML+="Se debe escribir una cantidad valida"; */
        alertValidaciones.style.display="block";
        lista +="<li>Se debe escribir un numero valido</li>"
    } else {
        txtNumber.style.border="";
    }
    lista+="</ul>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend",lista);
})

txtNumber.addEventListener("blur",function (event) {
    event.preventDefault();
    txtNumber.value=txtNumber.value.trim();
});
txtNombre.addEventListener("blur",function (event) {
    event.preventDefault();
    txtNombre.value=txtNombre.value.trim();
})