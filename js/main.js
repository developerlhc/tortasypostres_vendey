// var horaInicio;
// var lista = [];
// var listaTabal = "";
// var matriz = [];
// var anchos = [];
// var ordenCol = 0;
// var ordenTipo = 0;
// var titulo = "";
// var ntotal = 0;
// var indexSum = 0;
// var registrosPagina = 0;
// var indicePagina = 0;
// var paginasBloque = 0;
// var indiceBloque = 0;
// //UTILITARIOS





// function crearMatriz() {
//   matriz = [];
//   var campos = [];
//   var nRegistros = lista.length;
//   var c = 0;
//   var cabeceras = document.getElementsByClassName("Cabecera");
//   var nCabeceras = cabeceras.length;
//   var cabecera;
//   var valores = [];
//   for (var j = 0; j < nCabeceras; j++) {
//       cabecera = cabeceras[j];
//       valores.push(cabecera.value.toLowerCase());
//   }
//   var exito = true;
//   var fila = [];
//   var cc = 0;
//   for (var i = 2; i < nRegistros; i++) {
//       campos = lista[i].split("|");
//       nCampos = campos.length;
//       exito = true;
//       cc = 0;
//       for (var j = 0; j < nCabeceras; j++) {
//           exito = (valores[j] == "" || campos[j].toLowerCase().indexOf(valores[j]) > -1);
//           if (!exito) break;
//       }
//       if (exito) {
//           c++;
//           fila = [];
//           for (var j = 0; j < nCampos; j++) {
//               if (isNaN(campos[j])) fila.push(campos[j]);
//               else {
//                   if (campos[j].substr(0, 1) == "0") fila.push(campos[j]);
//                   else {
//                       fila.push(campos[j] * 1);
//                   }
//               }
//           }
//           matriz.push(fila);
//       }
//   }
// }







// function paginar(indice) {

//   console.log("paginacion" + paginasBloque);
//   if (indice > -1) {
//       indicePagina = indice;
//   }
//   else {
//       var nRegistros = matriz.length;
//       var registrosBloque = registrosPagina * paginasBloque;
//       var indiceUltimoBloque = Math.floor(nRegistros / registrosBloque);
//       if (nRegistros % registrosBloque == 0) indiceUltimoBloque--;
//       switch (indice) {
//           case -1:
//               indiceBloque = 0;
//               indicePagina = 0;
//               break;
//           case -2:
//               indiceBloque--;
//               indicePagina = indiceBloque * paginasBloque;
//               break;
//           case -3:
//               indiceBloque++;
//               indicePagina = indiceBloque * paginasBloque;
//               break;
//           case -4:
//               indiceBloque = indiceUltimoBloque;
//               indicePagina = indiceBloque * paginasBloque;
//               break;
//       }
//   }
//   mostrarMatriz();
// }






// function validarFecha(fecha) {
//   var selectfecha = document.getElementById(fecha);
//   return (selectfecha == null) ? "" : selectfecha.value;
// }




// function validarCombo(combo) {
//   var cod = document.getElementById(combo);
//   return cod == null ? "0" : cod.value;
// }



// function mostrarMatriz() {

//   var nRegistros = matriz.length;
//   registrosPagina = validarCombo("cbopaginacion");
//   var contenido = "";
//   if (nRegistros > 0) {
//       var nCampos = matriz[0].length;
//       var pos = -1;
//       var inicio = indicePagina * registrosPagina;
//       var fin = inicio + registrosPagina;
//       for (var i = inicio; i < fin; i++) {
//           if (i < nRegistros) {
//               contenido += "<tr  class='FilaDatos'>";
//               for (var j = 0; j < nCampos; j++) {
//                   contenido += "<td>"
//                   contenido += matriz[i][j];
//                   contenido += "</td>";
//               }
//               contenido += "</tr>";
//           }
//           else break;

//       }

//   }
//   var tbData = document.getElementById("tbData");
//   tbData.innerHTML = contenido;
//   var span = document.getElementById("spnRegistros");
//   span.innerHTML = nRegistros;
//   paginasBloque = validarCombo("cbopaginacion");
//   console.log("pagina" + paginasBloque + "-" + registrosPagina);
//   crearPaginacion();

// }






// function crearPaginacion() {
//   var contenido = "";
//   var nRegistros = matriz.length;
//   if (nRegistros > 0) {
//       var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
//       if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
//       if (indiceBloque > 0) {
//           contenido += "<input type='button' value='<<' class='btn-small' style='background:white;color:orange;' onclick='paginar(-1)'/>";
//           contenido += "<input type='button' value='<' class='btn-small' style='background:white;color:orange;' onclick='paginar(-2)'/>";
//       }
//       var inicio = indiceBloque * paginasBloque;
//       var fin = inicio + paginasBloque;
//       for (var i = inicio; i < fin; i++) {
//           if (i <= indiceUltimaPagina) {
//               contenido += "<input type='button' value='";
//               contenido += (i + 1);
//               contenido += "' class='btn-small' style='background:white;color:orange;font-weight:bold;' onclick='paginar(";
//               contenido += i;
//               contenido += ");'/>";
//           }
//           else break;
//       }
//       var registrosBloque = registrosPagina * paginasBloque;
//       var indiceUltimoBloque = Math.floor(nRegistros / registrosBloque);
//       if (nRegistros % registrosBloque == 0) indiceUltimoBloque--;
//       if (indiceBloque < indiceUltimoBloque) {
//           contenido += "<input type='button'  value='>' class='btn-small'  style='background:white;color:orange;' onclick='paginar(-3)'/>";
//           contenido += "<input type='button'  value='>>' class='btn-small'  style='background:white;color:orange;' onclick='paginar(-4)'/>";
//       }
//   }
//   document.getElementById("divpagina").innerHTML = contenido;
// }





// function filtrarTabla() {
//   crearMatriz();
//   mostrarMatriz();
// }





// function crearTabla(div) {
//   var campos = lista[0].split("|");
//   console.log(campos);
//   var anchos = lista[1].split("|");
//   var nCampos = campos.length;
//   var col;
//   var contenido = "<table><thead>";
//   contenido += "<tr class='FilaCabecera'>";
//   var pos = -1;
//   for (var j = 0; j < nCampos; j++) {
//       col = campos[j];
//       contenido += "<th  style='width:";
//       contenido += anchos[j];
//       contenido += "px' >";
//       contenido += "<span class='Enlace' onclick='ordena(";
//       contenido += j;
//       contenido += ")'>";
//       contenido += col;
//       contenido += "</span>";
//       contenido += "<span id='spnOrden";
//       contenido += j;
//       contenido += "' class='Simbolo'>";
//       contenido += "</span><br/>";
//       contenido += "<input type='text' class='Cabecera' onkeyup='filtrarTabla();'/>";
//       contenido += "</th>";
//   }
//   contenido += "</tr></thead><tbody id='tbData'>";
//   contenido += "</tbody>";
//   contenido += "</table>";
//   var div = document.getElementById(div);
//   div.innerHTML = contenido;
// }









// function crearCombo(lista, idCombo, primerItem, nombre) {
//   var nRegistros = lista.length;
//   var contenido = "";
//   var campos = [];
//   contenido += "<select class='browser-default'  id ='" + nombre + "'" + ">";
//   if (primerItem != null && primerItem != "") {
//       contenido += "<option value=''>";
//       contenido += primerItem;
//       contenido += "</option>";
//   }
//   for (var i = 0; i < nRegistros; i++) {
//       campos = lista[i].split("|");
//       console.log(campos);
//       contenido += "<option value='";
//       contenido += campos[0];
//       contenido += "'>";
//       contenido += campos[1];
//       contenido += "</option>";
//   }
//   contenido += "</select>";
//   var div = document.getElementById(idCombo);
//   if (div) {
//     div.innerHTML = contenido;
//   }  

// }






// function mostrarTabla(rpta) {

//   var div = document.getElementById("divhorario");
//   var span = document.getElementById("spnRegistros");
//   var pagina = document.getElementById("divpagina");

//   if (rpta) {
//       var listaRegistro = [];
//       listaRegistro = rpta.split("û");
//       // if (validarCombo("almacen") == "0") {
//       //     almacen = listaRegistro[1];
//       //     var listaalmacen = almacen.split("¬");
//       //     crearCombo(listaalmacen, "cboalmacen", "", "almacen");
//       // }
//       // if (validarCombo("periodo") == "0") {
//       //     periodo = listaRegistro[2];
//       //     var listaperiodo = periodo.split("¬");
//       //     crearCombo(listaperiodo, "cboperiodo", "", "periodo");
//       // }

//       listaTabal = listaRegistro[0];
//       console.log("lista" + listaTabal);
//       if (listaTabal.indexOf("¬") > -1) {
//           lista = listaTabal.split("¬");
//           div.innerHTML = "";
//           crearTabla("divhorario");
//           filtrarTabla("divhorario");
//           muestra_oculta("paginacion", "block");
//       } else {
//           span.innerHTML = "0";
//           div.innerHTML = "";
//           pagina.innerHTML = "";
//           muestra_oculta("paginacion", "none");
//       }
//       muestra_oculta("divhorario", "block");
//       muestra_oculta("loading", "none");
//   } else {
//       span.innerHTML = "0";
//       div.innerHTML = "";
//       pagina.innerHTML = "";
//       muestra_oculta("paginacion", "none");
//       muestra_oculta("divhorario", "block");
//       muestra_oculta("loading", "none");
//   }
// }








// function muestra_oculta(id, visible) {
//   var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
//   el.style.display = visible; //damos un atributo display:none que oculta el div
// }




