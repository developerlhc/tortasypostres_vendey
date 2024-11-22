var url = "https://cenfelecsolutions.com/Kamachixapi/Ejecutaraccion?myproc=";
var imagenes = [];
var titulos = [];
isgantt = 0;
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function myborrar(fotoseleccionada) {

  var fotodelete = fotoseleccionada.parentNode.parentNode;
  var foto = fotodelete.parentNode;
  var index = Array.prototype.indexOf.call(foto.children, fotodelete);
  imagenes.splice(index, 1);
  titulos.splice(index, 1);
  sessionStorage.setItem("imagenes", imagenes);
  sessionStorage.setItem("titulos", titulos);
  //var xx = document.getElementById(foto.id);
  var id = fotodelete.id;
  if (id > 0) {
    var parametros = "";
    parametros = "uti.spimages_justification&parametros=@caccion='ImagenDel',@id=" + id;
    btnretorno = "cdcd";
    post(url + parametros, mensajedeleteI);
  }
  fotodelete.remove();
}
function mensajedeleteI(rpta) {
  app.dialog.alert(rpta);
}
function guardar() {///hhhhhh***jjjj
  debugger;
  var provicionalImagen = imagenes.join("¬");
  var provicionalTexto = titulos.join("¬");
  sessionStorage.setItem("imagenes", provicionalImagen);
  sessionStorage.setItem("titulos", provicionalTexto);
}

function mymenu(rpta) {
  var lista = rpta.split("¬");
  var btnstate = null;
  var btnobj = null;

  for (let index = 0; index < lista.length; index++) {
    btnstate = lista[index].split("|");
    btnobj = document.getElementById(btnstate[0]);
    if (btnobj) {
      if (btnstate[1] == "0") {
        muestra_oculta(btnstate[0], "none");
      }
    }
  }
}

function cargarJustificaciones() {
  var divmycar = document.getElementById("mycardsBasic");
  if (divmycar) {
    var parametros = "";
    parametros += "asi.spjustification&parametros=@caccion='justificationLitsbyuser',@ruc='" + sessionStorage.getItem("ruc") + "'" + ",@userid='" + sessionStorage.getItem("userid") + "'"

    post(url + parametros, mostrarCardsBasic);
  }
}
function myconfirm(namejustification, idjustification) {
  var $$ = Dom7;
  $$('.open-confirm').on('click', function () {
    app.dialog.confirm('Desea eliminar la justificación' + namejustification + ' ?', function () {
      app.dialog.alert('Justificación eliminada');
      var parametros = "";
      parametros = "asi.spjustification&parametros=@caccion='justificationDel',@id=" + idjustification;


      btnretorno = "btnclosejustification";
      post(url + parametros, mensaje);
      cargarJustificaciones();
    });
  });

}
let socket = new WebSocket("wss://connect.websocket.in/v3/1?apiKey=yejwAvfwfIhlJcD4BZwdFnr7CWFYPHbimi2EALMxPtIda7yF6PHDFfr3FeBi");

socket.onopen = function (e) {
  // alert("[open] Connection established");
  // alert("Sending to server");
  socket.send(sessionStorage.getItem("name") + "|" + sessionStorage.getItem("id"));
};

socket.onmessage = function (event) {
  if (sessionStorage.getItem("rolid") == "1") {
    var myarr = event.data.split("|");
    var notificationWithButton = app.notification.create({
      icon: '<i class="icon demo-icon">7</i> , <i class="fas fa-bell-on"></i>',
      title: 'KAMACHIX-' + myarr[2],
      subtitle: "El usuario " + myarr[0] + " acaba de realizar una justificación.",
      text: 'Click (x)',
      closeButton: true,
      closeTimeout: 3000,

    });
    notificationWithButton.open();
  }
};

socket.onclose = function (event) {
  if (event.wasClean) {
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert('[close] Connection died');
  }
};

socket.onerror = function (error) {
  alert(`[error] ${error.message}`);
};


function myedit(idjus, namejus, descripttionjus, date, comboisexit) {
  debugger;
  document.getElementById("btnRegistrarJustificacion").click();
  var eseditar = true;
  sessionStorage.setItem("idJus", idjus);
  sessionStorage.setItem("Nombre", namejus);
  sessionStorage.setItem("descripcion", descripttionjus);
  sessionStorage.setItem("fecha", date);
  sessionStorage.setItem("isexit", comboisexit);


  var nameJus = sessionStorage.getItem("Nombre");
  var descripJus = sessionStorage.getItem("descripcion");
  var comboIsexit = sessionStorage.getItem("isexit");
  var fechacompleta = sessionStorage.getItem("fecha").split(" ").filter(function (e) { return e });

  if (fechacompleta[3] == "") {

  }
  var mes = fechacompleta[0];
  var dia = fechacompleta[1];
  var ano = fechacompleta[2];
  var hora = fechacompleta[3];

  if (dia.length == 1) {
    dia = "0" + fechacompleta[1];
  }
  switch (mes) {
    case 'Ene':
      mes = "01";
      break;
    case 'Feb':
      mes = "02";
      break;
    case 'Mar':
      mes = "03";
      break;
    case 'Abr':
      mes = "04";
      break;
    case 'May':
      mes = "05";
      break;
    case 'Jun':
      mes = "06";
      break;
    case 'Jul':
      mes = "07";
      break;
    case 'Aug':
      mes = "08";
      break;
    case 'Set':
      mes = "09";
      break;
    case 'Oct':
      mes = "10";
      break;
    case 'Nov':
      mes = "11";
      break;
    case 'Dic':
      mes = "10";
      break;
    default:
      mes = new Date().getMonth() + 1;
  }
  var horaformat = hora.slice(0, -2);
  var fecha = ano + "-" + mes + "-" + dia;
  if (horaformat.length == 4) {
    var horaformato = "0" + hora.slice(0, -2);
  } else {
    var horaformato = hora.slice(0, -2);
  }
  document.getElementById("txtjname").value = nameJus;
  document.getElementById("txtjdescription").value = descripJus;
  document.getElementById("txtjdia").value = fecha;
  document.getElementById("txtjhora").value = horaformato;
  document.getElementById("cbojisexit").value = comboIsexit;
  muestra_oculta("progresobarra", "block");
  debugger;
  //document.getElementById("Fotos").value = nombreimg;

  var parametros = "";
  parametros = "uti.spimages_justification&parametros=@caccion='imgjustification',@justificationid=" + idjus;


  btnretorno = "cdcd";
  post(url + parametros, mensajeimg);


};




function mostrarCardsBasic(rpta) {

  var mycardhtml = "";
  var dataarr = rpta.split("¬");


  var divmycar = document.getElementById("mycardsBasic");
  if (dataarr[0]) {
    var datafila = null;
    debugger;

    for (let index = 0; index < dataarr.length; index++) {
      datafila = dataarr[index].split('|');


      mycardhtml += `<div  class="card demo-card-header-pic">`;
      mycardhtml += `<div style="background-image:url(img/justificacion.jpg); color:black;" class="card-header align-items-flex-end">${datafila[1]}</div>`;
      mycardhtml += `<div class="card-content card-content-padding">`;
      mycardhtml += `<p class="date" style="${(datafila[5] == "Aprobado" ? "color:green;" : datafila[5] == "Rechazado" ? "color:red;" : datafila[5] == "Pendiente" ? "color:orange;" : "display:none;")}">Estado : ${datafila[5]}</p>`;
      mycardhtml += `<p >${datafila[2]}</p></div>`;
      mycardhtml += `<div class="card-footer"><button class="col button" id="btneditjus" onclick="myedit(${datafila[0]},'${datafila[1]}','${datafila[2]}','${datafila[3]}','${datafila[4]}');">Editar</button><button class="col button open-confirm" onclick="myconfirm('${datafila[1]}',${datafila[0]});"  >Eliminar</button></div>`;
      mycardhtml += `</div>`;

    }


  }
  divmycar.innerHTML = mycardhtml;
}
function mensajeimg(rpta) {
  debugger;
  var mycardishtml = "";
  var dataarr = rpta.split("¬");


  var divmyimge = document.getElementById("Fotos");
  if (dataarr[0]) {
    var datafila = null;
    debugger;

    for (let index = 0; index < dataarr.length; index++) {
      datafila = dataarr[index].split('|');

      mycardishtml += `<div id="${datafila[0]}" data-id="${datafila[0]}" class="foto">
      <img id="myImg" onclick="imagenXd(this)"; src="data:image/jpeg;base64, ${datafila[2]}">
      <div class="tituloj">${datafila[1]}</div>
      <div class="borrar">
        <img src="img/borrar.png" onclick="myborrar(this);">
    </div>
</div>`;

    }


  }
  divmyimge.innerHTML = mycardishtml;
  muestra_oculta("progresobarra", "none");
  var span = document.getElementById("closemodal");

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    muestra_oculta("myModal", "none");
  }
}
function imagenXd(thiss) {
  var modal = document.getElementById("myModal");

  //var img = document.getElementById("myImg");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  modal.style.display = "block";
  modalImg.src = thiss.src;
  captionText.innerHTML = thiss.alt;
}
function imagenX(thiss) {
  var modal = document.getElementById("myModalj");

  //var img = document.getElementById("myImg");
  var modalImg = document.getElementById("img02");
  var captionText = document.getElementById("captionj");
  modal.style.display = "block";
  modalImg.src = thiss.src;
  captionText.innerHTML = thiss.alt;
}

function listarimg(rpta) {
  debugger;
  var mycardihtml = "";
  var dataarr = rpta.split("¬");


  var divmyimg = document.getElementById("Fotosj");
  if (dataarr[0]) {
    var datafila = null;
    debugger;

    for (let index = 0; index < dataarr.length; index++) {
      datafila = dataarr[index].split('|');

      mycardihtml += `<div id="${datafila[0]}" data-id="${datafila[0]}" class="foto">
      <img id="myImgj" onclick="imagenX(this)"; src="data:image/jpeg;base64, ${datafila[2]}">
      <div class="tituloj">${datafila[1]}</div>
      </div>`;

    }


  }

  divmyimg.innerHTML = mycardihtml;
  muestra_oculta("progressbarra", "none");
  // document.getElementById('myImg').addEventListener('click', imagenXd);

  // Get the <span> element that closes the modal
  var span = document.getElementById("closemodalj");

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    muestra_oculta("myModalj", "none");
  }
}







function CerrarSesion() {
  sessionStorage.removeItem("userid");
  sessionStorage.removeItem("company");
  sessionStorage.removeItem("ruc");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("password");
  sessionStorage.removeItem("position");
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("surnames");
  sessionStorage.removeItem("documenttypeid");
  sessionStorage.removeItem("documentnumber");
  sessionStorage.removeItem("address");
  sessionStorage.removeItem("mobile");
  sessionStorage.removeItem("rolid");
  sessionStorage.removeItem("nameschedule");
  sessionStorage.removeItem("scheduletypeid");
  sessionStorage.removeItem("description");
  sessionStorage.removeItem("observation");
  sessionStorage.removeItem("daystart");
  sessionStorage.removeItem("dayend");
  sessionStorage.removeItem("timestart");
  sessionStorage.removeItem("timeend");

  location.href = "index.html";
}


function requestServer(metodoHttp, url, metodoCallback, tipoRpta, data) {
  // var xhr = new XMLHttpRequest();
  // xhr.open(metodoHttp, xurl);
  // if (tipoRpta != null) xhr.responseType = tipoRpta;
  // xhr.onreadystatechange = function () {
  //   if (xhr.status == 200 && xhr.readyState == 4) {
  //     if (tipoRpta != null) metodoCallback(xhr.response);
  //     else metodoCallback(xhr.responseText);
  //   }
  // }
  // debugger;
  // console.log(xurl,'revisa');
  // if (metodoHttp == "POST") xhr.send();
  // else 
  // xhr.send(data);
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      metodoCallback(xhr.responseText);
      return;
    }
  }

  xhr.open('POST', url, true);
  xhr.send();
}


var visiblecolum;
var btnretorno = "";
var btnaccion = "";




function post(url, metodoCallback, data) {
  console.log(url, 'revisar');
  requestServer("POST", url, metodoCallback, null, data);
}


var horaInicio;
var lista = [];
var listaTabal = "";
var matriz = [];
var anchos = [];
var ordenCol = 0;
var ordenTipo = 0;
var titulo = "";
var ntotal = 0;
var indexSum = 0;
var registrosPagina = 0;
var indicePagina = 0;
var paginasBloque = 0;
var indiceBloque = 0;
var datoscombo1 = "";
//UTILITARIOS

function ordenar(x, y) {
  var valX = x[ordenCol];
  var valY = y[ordenCol];
  if (ordenTipo == 0) return (valX > valY ? 1 : -1);
  else return (valY > valX ? 1 : -1);
}
function borrarSimbolosOrdenacion() {
  var spnSimbolos = document.getElementsByClassName("Simbolo");
  var nSimbolos = spnSimbolos.length;
  for (var j = 0; j < nSimbolos; j++) {
    spnSimbolos[j].innerHTML = "";
  }
}

function ordena(indiceCol) {
  ordenCol = indiceCol;
  var spnOrden = document.getElementById("spnOrden" + indiceCol);
  if (spnOrden != null) {
    var simbolo = "▲";
    ordenTipo = 0;
    if (spnOrden.innerHTML == "▲") {
      simbolo = "▼";
      ordenTipo = 1;
    }
    matriz.sort(ordenar);
    borrarSimbolosOrdenacion();
    spnOrden.innerHTML = simbolo;
    mostrarMatriz();
  }
}

function crearMatriz() {
  matriz = [];
  var campos = [];
  var nRegistros = lista.length;
  var c = 0;
  var cabeceras = document.getElementsByClassName("Cabecera");
  var nCabeceras = cabeceras.length;
  var cabecera;
  var valores = [];

  for (var j = 0; j < nCabeceras; j++) {
    cabecera = cabeceras[j];
    valores.push(cabecera.value.toLowerCase());
  }
  var exito = true;
  var fila = [];
  var cc = 0;
  for (var i = 4; i < nRegistros; i++) {
    campos = lista[i].split("|");
    nCampos = campos.length;
    exito = true;
    cc = 0;
    for (var j = 0; j < nCabeceras; j++) {
      exito = (valores[j] == "" || campos[j].toLowerCase().indexOf(valores[j]) > -1);
      if (!exito) break;
    }
    if (exito) {
      c++;
      fila = [];
      for (var j = 0; j < nCampos; j++) {
        if (isNaN(campos[j])) fila.push(campos[j]);
        else {
          if (campos[j].substr(0, 1) == "0") fila.push(campos[j]);
          else {
            fila.push(campos[j] * 1);
          }
        }
      }
      matriz.push(fila);
    }
  }
}


function paginar(indice) {

  if (indice > -1) {
    indicePagina = indice;
  }
  else {
    var nRegistros = matriz.length;
    var registrosBloque = registrosPagina * paginasBloque;
    var indiceUltimoBloque = Math.floor(nRegistros / registrosBloque);
    if (nRegistros % registrosBloque == 0) indiceUltimoBloque--;
    switch (indice) {
      case -1:
        indiceBloque = 0;
        indicePagina = 0;
        break;
      case -2:
        indiceBloque--;
        indicePagina = indiceBloque * paginasBloque;
        break;
      case -3:
        indiceBloque++;
        indicePagina = indiceBloque * paginasBloque;
        break;
      case -4:
        indiceBloque = indiceUltimoBloque;
        indicePagina = indiceBloque * paginasBloque;
        break;
    }
  }
  mostrarMatriz();
}
var contenidodetalle;
var detalle;
var modal;
var matriztabla = "";
var filaAnterior = null;
function showContextMenu(mimatriz, fila) {
  matriztabla = mimatriz;
  var contextMenu = document.getElementById('contextMenux');

  if (filaAnterior != null) filaAnterior.className = "FilaDatos";
  fila.className = "FilaSeleccionada";
  filaAnterior = fila;



}

function validarFecha(fecha) {
  var selectfecha = document.getElementById(fecha);
  return (selectfecha == null) ? "" : selectfecha.value;
}

function crearComboEvento(lista, idCombo, primerItem, nombre) {
  var nRegistros = lista.length;
  var contenido = "";
  var campos = [];
  contenido += "<select class='browser-default' id ='" + nombre + "'" + ">";
  if (primerItem != null && primerItem != "") {
    contenido += "<option value=''>";
    contenido += primerItem;
    contenido += "</option>";
  }
  for (var i = 0; i < nRegistros; i++) {
    campos = lista[i].split("|");
    contenido += "<option value='";
    contenido += campos[0];
    contenido += "'>";
    contenido += campos[1];
    contenido += "</option>";
  }
  contenido += "</select>";
  var div = document.getElementById(idCombo);
  div.innerHTML = contenido;
}


function validarCombo(combo) {
  var cod = document.getElementById(combo);
  cod = null ? 0 : parseInt(cod.value, 10);
  return cod;

}



function mostrarMatriz() {

  var nRegistros = matriz.length;
  registrosPagina = validarCombo("cbopaginacion");
  var contenido = "";
  if (nRegistros > 0) {
    var nCampos = matriz[0].length;
    var inicio = indicePagina * registrosPagina;
    var fin = inicio + registrosPagina;
    var mifila = "";
    for (var i = inicio; i < fin; i++) {
      if (i < nRegistros) {
        mifila = matriz[i].join('|');
        contenido += `<tr class="FilaDatos"  onclick="showContextMenu('${mifila}',this)"; >`;
        for (var j = 0; j < nCampos; j++) {
          contenido += `<td style='${visiblecolum[j] == "1" ? "padding:2px 4px 2px 4px;text-align:center;" : "display:none;"} '>`
          contenido += matriz[i][j];
          contenido += `</td>`;
        }
      }
      else break;


    }

    if (isgantt > 0) {

      var listGantt = [];

      if (matriz) {
        var nRegistros = matriz.length;
        registrosPagina = validarCombo("cbopaginacion");

        if (nRegistros > 0) {
          var nCampos = matriz[0].length;
          var inicio = indicePagina * registrosPagina;
          var fin = inicio + registrosPagina;
          var mifila = "";
          var fecha = "";
          let percentageCompletion = 0;
          for (var i = inicio; i < fin; i++) {
            if (i < nRegistros) {
              mifila = matriz[i].join('|');

              if (matriz[i][4] < 1) {
                percentageCompletion = 0;
              } else {
                percentageCompletion = matriz[i][4] / 100;
              }
              listGantt.push(
                {
                  // min: Date.UTC(2010, 10, 17),
                  // max: Date.UTC(2022, 10, 30),
                  start: Date.UTC(2020, 8, 1),//año,mes,día
                  end: Date.UTC(2020, 8, 7),
                  completed: percentageCompletion,
                  // fill: (item.percentageCompletion > 0 ? '#29E470' : '#EA698C')
                  name: ((i + 1) + '. ' + matriz[i][2])
                }
              );
            }

          }

        }
      }
      // debugger;
      // Highcharts.setOptions({
      //   exporting: { enabled: false } ,

      //   xAxis: [{
      //     //min: Date.UTC(2010, 10, 17),
      //     //max: Date.UTC(2022, 10, 30)
      // }, {
      //     dateTimeLabelFormats: {
      //         week: 'Sema %w'
      //     }
      // }],
      //   lang: {
      //     loading: 'Aguarde...',
      //     months: ['Enero', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      //     weekdays: ['Domingo', 'Lunes', 'Martes', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      //     shortMonths: ['Jan', 'Feb', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      //     exportButtonTitle: "Exportar",
      //     printButtonTitle: "Imprimir",
      //     rangeSelectorFrom: "De",
      //     rangeSelectorTo: "Até",
      //     rangeSelectorZoom: "Periodo",
      //     downloadPNG: 'Download imagem PNG',
      //     downloadJPEG: 'Download imagem JPEG',
      //     downloadPDF: 'Download documento PDF',
      //     downloadSVG: 'Download imagem SVG'
      //     // resetZoom: "Reset",
      //     // resetZoomTitle: "Reset,
      //     // thousandsSep: ".",
      //     // decimalPoint: ','
      //   }
      // }
      // );
      Highcharts.ganttChart('containergantt', {
        title: {
          text: 'Actividades de empleados'
        },

        series: [{
          name: 'General',
          data: listGantt
        }]
      });




    };

  }





  var tbData = document.getElementById("tbData");
  tbData.innerHTML = contenido;
  var span = document.getElementById("spnRegistros");
  span.innerHTML = nRegistros;
  paginasBloque = validarCombo("cbopaginacion");
  crearPaginacion();

}

function crearPaginacion() {
  var contenido = "";
  var nRegistros = matriz.length;
  if (nRegistros > 0) {
    var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
    if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
    if (indiceBloque > 0) {
      contenido += "<input type='button' value='<<' class='btn-small' style='background:white;color:orange;' onclick='paginar(-1)'/>";
      contenido += "<input type='button' value='<' class='btn-small' style='background:white;color:orange;' onclick='paginar(-2)'/>";
    }
    var inicio = indiceBloque * paginasBloque;
    var fin = inicio + paginasBloque;
    for (var i = inicio; i < fin; i++) {
      if (i <= indiceUltimaPagina) {
        contenido += "<input type='button' value='";
        contenido += (i + 1);
        contenido += "' class='btn-small' style='background:white;color:orange;font-weight:bold;padding:4px 6px 4px 6px;' onclick='paginar(";
        contenido += i;
        contenido += ");'/>";
      }
      else break;
    }
    var registrosBloque = registrosPagina * paginasBloque;
    var indiceUltimoBloque = Math.floor(nRegistros / registrosBloque);
    if (nRegistros % registrosBloque == 0) indiceUltimoBloque--;
    if (indiceBloque < indiceUltimoBloque) {
      contenido += "<input type='button'  value='>' class='btn-small'  style='background:white;color:orange;padding:4px 6px 4px 6px;' onclick='paginar(-3)'/>";
      contenido += "<input type='button'  value='>>' class='btn-small'  style='background:white;color:orange;padding:4px 6px 4px 6px;' onclick='paginar(-4)'/>";
    }
  }
  document.getElementById("divpagina").innerHTML = contenido;
}




function filtrarTabla() {
  crearMatriz();
  mostrarMatriz();
}



function crearTabla(div) {
  var campos = lista[0].split("|");
  var anchos = lista[1].split("|");
  var visible = lista[2].split("|");
  visiblecolum = lista[3].split("|");
  var nCampos = campos.length;
  var col;
  var contenido = "<table><thead>";
  contenido += "<tr class='FilaCabecera'>";
  var filtros = "";
  var pos = -1;
  for (var j = 0; j < nCampos; j++) {
    col = campos[j];
    contenido += `<th   style='${(visiblecolum[j] == "1" ? "text-align:center;padding:0px 4px 0px 4px;text-transform:uppercase;color:black;background-color:#F7AA2E;" : "display : none;")}'`;
    contenido += anchos[j];
    contenido += "px' >";
    contenido += "<span class='Enlace' style='text-align:center;' onclick='ordena(";
    contenido += j;
    contenido += ")'>";
    contenido += col;
    contenido += "</span>";
    contenido += "<span id='spnOrden";
    contenido += j;
    contenido += "' class='Simbolo'>";
    contenido += "</span><br/>";
    //contenido += "<input type='text' class='Cabecera' style='font-family:Arial, FontAwesome; border-color: #DF280C;border-style: solid;border-radius: 25px;padding: 4px;text-align: center' placeholder='&#xF002; Buscador...' onkeyup='filtrarTabla();'/>";

    filtros += `<div style='display: ${(visible[j] == "1" ? "inline-block;" : "none;")} width: 33%;'><label>`;
    filtros += "" + col + "</label><input type='text' class='Cabecera' style='font-family:Arial, FontAwesome;width: 80%;padding: 6px 10px;margin: 8px 0;box-sizing: border-box;border: none;background-color: #F8C471; color: white;' placeholder='&#xF002; Escribir...' onkeyup='filtrarTabla();'/>";
    filtros += "</div>";
    contenido += "</th>";
  }
  contenido += "</tr></thead><tbody id='tbData'>";
  contenido += "</tbody>";
  contenido += "</table>";
  var div = document.getElementById(div);
  div.innerHTML = contenido;
  var div = document.getElementById("divfiltros");
  div.innerHTML = filtros;
}


function crearCombo(lista, iddiv, mylabel, idcombo) {
  var nRegistros = lista.length;
  var contenido = "";
  var campos = [];
  contenido += "<label>" + mylabel + "</label> <select   id ='" + idcombo + "'" + ">";

  for (var i = 0; i < nRegistros; i++) {
    campos = lista[i].split("|");
    contenido += "<option value='";
    contenido += campos[0];
    contenido += "'>";
    contenido += campos[1];
    contenido += "</option>";
  }
  contenido += "</select>";
  var div = document.getElementById(iddiv);
  if (div) {
    div.innerHTML = contenido;
  }

}


function mostrarTabla(rpta) {

  var div = document.getElementById("divtabla");
  var span = document.getElementById("spnRegistros");
  var pagina = document.getElementById("divpagina");

  if (rpta) {
    var listaRegistro = [];
    listaRegistro = rpta.split("û");

    if (listaRegistro[1]) {
      var xdatoscombo1 = listaRegistro[1];
      datoscombo1 = xdatoscombo1.split("¬");
      // var listaalmacen = almacen.split("¬");
    }
    if (listaRegistro[2]) {
      var xdatoscombo2 = listaRegistro[2];
      datoscombo2 = xdatoscombo2.split("¬");
      // var listaalmacen = almacen.split("¬");
    }



    listaTabal = listaRegistro[0];
    if (listaTabal.indexOf("¬") > -1) {
      lista = listaTabal.split("¬");
      div.innerHTML = "";
      crearTabla("divtabla");
      filtrarTabla("divtabla");
      muestra_oculta("paginacion", "block");
    } else {
      span.innerHTML = "0";
      div.innerHTML = "";
      pagina.innerHTML = "";
      muestra_oculta("paginacion", "none");
    }
    muestra_oculta("divtabla", "block");
    muestra_oculta("loading", "none");
  } else {
    span.innerHTML = "0";
    div.innerHTML = "";
    pagina.innerHTML = "";
    muestra_oculta("paginacion", "none");
    muestra_oculta("divtabla", "block");
    muestra_oculta("loading", "none");
  }
}
function muestra_oculta(id, visible) {
  var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
  el.style.display = visible; //damos un atributo display:none que oculta el div
}
function mensajePerfilsave(rpta) {
  app.dialog.alert(rpta);
}


const xhr = new XMLHttpRequest();

// listen for `load` event
xhr.onload = () => {

  // print JSON response
  if (xhr.status >= 200 && xhr.status < 300) {
    // parse JSON
    const response = JSON.parse(xhr.responseText);
  }
};
var messagedeault = "";
function SaveId(rpta) {
  debugger;
  var json = null;
  var lista = rpta.split('|');
  if (lista.length > 0) {
    sessionStorage.setItem("myId", lista[1]);
    sessionStorage.setItem("myMessage", lista[0]);
    if (lista[1] > 0) {
      var parametros = "";
      if (imagenes) {
        for (let index = 0; index < imagenes.length; index++) {
          btnretorno = "btn";
          messagedeault = "n";


          // create a JSON object
          json = {
            "myproc": "uti.spimages_justification",
            "myparametros": "@caccion='ListarImagen',@justificationid='" + lista[1] + "',@name='" + titulos[index] + "',@image64='" + imagenes[index] + "'"
          };

          // open request
          xhr.open('POST', 'https://cenfelecsolutions.com/Kamachixapi/EjecutaraccionFormData');

          // set `Content-Type` header
          xhr.setRequestHeader('Content-Type', 'application/json');

          // send rquest with JSON payload
          xhr.send(JSON.stringify(json));

        }

      }
    }
    document.getElementById("close-sheet").click();
    cargarJustificaciones();
    mensajeDefault(lista[0]);
  }
}



function mensaje(rpta) {
  debugger;
  console.log(rpta);
  var retorno = (rpta.indexOf("no") !== -1);
  if (retorno == false) {
    var link = document.getElementById(btnretorno);
    if (link) {

      link.click();
    } else {
      debugger;
      if (messagedeault.length > 0) {
        rpta = messagedeault
      }
    }
  }
  if (rpta.length > 1) {
    var notificationWithButton = app.notification.create({
      icon: '<i class="icon demo-icon">7</i> , <i class="fas fa-bell-on"></i>',
      title: 'KAMACHIX',
      subtitle: rpta,
      text: 'Click (x)',
      closeButton: true,
      closeTimeout: 3000,

    });
    notificationWithButton.open();
    messagedeault = "";
  }
}
function mensajeDefault(rpta) {
  if (rpta.length > 0) {
    var notificationWithButton = app.notification.create({
      icon: '<i class="icon demo-icon">7</i> , <i class="fas fa-bell-on"></i>',
      title: 'KAMACHIX',
      subtitle: rpta,
      text: 'Click (x)',
      closeButton: true,
      closeTimeout: 3000,

    });
    notificationWithButton.open();
    messagedeault = "";
  }
}

function mensajedeleteh(rpta) {
  app.dialog.alert(rpta);
}


var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'kamachixControl',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/login/',
      url: 'index.html',
    },
    {
      path: '/registroemp/',
      url: 'registroemp.html',
    },
    {
      path: '/recuperar/',
      url: 'recuperar.html',
    },
    {
      path: '/horarios/',
      url: 'horario.html',
      on: {
        pageAfterIn: function (event, page) {
          isgantt = 0;
          if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4 && event.cancelable) { event.preventDefault(); }
          var acc = document.getElementsByClassName("accordion");
          var i;

          for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
              this.classList.toggle("active");
              var panel = this.nextElementSibling;
              if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
              } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
              }
            });
          }

          document.getElementById("btndelete").addEventListener("click", function () {
            if (matriztabla.length == 0) {
              var notificationWithButton = app.notification.create({
                icon: '<i class="icon demo-icon">7</i> , <i class="fas fa-bell-on"></i>',
                title: 'KAMACHIX',
                subtitle: "Por favor seleccionar una fila.",
                text: 'Click (x)',
                closeButton: true,
                closeTimeout: 3000,

              });
              notificationWithButton.open();
            }
            var $$ = Dom7;
            localStorage.setItem('itemsTabla', matriztabla);
            var datos = localStorage.getItem('itemsTabla').split('|');
            var parametros = "";
            var txtruc = datos[1];
            var idschedule = datos[0];
            $$('.open-confirm').on('click', function () {
              app.dialog.confirm('Desea eliminar el horario ' + idschedule + ' ?', function () {
                app.dialog.alert('Horario Eliminado');

                parametros = "asi.spschedule&parametros=@caccion='DELETE',@id=" + datos[0] + "," + "@ruc=" + "'" + txtruc + "'";

                btnretorno = "btnhorario";
                btnaccion = "btndelete";
                post(url + parametros, mensaje);
                document.getElementById('btnBuscar').click();
              });
            });
          });

          if (localStorage.getItem('itemsTabla')) {
            localStorage.removeItem("itemsTabla");
          }



          document.getElementById("btnBuscar").addEventListener("click", function () {
            muestra_oculta("loading", "block");
            var parametros = "";
            parametros += "asi.spschedule&parametros=@caccion='horario',@ruc='" + sessionStorage.getItem("ruc") + "'"

            post(url + parametros, mostrarTabla);

            localStorage.removeItem('itemsTabla');
            matriztabla = "";

          });

          document.getElementById("btnCancelar").addEventListener("click", function () {
            muestra_oculta("divListadoHorarios", "block");
            muestra_oculta("divDetalleHorarios", "none");
            document.getElementById("btnBuscar").click();

          });
          document.getElementById("btnBuscar").click();

          //mantenedor

          document.getElementById("btnedit").addEventListener("click", function () {


            if (matriztabla.length == 0) {
              var notificationWithButton = app.notification.create({
                icon: '<i class="icon demo-icon">7</i> , <i class="fas fa-bell-on"></i>',
                title: 'KAMACHIX',
                subtitle: "Por favor seleccionar una fila.",
                text: 'Click (x)',
                closeButton: true,
                closeTimeout: 3000,

              });
              notificationWithButton.open();
            }
            localStorage.setItem('itemsTabla', matriztabla);

            var ideditar = "";

            if (localStorage.getItem('itemsTabla')) {
              var datos = localStorage.getItem('itemsTabla').split('|');
              document.getElementById("txthname").value = datos[2];
              document.getElementById("cbohtipo").value = datos[3];
              document.getElementById("txthdescription").value = datos[4];
              document.getElementById("txthobservation").value = datos[5];
              document.getElementById("cbohdaystart").value = datos[6];
              document.getElementById("cbohdayend").value = datos[8];
              ideditar += "@id=" + datos[0] + ",";
              var hinicio = datos[10].split(':');
              var hfin = datos[11].split(':');
              document.getElementById("txthtimestart").value = hinicio[0] + ":" + hinicio[1];
              document.getElementById("txthtimeend").value = hfin[0] + ":" + hfin[1];

              muestra_oculta("divListadoHorarios", "none");
              muestra_oculta("divDetalleHorarios", "block");

            }
            document.getElementById("txthruc").value = sessionStorage.getItem("ruc");
            document.getElementById('btnNhorario').addEventListener("click", function () {
              var parametros = "";
              var url = "https://cenfelecsolutions.com/Kamachixapi/Ejecutaraccion?myproc=asi.spschedule&parametros=@caccion='INSERT',";
              if (ideditar.length > 0) {
                url = "https://cenfelecsolutions.com/Kamachixapi/Ejecutaraccion?myproc=asi.spschedule&parametros=@caccion='UPDATE',";
                parametros += ideditar;
              }
              var combotipo = document.getElementById("cbohtipo");
              var selectedTipo = combotipo.options[combotipo.selectedIndex].text.substring(0, 3);
              var combodaystart = document.getElementById("cbohdaystart");
              var selecteddaystart = combodaystart.options[combodaystart.selectedIndex].text.substring(0, 3);
              var combodayend = document.getElementById("cbohdayend");
              var selecteddayend = combodayend.options[combodayend.selectedIndex].text.substring(0, 3);
              var txtnombredefault = selectedTipo + "-" + selecteddaystart + "-" + selecteddayend;
              document.getElementById("txthname").value = `${txtnombredefault}`;
              var hruc = document.getElementById("txthruc").value;
              var hname = txtnombredefault;
              var cbohtipo = document.getElementById("cbohtipo").value;
              var hdescription = document.getElementById("txthdescription").value;
              var hobservation = document.getElementById("txthobservation").value;
              var cbohdaystart = document.getElementById("cbohdaystart").value;
              var cbohdayend = document.getElementById("cbohdayend").value;
              var htimestart = document.getElementById("txthtimestart").value;
              var htimeend = document.getElementById("txthtimeend").value;
              if (hruc == "" || hdescription == "" || hobservation == "" || htimestart == "" || htimeend == "") {
                alert('Se requiere completar campos.');
              } else {

                parametros += "@ruc='" + hruc + "',@name='" + hname + "',@scheduletypeid=" + cbohtipo + ",@description='" + hdescription + "',@observation='" + hobservation + "',@daystart=" + cbohdaystart + ",@dayend=" + cbohdayend + ",@timestart='" + htimestart + "',@timeend='" + htimeend + "'"

                url += parametros;
                btnretorno = "xsbtnhorario";
                post(url, mensaje);

                muestra_oculta("divListadoHorarios", "block");
                muestra_oculta("divDetalleHorarios", "none");
                document.getElementById("btnBuscar").click();
              }

            })
          });

          document.getElementById("btnnew").addEventListener("click", function () {
            muestra_oculta("divListadoHorarios", "none");
            muestra_oculta("divDetalleHorarios", "block");

            document.getElementById("txthruc").value = sessionStorage.getItem("ruc");
            document.getElementById('btnNhorario').addEventListener("click", function () {
              var parametros = "";
              var url = "https://cenfelecsolutions.com/Kamachixapi/Ejecutaraccion?myproc=asi.spschedule&parametros=@caccion='INSERT',";

              var combotipo = document.getElementById("cbohtipo");
              var selectedTipo = combotipo.options[combotipo.selectedIndex].text.substring(0, 3);
              var combodaystart = document.getElementById("cbohdaystart");
              var selecteddaystart = combodaystart.options[combodaystart.selectedIndex].text.substring(0, 3);
              var combodayend = document.getElementById("cbohdayend");
              var selecteddayend = combodayend.options[combodayend.selectedIndex].text.substring(0, 3);
              var txtnombredefault = selectedTipo + "-" + selecteddaystart + "-" + selecteddayend;
              document.getElementById("txthname").value = `${txtnombredefault}`;
              var hruc = document.getElementById("txthruc").value;
              var hname = txtnombredefault;
              var cbohtipo = document.getElementById("cbohtipo").value;
              var hdescription = document.getElementById("txthdescription").value;
              var hobservation = document.getElementById("txthobservation").value;
              var cbohdaystart = document.getElementById("cbohdaystart").value;
              var cbohdayend = document.getElementById("cbohdayend").value;
              var htimestart = document.getElementById("txthtimestart").value;
              var htimeend = document.getElementById("txthtimeend").value;
              if (hruc == "" || hdescription == "" || hobservation == "" || htimestart == "" || htimeend == "") {
                alert('Se requiere completar campos.');
              } else {

                parametros += "@ruc='" + hruc + "',@name='" + hname + "',@scheduletypeid=" + cbohtipo + ",@description='" + hdescription + "',@observation='" + hobservation + "',@daystart=" + cbohdaystart + ",@dayend=" + cbohdayend + ",@timestart='" + htimestart + "',@timeend='" + htimeend + "'"

                url += parametros;
                btnretorno = "xsbtnhorario";
                post(url, mensaje);

                muestra_oculta("divListadoHorarios", "block");
                muestra_oculta("divDetalleHorarios", "none");
                document.getElementById("txthname").value = "";
                document.getElementById("cbohtipo").value = "";
                document.getElementById("txthdescription").value = "";
                document.getElementById("txthobservation").value = "";
                document.getElementById("cbohdaystart").value = "";
                document.getElementById("cbohdayend").value = "";
                document.getElementById("txthtimestart").value = "";
                document.getElementById("txthtimeend").value = "";
                document.getElementById("btnBuscar").click();
              }

            })
          });



        }

      }
    },
    {
      path: '/horarioPersonal/',
      url: 'horarioPersonal.html',
      on: {
        pageAfterIn: function (event, page) {
          document.getElementById("txthpname").value = sessionStorage.getItem("nameschedule");
          document.getElementById("cbohptipo").value = sessionStorage.getItem("scheduletypeid");
          document.getElementById("txthpdescription").value = sessionStorage.getItem("description");
          document.getElementById("txthpobservation").value = sessionStorage.getItem("observation");
          document.getElementById("cbohpdaystart").value = sessionStorage.getItem("daystart");
          document.getElementById("cbohpdayend").value = sessionStorage.getItem("dayend");
          document.getElementById("txthptimestart").value = sessionStorage.getItem("timestart");
          document.getElementById("txthptimeend").value = sessionStorage.getItem("timeend");

        }
      }
    },

    {
      path: '/graficos/',
      url: 'graficos.html',
      on: {

        pageAfterIn: function (event, page) {
          // THE CHART

          Highcharts.ganttChart('containergantt', {
            title: {
              text: 'Grouping in a hierarchy'
            },

            series: [{
              name: 'Project 1',
              data: [
                {
                  name: 'Start prototype',
                  start: Date.UTC(2014, 10, 18),
                  end: Date.UTC(2014, 10, 20)
                }, {
                  // parent task
                  name: 'Product Launch',
                  id: 'launch',
                  // hide the subtasks
                  // collapsed: true

                  // use a smaller pointwidth for the parent task 
                  pointWidth: 3
                }, {
                  // parent: 'launch',
                  id: 'b',
                  name: 'Develop',
                  start: Date.UTC(2014, 10, 20),
                  end: Date.UTC(2014, 10, 25),
                }, {
                  // parent: 'launch',
                  id: 'a',
                  name: 'Run acceptance tests',
                  start: Date.UTC(2014, 10, 23),
                  end: Date.UTC(2014, 10, 26)
                }, {
                  // parent: 'launch',
                  name: 'Test prototype',
                  start: Date.UTC(2014, 10, 27),
                  end: Date.UTC(2014, 10, 29),
                }
              ]
            }]
          });

        }
      }
    },
    {
      path: '/actividades/',
      url: 'actividades.html',
      on: {
        pageAfterIn: function (event, page) {
          isgantt = 1;
          if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4 && event.cancelable) { event.preventDefault(); }
          var acc = document.getElementsByClassName("accordion");
          var i;
          var dynamicPopup = app.popup.create({
            content: '<div class="popup">' +
              '<div class="block">' +
              '<p>Popup created dynamically.</p>' +
              '<p><a href="#" class="link popup-close">Close me</a></p>' +
              '</div>' +
              '</div>',
            // Events
            on: {
              open: function (popup) {
                console.log('Popup open');
              },
              opened: function (popup) {
                console.log('Popup opened');
              },
            }
          });
          for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
              this.classList.toggle("active");
              var panel = this.nextElementSibling;
              if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
              } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
              }
            });
          }
          if (localStorage.getItem('itemsTabla')) {
            localStorage.removeItem("itemsTabla");
            matriztabla = "";
          }



          document.getElementById("btnBuscaractividad").addEventListener("click", function () {
            muestra_oculta("loading", "block");
            var parametros = "";
            parametros += "asi.sptasklist&parametros=@caccion='Activity',@ruc='" + sessionStorage.getItem("ruc") + "'";
            post(url + parametros, mostrarTabla);
            if (localStorage.getItem('itemsTabla')) {
              localStorage.removeItem('itemsTabla');
              matriztabla = "";
            }

          });
          document.getElementById("btnBuscaractividad").click();
          document.getElementById("btnCancelarAc").addEventListener("click", function () {
            muestra_oculta("divListadoActividades", "block");
            muestra_oculta("divDetalleActividad", "none");
            document.getElementById("btnBuscaractividad").click();

          });

          document.getElementById("btnnewactividad").addEventListener("click", function () {
            localStorage.setItem('itemsTabla', "");
            document.getElementById("txtnameactividad").value = "";
            document.getElementById("txtdescriptionactividad").value = "";
            document.getElementById("pgsactividad").value = "";
            document.getElementById("txtinit").value = "";
            document.getElementById("txtend").value = "";
            muestra_oculta("divListadoActividades", "none");
            muestra_oculta("divDetalleActividad", "block");


          });


          document.getElementById("btneditactividad").addEventListener("click", function () {
            if (localStorage.getItem('itemsTabla')) {
              localStorage.removeItem('itemsTabla');
            }
            if (matriztabla.length == 0) {
              var notificationWithButton = app.notification.create({
                icon: '<i class="icon demo-icon">7</i> , <i class="fas fa-bell-on"></i>',
                title: 'KAMACHIX',
                subtitle: "Por favor seleccionar una fila.",
                text: 'Click (x)',
                closeButton: true,
                closeTimeout: 3000,

              });
              notificationWithButton.open();
            }
            localStorage.setItem('itemsTabla', matriztabla);

            var idedit = "";

            if (localStorage.getItem('itemsTabla')) {
              debugger;
              var datosAc = localStorage.getItem('itemsTabla').split('|');
              console.log(datosAc);
              document.getElementById("txtnameactividad").value = datosAc[2];
              document.getElementById("txtdescriptionactividad").value = datosAc[3];
              document.getElementById("pgsactividad").value = datosAc[4];
              var fecha = datosAc[5].slice(0, -2);
              var mes = fecha.substring(0, 3);
              var fecha1 = datosAc[6].slice(0, -2);
              var mes1 = fecha1.substring(0, 3);

              console.log(fecha);
              console.log(fecha1);
              var datetime = "";
              switch (mes) {
                case 'Ene':
                  mes = "01";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Feb':
                  mes = "02";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Mar':
                  mes = "03";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Abr':
                  mes = "04";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'May':
                  mes = "05";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Jun':
                  mes = "06";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Jul':
                  mes = "07";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Aug':
                  mes = "08";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Set':
                  mes = "09";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Oct':
                  mes = "10";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Nov':
                  mes = "11";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Dic':
                  mes = "12";
                  var newdate = fecha.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                default:
                  mes = new Date().getMonth() + 1;
              }
              var datetime1 = "";
              switch (mes1) {
                case 'Ene':
                  mes1 = "01";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Feb':
                  mes1 = "02";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Mar':
                  mes1 = "03";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Abr':
                  mes1 = "04";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'May':
                  mes1 = "05";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Jun':
                  mes1 = "06";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;;
                case 'Jul':
                  mes1 = "07";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Aug':
                  mes1 = "08";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Set':
                  mes1 = "09";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Oct':
                  mes1 = "10";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Nov':
                  mes1 = "11";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                case 'Dic':
                  mes1 = "12";
                  var newdate = fecha1.split(" ");
                  var fechadia = newdate[1];
                  var fechayear = newdate[2];
                  if (newdate[3] == "") {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T0" + newdate[4];
                  } else {
                    datetime1 = fechayear + "-" + mes + "-" + fechadia + "T" + newdate[3];
                  }
                  break;
                default:
                  mes1 = new Date().getMonth() + 1;
              }

              console.log(datetime);
              console.log(datetime1);
              document.getElementById("txtinit").value = datetime;
              document.getElementById("txtend").value = datetime1;
              idedit += "@id=" + datosAc[0] + ",";
              console.log(datosAc);


              muestra_oculta("divListadoActividades", "none");
              muestra_oculta("divDetalleActividad", "block");

            }
          });


          document.getElementById("btnNActividadConfirm").addEventListener("click", function () {

            var parametros = "";
            var xruc = sessionStorage.getItem("ruc");
            var nombre = document.getElementById("txtnameactividad").value;
            var descripcion = document.getElementById("txtdescriptionactividad").value;
            var progreso = document.getElementById("pgsactividad").value;
            var txtinit = document.getElementById("txtinit").value;
            var txtend = document.getElementById("txtend").value;
            var str = txtinit;
            var res = str.replace("T", " ");
            var str1 = txtend;
            var res1 = str1.replace("T", " ");
            debugger;
            if (nombre == "" || descripcion == "" || progreso == "" || txtinit == "" || txtend == "") {
              alert('Se requiere completar campos.');
            } else {

              var parametros = "";
              if (localStorage.getItem("itemsTabla").length > 0) {
                var datostabla = localStorage.getItem('itemsTabla').split('|');

                var ideditacti = datostabla[0];
                parametros += "asi.sptasklist&parametros=@caccion='taskUpdate',@id='" + ideditacti + "',@ruc='" + xruc + "',@name='" + nombre + "',@description='" + descripcion + "',@progres=" + progreso + ",@startdate='" + res + "',@enddate='" + res1 + "'"
              }
              else {
                parametros += "asi.sptasklist&parametros=@caccion='taskInsert'" + ",@ruc='" + xruc + "',@name='" + nombre + "',@description='" + descripcion + "',@progres=" + progreso + ",@startdate='" + res + "',@enddate='" + res1 + "'"
              }
              debugger;
              console.log(parametros);
              btnretorno = "noexiste";
              post(url + parametros, mensaje);

              muestra_oculta("divListadoActividades", "block");
              muestra_oculta("divDetalleActividad", "none");
              document.getElementById("btnBuscaractividad").click();
            }


          });





        }
      }
    },
    {
      path: '/home/',
      url: 'inicioapp.html',
      on: {
        pageAfterIn: function (event, page) {
        }
      }
    },
    {
      path: '/actividadesPorUsuario/',
      url: 'actividadesporusuario.html',
      on: {
        pageAfterIn: function (event, page) {
          isgantt = 0;
          if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4 && event.cancelable) { event.preventDefault(); }
          var acc = document.getElementsByClassName("accordion");
          var i;

          for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
              this.classList.toggle("active");
              var panel = this.nextElementSibling;
              if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
              } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
              }
            });
          }



          if (localStorage.getItem('itemsTabla')) {
            localStorage.removeItem('itemsTabla');
            matriztabla = "";
          }


          document.getElementById("btnBuscarTask").addEventListener("click", function () {
            muestra_oculta("loading", "block");
            var parametros = "";
            parametros += "asi.sptasklist&parametros=@caccion='assingtask',@ruc='" + sessionStorage.getItem("ruc") + "'";

            post(url + parametros, mostrarTabla);
            if (localStorage.getItem('itemsTabla')) {
              localStorage.removeItem('itemsTabla');
              matriztabla = "";
            }
          });

          document.getElementById("btnBuscarTask").click();
          document.getElementById("btnCancelarAssing").addEventListener("click", function () {
            muestra_oculta("divListadoTaskByUser", "block");
            muestra_oculta("divDetalleTask", "none");
            document.getElementById("btnBuscarTask").click();

          });
          

          document.getElementById("btnnewAssing").addEventListener("click", function () {
            localStorage.setItem('itemsTabla', "");
            document.getElementById("txtdescripxx").value = "";
            document.getElementById("txtobsxx").value = "";
            document.getElementById("txtinicio").value = "";
            document.getElementById("txtfinal").value = "";
            document.getElementById("pgsactividadd").value = "";
            muestra_oculta("divListadoTaskByUser", "none");
            muestra_oculta("divDetalleTask", "block");
            if (datoscombo1) {
              crearCombo(datoscombo2, "divcboNameUser", "Usuario :", "cbonameuser");
            }
            if (datoscombo2) {
              crearCombo(datoscombo1, "divcboTaskList", "Actividad :", "cboassing");
            }
          });


          document.getElementById("btneditTask").addEventListener("click", function () {
            if (datoscombo1) {
              crearCombo(datoscombo2, "divcboNameUser", "Usuario :", "cbonameuser");
            }
            if (datoscombo2) {
              crearCombo(datoscombo1, "divcboTaskList", "Actividad :", "cboassing");
            }
            if (localStorage.getItem('itemsTabla')) {
              localStorage.removeItem('itemsTabla');
            }
            if (matriztabla.length == 0) {
              var notificationWithButton = app.notification.create({
                icon: '<i class="icon demo-icon">7</i> , <i class="fas fa-bell-on"></i>',
                title: 'KAMACHIX',
                subtitle: "Por favor seleccionar una fila.",
                text: 'Click (x)',
                closeButton: true,
                closeTimeout: 3000,

              });
              notificationWithButton.open();
            }
            localStorage.setItem('itemsTabla', matriztabla);

            var ideditAssing = "";

            if (localStorage.getItem('itemsTabla')) {
              debugger;
              var datosAssing = localStorage.getItem('itemsTabla').split('|');
              console.log(datosAssing);
              document.getElementById("cbonameuser").value = datosAssing[1];
              document.getElementById("cboassing").value = datosAssing[3];
              document.getElementById("txtdescripxx").value = datosAssing[5];
              document.getElementById("txtobsxx").value = datosAssing[6];
               
              console.log(datosAssing[7]);
              ideditAssing += "@id=" + datosAssing[0] + ",";
              console.log(datosAssing);
              var fechaxx = datosAssing[7].slice(0, -2);
              var mesxx = fechaxx.substring(0, 3);
              var fecha1xx = datosAssing[8].slice(0, -2);
              var mes1xx = fecha1xx.substring(0, 3);
              var datetimes = "";
              switch (mesxx) {
                case 'Ene':
                  mesxx = "01";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                case 'Feb':
                  mesxx = "02";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                case 'Mar':
                  mesxx = "03";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                case 'Abr':
                  mesxx = "04";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                case 'May':
                  mesxx = "05";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                case 'Jun':
                  mesxx = "06";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                case 'Jul':
                  mesxx = "07";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                case 'Aug':
                  mesxx = "08";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                case 'Set':
                  mesxx = "09";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                case 'Oct':
                  mesxx = "10";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                case 'Nov':
                  mesxx = "11";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                case 'Dic':
                  mesxx = "12";
                  var newdat = fechaxx.split(" ");
                  var fechadias = newdat[1];
                  var fechayears = newdat[2];
                  if (newdat[3] == "") {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T0" + newdat[4];
                  } else {
                    datetimes = fechayears + "-" + mesxx + "-" + fechadias + "T" + newdat[3];
                  }
                  break;
                default:
                  mesxx = new Date().getMonth() + 1;
              }
              var datetimes1 = "";
              switch (mes1xx) {
                case 'Ene':
                  mes1xx = "01";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                case 'Feb':
                  mes1xx = "02";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                case 'Mar':
                  mes1xx = "03";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                case 'Abr':
                  mes1xx = "04";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                case 'May':
                  mes1xx = "05";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                case 'Jun':
                  mes1xx = "06";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                case 'Jul':
                  mes1xx = "07";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                case 'Aug':
                  mes1xx = "08";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                case 'Set':
                  mes1xx = "09";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                case 'Oct':
                  mes1xx = "10";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                case 'Nov':
                  mes1xx = "11";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                case 'Dic':
                  mes1xx = "12";
                  var newdat = fecha1xx.split(" ");
                  var fechadiass = newdat[1];
                  var fechayearss = newdat[2];
                  if (newdat[3] == "") {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T0" + newdat[4];
                  } else {
                    datetimes1 = fechayearss + "-" + mes1xx + "-" + fechadiass + "T" + newdat[3];
                  }
                  break;
                default:
                  mes1xx = new Date().getMonth() + 1;
              }
              console.log(datetimes);
              console.log(datetimes1);

              document.getElementById("txtinicio").value = datetimes;
              document.getElementById("txtfinal").value = datetimes1;
              document.getElementById("pgsactividadd").value = datosAssing[9];
              muestra_oculta("divListadoTaskByUser", "none");
              muestra_oculta("divDetalleTask", "block");

            }
          });

          document.getElementById("btnNAssing").addEventListener("click", function () {
            debugger;
            var parametros = "";
            var usuario = document.getElementById("cbonameuser").value;
            var actividad = document.getElementById("cboassing").value;
            var decripcionxx = document.getElementById("txtdescripxx").value;
            var obsxxx = document.getElementById("txtobsxx").value;
            var startxx = document.getElementById("txtinicio").value;
            var endxx = document.getElementById("txtfinal").value;
            var pgrs = document.getElementById("pgsactividadd").value;
            var strx = startxx;
            var resxx = strx.replace("T", " ");
            var str1xx = endxx;
            var res1xx = str1xx.replace("T", " ");
            debugger;
            if (usuario == "" || actividad == "" ) {
              alert('Se requiere completar campos.');
            } else {

              var parametros = "";
              if (localStorage.getItem("itemsTabla").length > 0) {
                var datosTask = localStorage.getItem('itemsTabla').split('|');

                var ideditAssing = datosTask[0];
                parametros += "asi.sptasklistbyuser&parametros=@caccion='taskbyUpdate',@id='"+ideditAssing+"',@tasklistid='" + actividad+"',@userid='"+usuario+"',@description='"+decripcionxx+"',@observation='"+obsxxx+"',@startdate='"+resxx+"',@enddate='"+res1xx+"',@progres='"+pgrs+"'"
              }
              else {
                parametros += "asi.sptasklistbyuser&parametros=@caccion='taskbyInsert'" + ",@tasklistid='" + actividad+"',@userid='"+usuario+"',@description='"+decripcionxx+"',@observation='"+obsxxx+"',@startdate='"+resxx+"',@enddate='"+res1xx+"',@progres='"+pgrs+"'"
              }
              debugger;
              console.log(parametros);
              btnretorno = "noexiste";
              post(url + parametros, mensaje);

              muestra_oculta("divListadoTaskByUser", "block");
              muestra_oculta("divDetalleTask", "none");
              document.getElementById("btnBuscarTask").click();
            }


          });
          



        }
      }
    },
    {
      path: '/perfil/',
      url: 'perfil.html',
      on: {
        pageAfterIn: function (event, page) {
          document.getElementById("txtpcompany").value = sessionStorage.getItem("company");
          document.getElementById("txtpruc").value = sessionStorage.getItem("ruc");
          document.getElementById("txtpuser").value = sessionStorage.getItem("username");
          document.getElementById("txtppass").value = sessionStorage.getItem("password");
          document.getElementById("txtppassconfirm").value = sessionStorage.getItem("password");
          document.getElementById("cbopposition").value = sessionStorage.getItem("position");
          document.getElementById("txtpname").value = sessionStorage.getItem("name");
          document.getElementById("txtpsurname").value = sessionStorage.getItem("surnames");
          document.getElementById("cbopdoc").value = sessionStorage.getItem("documenttypeid");
          document.getElementById("txtpdocnum").value = sessionStorage.getItem("documentnumber");
          document.getElementById("txtpaddress").value = sessionStorage.getItem("address");
          document.getElementById("txtpmovil").value = sessionStorage.getItem("mobile");
          document.getElementById("txtpserver").value = sessionStorage.getItem("myserver");
          document.getElementById("btnprueba").addEventListener("click", function () {
            var txtpname0 = document.getElementById("txtppass").value;
            var txtpname1 = document.getElementById("txtppassconfirm").value;

            if (txtpname0 != txtpname1) {
              document.getElementById("txtppassconfirm").focus();
              alert('ingresa bien tu contraseña');
            } else {

              var txtpcompany = document.getElementById("txtpcompany").value;
              var txtpruc = document.getElementById("txtpruc").value;
              var txtuser = document.getElementById("txtpuser").value;
              var txtppass = document.getElementById("txtppass").value;
              var cbopposition = document.getElementById("cbopposition").value;
              var txtpname = document.getElementById("txtpname").value;
              var txtpsurname = document.getElementById("txtpsurname").value;
              var cbopdoc = document.getElementById("cbopdoc").value;
              var txtpdocnum = document.getElementById("txtpdocnum").value;
              var txtpaddress = document.getElementById("txtpaddress").value;
              var txtpmovil = document.getElementById("txtpmovil").value;
              var txtpserver = document.getElementById("txtpserver").value;


              if (txtpcompany == "" || txtpruc == "" || txtuser == "" || txtppass == "" || cbopposition == "" || txtpname == ""
                || txtpsurname == "" || cbopdoc == "" || txtpdocnum == "" || txtpaddress == "" || txtpmovil == "" || txtpserver == "") {
                alert('Se requiere completar todos los campos.');
              } else {

                var parametros = "";
                parametros += "adm.spuser&parametros=@caccion='UPDATE',@id='" + sessionStorage.getItem("userid") + "',@rolid=" + sessionStorage.getItem("rolid") + ",@ruc='" + txtpruc + "',@username='" + txtuser + "',@password='" + txtppass + "',@position='" + cbopposition + "',@name='" + txtpname + "',@surnames='" + txtpsurname + "',@documenttypeid=" + cbopdoc + ",@documentnumber='" + txtpdocnum + "',@address='" + txtpaddress + "',@mobile='" + txtpmovil + "',@myserver='" + txtpserver + "'"

                btnretorno = "notbtnback";
                post(url + parametros, mensaje)
                sessionStorage.setItem("myserver", txtpserver);
                sessionStorage.setItem("mobile", txtpmovil);
                sessionStorage.setItem("address", txtpaddress);
                sessionStorage.setItem("documentnumber", txtpdocnum);
                sessionStorage.setItem("documenttypeid", cbopdoc);
                sessionStorage.setItem("surnames", txtpsurname);
                sessionStorage.setItem("name", txtpname);
                sessionStorage.setItem("position", cbopposition);
                sessionStorage.setItem("password", txtppass);
              }


            }
          });



        }
      }

    },
    {
      path: '/justificaciones/',
      url: 'justificaciones.html',
      on: {
        pageAfterIn: function (event, page) {
          isgantt = 0;
          if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4 && event.cancelable) { event.preventDefault(); }
          var acc = document.getElementsByClassName("accordion");
          var i;

          for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
              this.classList.toggle("active");
              var panel = this.nextElementSibling;
              if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
              } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
              }
            });
          }
          if (localStorage.getItem('itemsTabla')) {
            localStorage.removeItem("itemsTabla");
            matriztabla = "";
          }
          document.getElementById("btnBuscar").addEventListener("click", function () {
            muestra_oculta("loading", "block");
            var parametros = "";
            parametros += "asi.spjustification&parametros=@caccion='justificacion',@ruc='" + sessionStorage.getItem("ruc") + "'"
            post(url + parametros, mostrarTabla);
            if (localStorage.getItem('itemsTabla')) {
              localStorage.removeItem('itemsTabla');
              matriztabla = "";
            }
          });
          document.getElementById("btnCancelar").addEventListener("click", function () {
            muestra_oculta("divListado", "block");
            muestra_oculta("divDetalle", "none");
            document.getElementById("btnBuscar").click();

          });


          document.getElementById("btnupdate").addEventListener("click", function () {
            if (localStorage.getItem('itemsTabla')) {
              localStorage.removeItem('itemsTabla');
            }
            if (matriztabla.length == 0) {
              var notificationWithButton = app.notification.create({
                icon: '<i class="icon demo-icon">7</i> , <i class="fas fa-bell-on"></i>',
                title: 'KAMACHIX',
                subtitle: "Por favor seleccionar una fila.",
                text: 'Click (x)',
                closeButton: true,
                closeTimeout: 3000,

              });
              notificationWithButton.open();
            }
            localStorage.setItem('itemsTabla', matriztabla);

            var ideditarj = "";

            if (localStorage.getItem('itemsTabla')) {
              document.getElementById("Fotosj").innerHTML = "";

              var datosj = localStorage.getItem('itemsTabla').split('|');
              document.getElementById("txtnameForm").value = datosj[1];
              document.getElementById("txtdescriptionForm").value = datosj[2];
              document.getElementById("txtdateForm").value = datosj[3];
              document.getElementById("cbostate").value = datosj[4];


              ideditarj += "@id=" + datosj[0];
              muestra_oculta("divListado", "none");
              muestra_oculta("divDetalle", "block");

              var parametros = "";
              parametros = "uti.spimages_justification&parametros=@caccion='imgjustification',@justificationid=" + datosj[0];


              btnretorno = "cdcd";
              post(url + parametros, listarimg);
              muestra_oculta("progressbarra", "block");

            } else {

              muestra_oculta("divListado", "block");
            }
            document.getElementById('btnNjustificacion').addEventListener("click", function () {
              var ruc = "@ruc='" + sessionStorage.getItem("ruc") + "'"
              var jname = document.getElementById("txtnameForm").value;
              var jdescription = document.getElementById("txtdescriptionForm").value;
              var jdate = document.getElementById("txtdateForm").value;
              var jstate = document.getElementById("cbostate").value;


              if (jname == "" || jdescription == "" || jdate == "") {
                alert('Se requiere completar campos.');
              } else {

                var parametros = "";
                parametros += "" + "asi.spjustification&parametros=@caccion='addstate'," + ruc + "," + ideditarj + ",@approvedstate='" + jstate + "'"

                btnretorno = "notbtnjustificacion";
                post(url + parametros, mensaje);

                muestra_oculta("divListado", "block");
                muestra_oculta("divDetalle", "none");
                document.getElementById("btnBuscar").click();
              }



            })

          });



          document.getElementById("btnBuscar").click();
        }

      }
    },
    {
      path: '/asistencia/',
      url: 'asistencia.html',
      on: {
        pageAfterIn: function (event, page) {
          sessionStorage.removeItem("imagenes");
          sessionStorage.removeItem("titulos");
          document.getElementById("Fotos").value = "";
          document.getElementById("txtjname").value = "";
          document.getElementById("cbojisexit").value = "";
          document.getElementById("txtjdia").value = "";
          document.getElementById("txtjhora").value = "";
          document.getElementById("txtjdescription").value = "";
          sessionStorage.removeItem("idJus");
          sessionStorage.removeItem("Nombre");
          sessionStorage.removeItem("descripcion");
          imagenes = [];
          titulos = [];



          document.getElementById('cameraApp').addEventListener('click', cameraApp);
          var cantidad = document.querySelectorAll('#Fotos .foto').length;
          function cameraApp() {
            debugger;
          

            if (cantidad < 4) {
              navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                saveToPhotoAlbum: true,
                destinationType: Camera.DestinationType.DATA_URL
              });
              function onSuccess(imageData) {
                src = imageData;
                navigator.notification.prompt("Escribe un titulo para la foto:", foto, "KAMACHIX CONTROL", ["OK", "Sin titulo"], "Sin nombre")
              }
              function foto(contenido) {
                var btn = contenido.buttonIndex;
                var texto = contenido.input1;
                if (btn == 2) {
                  texto = "(Sin Titulo)";
                }
                document.getElementById("Fotos").innerHTML += `<div id="${uuidv4()}" data-id="0" class="foto">
                                                                <img src="data:image/jpeg;base64,${src}">
                                                                <div class="tituloj">${texto}</div>
                                                                    <div class="borrar">
                                                                        <img src="img/borrar.png" onclick="myborrar(this);">
                                                                    </div>
                                                            </div>`;
                debugger;
                imagenes.push(src);
                titulos.push(texto);
                guardar();
              }
              function onFail(message) {
                alert('Failed because: ' + message);
              }
            } else {
              app.dialog.alert("Solo puede agregar 4 imagenes por justificación.");

            }
            // if (selection == "picker-thmb") {
            //   options.targetHeight = 100;
            //   options.targetWidth = 100;
            // }


          }



          document.getElementById('cameraAppL').addEventListener('click', galeria);

          function galeria() {

            var cantidad = document.querySelectorAll('#Fotos .foto').length;


            if (cantidad < 4) {

              var srcType = Camera.PictureSourceType.PHOTOLIBRARY;
              var options = setOptions(srcType);
              navigator.camera.getPicture(onSuccess, onFail, options)
              function setOptions(srcType) {
                var options = {
                  // Some common settings are 20, 50, and 100
                  quality: 50,
                  destinationType: Camera.DestinationType.DATA_URL,
                  // In this app, dynamically set the picture source, Camera or photo gallery
                  sourceType: srcType,
                  encodingType: Camera.EncodingType.JPEG,
                  mediaType: Camera.MediaType.PICTURE,
                  allowEdit: true,
                  correctOrientation: true  //Corrects Android orientation quirks
                }
                return options;
              }
              function onSuccess(imageData) {
                src = imageData;
                navigator.notification.prompt("Escribe un titulo para la foto:", foto, "KAMACHIX CONTROL", ["OK", "Sin titulo"], "Sin nombre")
              }
              function foto(contenido) {
                var btn = contenido.buttonIndex;
                var texto = contenido.input1;
                if (btn == 2) {
                  texto = "(Sin Titulo)";
                }

                document.getElementById("Fotos").innerHTML += `<div class="foto">
                                                                <img src="data:image/jpeg;base64,${src}">
                                                                <div class="tituloj">${texto}</div>
                                                                    <div class="borrar">
                                                                        <img src="img/borrar.png" onclick="myborrar(this);">
                                                                    </div>
                                                            </div>`;
                debugger;
                imagenes.push(src);
                titulos.push(texto);
                guardar();
              }
              function onFail(message) {
                alert('Failed because: ' + message);
              }
            } else {
              app.dialog.alert("Solo puede agregar 4 imagenes por justificación.");




            }
          }



          cargarJustificaciones();
          //Eliminar();
          var $$ = Dom7;

          // DOM events for my-sheet sheet
          $$('.my-sheet').on('sheet:open', function (e) {
            console.log('my-sheet open');
          });
          $$('.my-sheet').on('sheet:opened', function (e) {
            console.log('my-sheet opened');
          });

          // Create dynamic Sheet
          var dynamicSheet = app.sheet.create({
            content: '<div class="sheet-modal">' +
              '<div class="toolbar">' +
              '<div class="toolbar-inner">' +
              '<div class="left"></div>' +
              '<div class="right">' +
              '<a class="link sheet-close">Done</a>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '<div class="sheet-modal-inner">' +
              '<div class="block">' +
              '<p>Sheet created dynamically.</p>' +
              '<p><a href="#" class="link sheet-close">Close me</a></p>' +
              '</div>' +
              '</div>' +
              '</div>',
            // Events
            on: {
              open: function (sheet) {
                console.log('Sheet open');
              },
              opened: function (sheet) {
                console.log('Sheet opened');
              },
            }
          });
          // Events also can be assigned on instance later
          dynamicSheet.on('close', function (sheet) {
            console.log('Sheet close');
          });
          dynamicSheet.on('closed', function (sheet) {
            console.log('Sheet closed');
          });

          // Open dynamic sheet
          $$('.dynamic-sheet').on('click', function () {
            // Close inline sheet before
            app.sheet.close('.my-sheet');

            // Open dynamic sheet
            dynamicSheet.open();
          });

          // Create swipe-to-close Sheet
          app.sheet.create({
            el: '.my-sheet-swipe-to-close',
            swipeToClose: true,
            backdrop: true,
          });
          // Create swipe-to-step Sheet
          app.sheet.create({
            el: '.my-sheet-swipe-to-step',
            swipeToClose: true,
            swipeToStep: true,
            backdrop: true,
          });

          var d = new Date();
          var fecha = d.toLocaleString();
          document.getElementById("lblFechaAsistencia").innerText = fecha;
          document.getElementById("btnRegistrarJustificacion").addEventListener("click", function () {
            sessionStorage.removeItem("imagenes");
            sessionStorage.removeItem("titulos");
            imagenes = [];
            titulos = [];
            document.getElementById("Fotos").value = "";
            document.getElementById("txtjname").value = "";
            document.getElementById("cbojisexit").value = "";
            document.getElementById("txtjdia").value = "";
            document.getElementById("txtjhora").value = "";
            document.getElementById("txtjdescription").value = "";
            document.getElementById("Fotos").innerHTML = "";
          });
          document.getElementById("btnRegistrarAsistencia").addEventListener("click", function () {


            var user = sessionStorage.getItem("userid");
            var link = sessionStorage.getItem("myserver");
            var parametros = "@userid=" + user + ""
            var url = link + "myproc=asi.spassistance&parametros=@caccion='AssistanceIns'," + parametros;
            messagedeault = "Por favor conectarse a la señal wifi de su local";
            btnretorno = "btn";
            post(url, mensajeDefault);

          });


          document.getElementById("btnclosejustification").addEventListener("click", function () {
            cargarJustificaciones();

          });
          document.getElementById("btnjconfirm").addEventListener("click", function () {

            var id = sessionStorage.getItem("idJus");
            iseditar = id;
            var nameJusti = document.getElementById("txtjname").value;
            var descripJusti = document.getElementById("txtjdescription").value;
            var horaregistros = document.getElementById("txtjdia").value + " " + document.getElementById("txtjhora").value;
            var fechala = document.getElementById("txtjdia").value;
            var horal = document.getElementById("txtjhora").value;
            var cboexit = document.getElementById("cbojisexit").value;

            if (iseditar > 0) {
              sessionStorage.removeItem("idJus");
              sessionStorage.removeItem("Nombre");
              sessionStorage.removeItem("descripcion");
            } else {
              var ruc = "@ruc='" + sessionStorage.getItem("ruc") + "'"
              var userid = "@userid='" + sessionStorage.getItem("userid") + "'"
              var scheduleid = "@scheduleid='" + sessionStorage.getItem("scheduletypeid") + "'"

              if (descripJusti == "" || nameJusti == "" || horaregistros == "" || cboexit == "") {
                alert('Se requiere completar campos.');
                return;
              } else {
                var parametros = "";


              }
            }
            if (descripJusti == "" || nameJusti == "" || fechala == "" || horal == "" || cboexit == "") {
              alert('Se requiere completar todos los campos.');
            } else {

              var parametros = (iseditar > 0 ? "@id=" + id + "" : "" + ruc + "," + userid + "," + scheduleid + "") + ",@timeregister='" + horaregistros + "',@name='" + nameJusti + "',@description='" + descripJusti + "',@isexit='" + cboexit + "'";
              var url = "https://cenfelecsolutions.com/Kamachixapi/Ejecutaraccion?myproc=asi.spjustification&parametros=@caccion=" + (iseditar > 0 ? 'justificationedit' : 'justificationIns') + "," + parametros;
              document.getElementById("txtjname").value = "";
              document.getElementById("txtjdescription").value = "";
              document.getElementById("txtjdia").value = "";
              document.getElementById("txtjhora").value = "";
              document.getElementById("Fotos").innerHTML = "";
              btnretorno = "btnclosejustification";

              post(url, SaveId);


              socket.send(sessionStorage.getItem("name") + "|" + sessionStorage.getItem("userid") + "|justificación");

            }
          });


          if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4 && event.cancelable) { event.preventDefault(); }
          var acc = document.getElementsByClassName("accordion");
          var i;

          for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
              this.classList.toggle("active");
              var panel = this.nextElementSibling;
              if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
              } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
              }
            });
          }

        }
      }
    },
    {
      path: '/personal/',
      url: 'personal.html',
      on: {
        pageAfterIn: function (event, page) {
          isgantt = 0;
          if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4 && event.cancelable) { event.preventDefault(); }
          var acc = document.getElementsByClassName("accordion");
          var i;

          for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
              this.classList.toggle("active");
              var panel = this.nextElementSibling;
              if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
              } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
              }
            });
          }
          if (localStorage.getItem('itemsTabla')) {
            localStorage.removeItem('itemsTabla');
            matriztabla = "";
          }


          document.getElementById("btnBuscar").addEventListener("click", function () {
            muestra_oculta("loading", "block");
            var parametros = "";
            parametros += "adm.spuser&parametros=@caccion='users',@ruc='" + sessionStorage.getItem("ruc") + "'";

            post(url + parametros, mostrarTabla);
            if (localStorage.getItem('itemsTabla')) {
              localStorage.removeItem('itemsTabla');
              matriztabla = "";
            }
          });

          document.getElementById("btnCancelarPersonal").addEventListener("click", function () {
            muestra_oculta("divListadoPersonal", "block");
            muestra_oculta("divDetallePersonal", "none");
            document.getElementById("btnBuscar").click();

          });
          document.getElementById("btnBuscar").click();

          //mantenedor
          document.getElementById("btnedit").addEventListener("click", function () {
            if (localStorage.getItem('itemsTabla')) {
              localStorage.removeItem("itemsTabla");

            }
            if (matriztabla.length == 0) {
              var notificationWithButton = app.notification.create({
                icon: '<i class="icon demo-icon">7</i> , <i class="fas fa-bell-on"></i>',
                title: 'KAMACHIX',
                subtitle: "Por favor seleccionar una fila.",
                text: 'Click (x)',
                closeButton: true,
                closeTimeout: 3000,

              });
              notificationWithButton.open();
            }
            localStorage.setItem('itemsTabla', matriztabla);




            if (datoscombo1) {
              crearCombo(datoscombo1, "divcbopschedule", "Horario :", "cbopschedule");
            }
            var ideditarp = "";
            if (localStorage.getItem('itemsTabla')) {
              debugger;
              var datosp = localStorage.getItem('itemsTabla').split('|');
              document.getElementById("txtpname").value = datosp[1];
              document.getElementById("txtpsurnames").value = datosp[2];
              document.getElementById("txtpemail").value = datosp[3];
              document.getElementById("txtppassword").value = datosp[4];
              document.getElementById("txtppasswordconfirm").value = datosp[4];
              document.getElementById("txtperposition").value = (datosp[5] == 'Gerente') ? 1 : 2;
              document.getElementById("cbopschedule").value = datosp[6];

              ideditarp += "@id=" + datosp[0];

              muestra_oculta("divListadoPersonal", "none");
              muestra_oculta("divDetallePersonal", "block");
            }



            document.getElementById('btnNpersonal').addEventListener("click", function () {
              var pass = document.getElementById("txtppassword").value;
              var passtwo = document.getElementById("txtppasswordconfirm").value;

              if (pass != passtwo) {
                document.getElementById("txtppasswordconfirm").focus();
                alert('No coincide la contraseña');
              } else {
                var ruc = "@ruc='" + sessionStorage.getItem("ruc") + "'"
                var pname = document.getElementById("txtpname").value;
                var psurname = document.getElementById("txtpsurnames").value;
                var pemail = document.getElementById("txtpemail").value;
                var ppassword = document.getElementById("txtppasswordconfirm").value;
                var perposition = document.getElementById("txtperposition").value;
                var phorario = document.getElementById("cbopschedule").value;


                if (pname == "" || psurname == "" || phorario == "" || ppassword == "" || pemail == "") {
                  alert('Se requiere completar campos.');
                } else {

                  var parametros = "";
                  parametros += "" + "adm.spuser&parametros=@caccion='addschedule'," + ruc + "," + ideditarp + ",@scheduleid='" + phorario + "'" + ",@name='" + pname + "'" + ",@surnames='" + psurname + "'" + ",@position='" + perposition + "'" + ",@username='" + pemail + "'" + ",@password='" + ppassword + "'"

                  btnretorno = "xsbtnpersonal";
                  post(url + parametros, mensaje);
                  muestra_oculta("divListadoPersonal", "block");
                  muestra_oculta("divDetallePersonal", "none");
                  document.getElementById("btnBuscar").click();
                  sessionStorage.setItem('name', pname);
                  sessionStorage.setItem('surname', psurname);
                  sessionStorage.setItem('password', ppassword);
                  sessionStorage.setItem('username', pemail);
                  sessionStorage.setItem('position', perposition);

                }

              }
            })
          });
          document.getElementById("btnBuscar").click();

        }

      }
    },

  ],
  // ... other parameters
});

var mainView = app.views.create('.view-main');
if (sessionStorage.getItem("userid") == null) {
  location.href = "index.html";
}
var _parametros = "adm.spuser&parametros=@caccion='mymenu',@id='" + sessionStorage.getItem("userid") + "'";
btnretorno = "notbtnback";
post(url + _parametros, mymenu);