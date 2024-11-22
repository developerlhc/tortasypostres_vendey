


import { Product } from "../Product.js";
import { UI } from "../UI.js";
import { Peticiones } from "../Peticiones.js";
// var uribase = "http://localhost:61869/Vendey/";

// var uribase = "https://localhost:44370/Vendey/";
// var uribase = "https://www.cenfeapp.com/Vendey/";
var uribase = localStorage.getItem("uribase");  


// http://localhost:61869/


const cardproductList = document.getElementById("product-form");

// DOM Events
var myOffcanvas = document.getElementById('offcanvasWithBackdroppagar')
myOffcanvas.addEventListener('shown.bs.offcanvas', function () {
  let pagar = document.getElementById("txtmontopagado");
  pagar.focus()
})


document.getElementById('offcanvasWithBackdrop').addEventListener('shown.bs.offcanvas', function () {
  let pagar = document.getElementById("txtNumeroDni");
  pagar.focus()
})


document.getElementById('offcanvasWithBackdropCargarVenta').addEventListener('shown.bs.offcanvas', function () {
  //  this.BuscarPedidos();
})




document.getElementById("tbodyproductos").addEventListener("click", (e) => {
  const ui = new UI();
  if (e.target.getAttribute("name") == "eliminarproducto") {
    ui.deleteProduct(e.target);
  }
  if (e.target.getAttribute("name") == "editarproducto") {
    ui.editarProductoTable(e.target);
  }
  e.preventDefault();
});

// document.getElementById("tbodyproductos").addEventListener("click", (e) => {
//   const ui = new UI();
//   ui.updateProduct(e.target);
//   e.preventDefault();
// });
document.getElementById("btncancelarventa").addEventListener("click", (e) => {
  if (confirm('Si usted cancela se limpiara la venta?')) {
    limpiarventa();
  }
  e.preventDefault();
});
function limpiarventa() {
  const ui = new UI();
  document.getElementById("txtNumeroDni").value = "88888888";
  document.getElementById("txtpagado").innerHTML = "";
  document.getElementById("txtvuelto").innerHTML = "";
  ui.clearVenta();
}
document.getElementById("btnSeparar").addEventListener("click", (e) => {
  if (Number.parseFloat(document.getElementById("txttotalventa").innerText) > 0) {

    if (localStorage.getItem("gstoken") == "1277717") {

    } else {
      var myHeaders = new Headers();
      let cbodocventa = document.getElementById("cbodocventa");
      let cbodoccliente = document.getElementById("cbodoccliente");
      let nmro = document.getElementById("txtNumeroDni").value;
      let documentoventa = (cbodocventa.options[cbodocventa.selectedIndex].text.includes("BOLETA") ? "BOLETA ELECTRONICA" : "FACTURA ELECTRONICA");
      let CCODDOCUMENTOIMP = "01";
      if (documentoventa.includes("BOLETA")) {
        CCODDOCUMENTOIMP = "03";
      }

      let tiempoTranscurrido = Date.now();
      let hoy = new Date(tiempoTranscurrido);
      let DetalleComprobante = [];
      var cls = document.getElementById("tablaproductos").getElementsByTagName("td");
      let countrows = 1;
      let ntotal = 0;
      let ncantidad = 0;
      let nigv = 0;
      let nsubtotal = 0;
      let nigvsubtotal = 0;
      for (var i = 0; i < cls.length; i++) {
        if (cls[i].className == "countable") {
          ntotal += parseFloat(cls[i].getAttribute("ntotal"));
          ncantidad += parseFloat(cls[i].getAttribute("ncantidad"));
          // ncodproducto="2" ncantidad="1" nprecio="0.000" ntotal="0.000" cproductodesc="ACEITE CIL FS CC 20LT 1BLD"
          nigvsubtotal = parseFloat(parseFloat(cls[i].getAttribute("ntotal")) / 1.18);

          DetalleComprobante.push({
            "NCODEMPRESA": 1,
            "NCODAGENCIA": 1,
            "NCODFACTURA": 0,
            "NTIPOITEM": 1,
            "NITEM": countrows,
            "NCODPRODUCTO": cls[i].getAttribute("ncodproducto"),
            "CPRODUCTODESC": cls[i].getAttribute("cproductodesc"),
            "CCODLOTE": "",
            "NCANTIDAD": cls[i].getAttribute("ncantidad"),
            "CCODLISTAPRECIO": "1",
            "CUNDMEDIDA": "",
            "NVALUNI": nigvsubtotal,
            "NVALBRUTO": nigvsubtotal,
            "NIGV": parseFloat(cls[i].getAttribute("ntotal")) - nigvsubtotal,
            "NVALORSINPROM": cls[i].getAttribute("ntotal"),
            "NDSCTOPROM": 0,
            "NVENTANETA": nigvsubtotal,
            "NDSCUNI": 0,
            "NDSCTO": 0,
            "NVENTATOTAL": cls[i].getAttribute("ntotal"),
            "NCANTDESPACHADA": 0,
            "NCANTPORDESPACHAR": cls[i].getAttribute("ncantidad"),
            "COBSERVACIONES": "",
            "CUSERCREA": "admin",
            "DFECHACREA": "2021-10-04T14:14:23.386Z",
            "CUSERMODIFICA": "",
            "DFECHAMODIFICA": "2021-10-04T14:14:23.387Z",
            "CUSERELIMINA": "",
            "DFECHAELIMINA": "2021-10-04T14:14:23.387Z",
            "CLOCALHOST": "",
            "CESTADO": "A",
            "CPRODUCTODESCLARGA": "",
            "NPORCDSCTO": 0,
            "NCANTDEVUELTA": 0,
            "NCANTPORDEVOLVER": cls[i].getAttribute("ncantidad"),
            "NVAL_UNI": cls[i].getAttribute("nprecio"),
            "NDSC_UNI": 0,
            "CINCLUYEIGV": 1,
            "CCHECKAFECTOIGV": 1
          });
          countrows += 1;
        }

      }

      nsubtotal = parseFloat(ntotal) / 1.18;
      nigv = parseFloat(ntotal) - nsubtotal;

      myHeaders.append("Content-Type", "application/json");

      let comprobantesalir = null;
      let mydocnumber = (document.getElementById("cbodocventa").value == "01" ? "1" : (document.getElementById("cbodocventa").value == "03" ? "2" : "8"));
      if (mydocnumber == "1" && document.getElementById("txtNumeroDni").value.length != 11) {
        alert("Por favor colocar un ruc valido.")
        return;
      }
      if ((mydocnumber == "2" || mydocnumber == "8") && document.getElementById("txtNumeroDni").value.length != 8) {
        alert("Por favor colocar 88888888 si no cuenta con dni.")
        return;
      }

      let _CCODDOCUMENTOIMP = (document.getElementById("cbodocventa").value == "01" ? "1" : (document.getElementById("cbodocventa").value == "03" ? "2" : "8"));
      if (localStorage.getItem("gsCod_Alma_Caja") == "2") {
        _CCODDOCUMENTOIMP = (document.getElementById("cbodocventa").value == "01" ? "11" : (document.getElementById("cbodocventa").value == "03" ? "10" : "8"));
      }
      let cbotipopago = document.getElementById("cbotipopago");
      let tipopago = "";
      
      if (cbotipopago.selectedIndex<0) {
         tipopago = "EFECTIVO - CONTADO";
      }else{
        if (cbotipopago.options[cbotipopago.selectedIndex].text == "Seleccione") {
          alert("Por favor seleccionar el tipo de pago")
          return;
        }
        tipopago = cbotipopago.options[cbotipopago.selectedIndex].text;
      }  

      let yape="";
      let efectivo="";
      let visa="";
      if (tipopago=="MIXTO") {
          
         yape= prompt("Por favor ingresar monto yape")
         efectivo= prompt("Por favor ingresar efectivo")
         visa= prompt("Por favor ingresar visa")
         let sumatotal= parseFloat(document.getElementById("txttotalventa").innerText);
        let yapeefectivo= parseFloat(yape)+parseFloat(efectivo)+parseFloat(visa);
        if (yapeefectivo==sumatotal) {
          tipopago="MIXTO";
        }else{
          alert("Por favor ingresar monto correcto")
          return;
        }
      }
      

      var raw = JSON.stringify({
        "token": localStorage.getItem("gstoken").toString(),
        "CCONEXION": "string",
        "NCODEMPRESA": 1,
        "NCODAGENCIA": 1,
        "NPEDIDO": 1,
        "NCODFACTURA": 0,
        "CDIRECCION": document.getElementById("txtdireccioncliente").value,
        "CCODDOCUMENTOIMP": _CCODDOCUMENTOIMP,
        "CSERFACTURA": "001",
        "CNUMFACTURA": "",
        "DFECHAFACTURA": hoy.toISOString(),
        "CCODCLIENTE": 3,
        "CNOMBRECLIENTE": document.getElementById("txtrazonsocial").value,
        "CCODDOCCLIENTE": document.getElementById("cbodoccliente").value,
        "CNUMDOCCLIENTE": document.getElementById("txtNumeroDni").value,
        "CCODSUCURSAL": "",
        "CCODVEHICULO": "",
        "CCODPEDIDO": "",
        "CCODPERIODO": "130",
        "CCODVENDEDOR": localStorage.getItem("gsCodigoVendedor"),
        "CCODALMACEN": localStorage.getItem("gsCodAlmacen"),
        "CCODGUIAREMISION": "",
        "CCODCONDICION": "03",
        "CCODMONEDA": "1",
        "NTOTALCANTIDAD": ncantidad,
        "NTOTALBRUTO": nsubtotal,
        "NDESCPORC": 0,
        "NDESCUENTO": 0,
        "NTOTALIGV": nigv,
        "NTOTALDSCTOPROM": 0,
        "NTOTAL": ntotal,
        "CTOTALTEXTO": "Son : cinco soles",
        "CESTADOFAC": "1",
        "NMONTOPAGADO": ntotal,
        "NMONTOPENDIENTE": ntotal,
        "DFECHAVENCIMIENTO": "2021-10-04T14:14:23.386Z",
        "NDETRACCION": 0,
        "NMONTODETRACCION": 0,
        "NRETENCION": 0,
        "NMONTORETENCION": 0,
        "NPERCEPCION": 0,
        "NMONTOPERCEPCION": 0,
        "NESTADODESPACHO": 0,
        "COBSERVACIONES": tipopago,
        "CUSERCREA": localStorage.getItem("nombrevendedor"),
        "DFECHACREA": "2021-10-04T14:14:23.386Z",
        "CUSERMODIFICA": yape+"|"+efectivo+"|"+visa,
        "DFECHAMODIFICA": "2021-10-04T14:14:23.386Z",
        "CUSERELIMINA": "",
        "DFECHAELIMINA": "2021-10-04T14:14:23.386Z",
        "CLOCALHOST": localStorage.getItem("gsmac"),
        "CESTADO": "A",
        "DetalleComprobante": DetalleComprobante,
        "PagoCabs": [
          {
            "NCODEMPRESA": "1",
            "NCODAGENCIA": "1",
            "NCODPAGO": "0",
            "NITEM": "0",
            "NTIPOPAGO": "1",
            "CCODMONEDA": "1",
            "NTIPOTARJETA": "0",
            "CNROTARJETA": "0",
            "CNROVOUCHER": "0",
            "NPAGOTOTAL": 10000000,
            "NMONTOVENTA": ntotal,
            "NVUELTO": 0.00,
            "COBSERVACIONES": tipopago,
            "CUSERCREA": "admin",
            "DFECHACREA": "2021-10-04T14:14:23.386Z",
            "CUSERMODIFICA": "admin",
            "DFECHAMODIFICA": "2021-10-04T14:14:23.386Z",
            "CUSERELIMINA": "admin",
            "DFECHAELIMINA": "0",
            "CLOCALHOST": "PC-DESKTOP-HURIJUM",
            "CESTADO": "A",
            "NCODTIPOPAGO": "1",
            "CCODCONCEPTO": "0",
            "NCODCUENTA": "0",
            "NCAJA": localStorage.getItem("gsCodigoVendedor")
          }
        ]
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      var element = document.getElementById("btnemitircard");
      element.classList.add("d-none");

      fetch(uribase + "Emitir", requestOptions)
        .then(response => response.json())
        .then(result => {


          if (result.Exito) {
            let documentoEmitido = JSON.parse(result.Rpta);
            var raw = JSON.stringify({
              "token": mytoken,
              "procedure": "spVNT_imprimirweb",
              "parametros":  documentoEmitido.NCODFACTURA+"|"+localStorage.getItem("gsmac")+"|"
            });
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            fetch(uribaseReal+"EjecutarVendey", requestOptions)
              .then(response => response.json())
              .then(result => {
                
              })
              .catch(error => console.log('error', error));

            alert("Pedido concretado " + documentoEmitido.NCODFACTURA);
            
            element.classList.remove("d-none");
            // pcargarpdf();
            // var wsUri = "wss://cenfelecapp.glitch.me/";
            // var ws = new WebSocket(wsUri);
            // ws.onopen = function () {
            // };
            // ws.send("JOSE-"+documentoEmitido.NCODFACTURA); // send a message

            // ws.onmessage = function (evt) {
            //   console.log("Message received = " + evt.data);
            // };

            // ws.onclose = function () {
            //   // websocket is closed.
            //   console.log("Connection closed...");
            // };

            // cordova.plugins.printer.print(crearComprobante());

            document.getElementById("txtNumeroDni").value = "88888888";
            document.getElementById("txtpagado").innerHTML = "";
            document.getElementById("txtvuelto").innerHTML = "";
            let Xcbodocventa = document.getElementById("cbodocventa");


            document.getElementById("btncancelarventa").click();
            document.getElementById("txtNumeroDni").value = "88888888";
            document.getElementById("txtpagado").innerHTML = "";
            document.getElementById("txtvuelto").innerHTML = "";

            document.getElementById("txtdocumentoventa").innerText = Xcbodocventa.options[Xcbodocventa.selectedIndex].text;
            secondOption.selected = true;
        
            document.getElementById("btncancelarventa").click();
          } else {
            alert("Datos incorrectos llegaron al servidor , enviar captura a videosvencor@gmail.com")
            element.classList.remove("d-none");
          }
        })
        .catch((error) => {
          alert("Revisar conexión internet(INESTABLE)")
          element.classList.remove("d-none");
        })
    }


  }

  e.preventDefault();
});


document.getElementById("btncamara").addEventListener("click", (e) => {

  scan();
  e.preventDefault();
});



document.getElementById("btnagregarproducto").addEventListener("click", (e) => {
  const ui = new UI();
  let cproductodesc = document.getElementById("txtNombreProducto").value;
  let ncodproducto = document.getElementById("txtNombreProducto").getAttribute("ncodproducto");
  let ncantidad = document.getElementById("txtcantidad").value;
  let nprecio = document.getElementById("txtpreioventa").value;
  document.getElementById("txtNombreProducto").setAttribute('readonly', true);
  if (cproductodesc == "producto servicio") {
    document.getElementById("txtNombreProducto").setAttribute('readonly', false);
  }
  let total = document.getElementById("txttotalproducto").value;
  if (total > 0) {
    const product = new Product(ncodproducto, "", cproductodesc, ncantidad, nprecio, 0, 0, total, true);
    ui.addProduct(product);
    var cerarventana = document.getElementById("btncerrarproductomodal");
    cerarventana.click();
    ui.updateTotalVenta();
  } else {
    alert("Por favor colocar un precio para realizar la venta");
  }

  e.preventDefault();
});


document.getElementById("btncomprobanteaceptar").addEventListener("click", (e) => {
  let cerarventana = document.getElementById("btncerrarcomprobante");
  let cbodocventa = document.getElementById("cbodocventa");
  let cbodoccliente = document.getElementById("cbodoccliente");
  let nmro = document.getElementById("txtNumeroDni").value;
  let documentoventa = (cbodocventa.options[cbodocventa.selectedIndex].text == "FACTURA ELECTRONICA" ? "FACTURA ELECTRONICA" : "BOLETA ELECTRONICA");
  let rpta = true;
  if (documentoventa == "FACTURA ELECTRONICA") {
    if (cbodoccliente.options[cbodoccliente.selectedIndex].text == "RUC") {
      if (nmro.length != 11) {
        rpta = false;
      }
    } else {
      rpta = false;
    }
  } else {
    if (documentoventa == "BOLETA ELECTRONICA" && cbodoccliente.options[cbodoccliente.selectedIndex].text == "RUC") {
      rpta = false;

    } else {
      if (nmro.length <= 8 && documentoventa == "BOLETA ELECTRONICA" && cbodoccliente.options[cbodoccliente.selectedIndex].text != "DNI") {
        rpta = false;
      }
    }
  }
  if (rpta == false) {
    iziToast.info({
      title: 'Tener en cuenta',
      message: 'Para factura es necesario colocar tipo de documento ruc y el número con longitud a 11!',
    });
  } else {


    document.getElementById("txtdocumentoventa").innerText = cbodocventa.options[cbodocventa.selectedIndex].text + "-" + document.getElementById("txtrazonsocial").value;
    cerarventana.click();
  }
  e.preventDefault();
});
document.getElementById("txtbuscarproducto").addEventListener("click", (e) => {
  document.getElementById("txtbuscarproducto").value = "";
});



document.getElementById("btnpagarmodal").addEventListener("click", (e) => {
  var montopagado = document.getElementById("txtmontopagado").value;
  var montopagar = document.getElementById("txtmontopagar");
  montopagar.focus();
  var vuelto = montopagado - montopagar.value;
  if (vuelto >= 0) {
    document.getElementById("txtpagado").innerText = montopagado;
    document.getElementById("txtvuelto").innerText = vuelto;
    let cerarventana = document.getElementById("btncerrarpagar");
    cerarventana.click();
  } else {
    iziToast.info({
      title: 'Información',
      message: 'El monto pagado es invalido!',
    });
  }
  e.preventDefault();

});


document.getElementById("btnmostrar").addEventListener("click", (e) => {

  e.preventDefault();

});


document.getElementById("cboListaPrecio").onchange = function () {
  var index = this.selectedIndex;
  var inputText = this.children[index];
  let cboListaPrecio = document.getElementById("cboListaPrecio");
  var valuelista = cboListaPrecio.options[cboListaPrecio.selectedIndex].text;
  var strUser = cboListaPrecio.options[cboListaPrecio.selectedIndex].value;

  console.log('HOLA ', valuelista);
  let codprecio = 1;
  if (valuelista.toLocaleLowerCase().includes("por empaque")) {
    codprecio = 3;
  } else if (valuelista == "Por mayor") {
    codprecio = 2;
  }
  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  let ncodproductoinput = document.getElementById("txtNombreProducto");
  ncodproductoinput.getAttribute("ncodproducto");
  fetch(uribase + "Buscarprecioproducto?ncodproducto=" + ncodproductoinput.getAttribute("ncodproducto") + "&ncodlistaprecio=" + strUser + "&token=" + localStorage.getItem("gstoken").toString(), requestOptions)
    .then(response => response.json())
    .then(result => {
      let rpta = JSON.parse(result.Rpta);
      if (codprecio == 3) {
        document.getElementById("txtpreioventa").value = parseFloat(rpta.NPRECIO).toFixed(2);
        document.getElementById("txtNombreProducto").setAttribute("ncodproducto", rpta.NCODPRODUCTO);
        document.getElementById("txtNombreProducto").value = rpta.CPRODUCTODESCLARGA;
        document.getElementById("txtcantidad").value = 1;
        document.getElementById("txttotalproducto").value = rpta.NPRECIO;
      } else {
        document.getElementById("txtpreioventa").value = parseFloat(rpta.NPRECIO).toFixed(2);;
        document.getElementById("txtNombreProducto").setAttribute("ncodproducto", rpta.NCODPRODUCTO);
        document.getElementById("txtNombreProducto").value = rpta.CPRODUCTODESC;
        document.getElementById("txtcantidad").value = 1;
        document.getElementById("txttotalproducto").value = rpta.NPRECIO;
      }

      document.getElementById("txtNombreProducto").setAttribute('readonly', true);
      if (rpta.CPRODUCTODESCLARGA == "producto servicio") {
        document.getElementById("txtNombreProducto").setAttribute('readonly', false);
      }

    })
    .catch(error => console.log('error', error));
}

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "usuario": "string",
//   "password": "string",
//   "vendedor": "string",
//   "empresa": "luis",
//   "caja": "string",
//   "almacen": "string"
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch(uribase + "Login", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));


// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const inputBox = searchWrapper.querySelector("input");
let linkTag = searchWrapper.querySelector("a");
let webLink;
const txtNumero = document.getElementById("txtNumeroDni");


// if user press any key and release

// function selectProd(element) {
//   console.log("ingreseeeeee");
//   let selectData = element.textContent;
//   inputBox.value = selectData;
//   // icon.onclick = ()=>{
//   //     webLink = "https://www.google.com/search?q=" + selectData;
//   //     linkTag.setAttribute("href", webLink);
//   //     linkTag.click();
//   // }
//   searchWrapper.classList.remove("active");
// }




function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}


function ConsultaDni(dni) {
  document.getElementById("txtdireccioncliente").value = "";
  document.getElementById("txttelefonocliente").value = "";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "token": localStorage.getItem("gstoken").toString(),
    "CNUMDOCCLIENTE": dni,
    "COBSERVACIONES": (dni.length == 8 ? "DNI" : "RUC")
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(uribase + "ConsultaRucDni", requestOptions)
    .then(response => response.json())
    .then(result => {
      let rpta = JSON.parse(result.Rpta);
      console.log(rpta);
      let mirazon = document.getElementById("txtrazonsocial");
      mirazon.value = rpta.RazonSocial;
      document.getElementById("txtdireccioncliente").value = rpta.DomicilioFiscal;
      document.getElementById("txttelefonocliente").value = rpta.Telefono;
    })

    .catch(error => console.log('error', error));



}
const txtcodprodinventory = document.getElementById("txtcodprodinventory");
const txtcodprodinternoinventory = document.getElementById("txtcodprodinternoinventory");
const txtNombreProductoinevntory = document.getElementById("txtNombreProductoinevntory");
const cbotipomovinventory = document.getElementById("cbotipomovinventory");
// txtcodprodinventory.onkeyup = (e) => {
//   BuscarProductoCenfelec();
// }
function BuscarProductoCenfelec() {
  console.log('buscar por codprod', txtcodprodinventory.value);
}

txtNumero.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  console.log(userData);
  let cbodoccliente = document.getElementById("cbodoccliente");
  let cbodocventa = document.getElementById("cbodocventa");

  if (userData.length == 8) {
    var opts = cbodoccliente.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      if (opt.text == "DNI") {
        cbodoccliente.selectedIndex = j;
        break;
      }
    }
    var opts = cbodocventa.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      if (opt.text == "TICKET NOTA DE VENTA") {
        cbodocventa.selectedIndex = j;
        break;
      }
    }
    ConsultaDni(userData);
  } else if (userData.length == 11) {
    var opts = cbodoccliente.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      if (opt.text == "RUC") {
        cbodoccliente.selectedIndex = j;
        break;
      }
    }
    var opts = cbodocventa.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      if (opt.text.includes("FACTURA")) {
        cbodocventa.selectedIndex = j;
        break;
      }
    }
    ConsultaDni(userData);
  } else {
    let mirazon = document.getElementById("txtrazonsocial");
    mirazon.value = "";
  }
}
const peticion = new Peticiones();

document.getElementById("btnemitircard").addEventListener("click", (e) => {
  if (localStorage.getItem("gstoken") == "1277717") {
    document.getElementById("txtpagado").innerText = Number.parseFloat(document.getElementById("txttotalventa").innerText);
    document.getElementById("txtvuelto").innerText = '0'
  }

  if (Number.parseFloat(document.getElementById("txtpagado").innerText) >= Number.parseFloat(document.getElementById("txttotalventa").innerText)) {


    var myHeaders = new Headers();
    let cbodocventa = document.getElementById("cbodocventa");
    let cbodoccliente = document.getElementById("cbodoccliente");
    let nmro = document.getElementById("txtNumeroDni").value;
    let documentoventa = (cbodocventa.options[cbodocventa.selectedIndex].text.includes("BOLETA") ? "BOLETA ELECTRONICA" : "FACTURA ELECTRONICA");
    let CCODDOCUMENTOIMP = "01";
    if (documentoventa.includes("BOLETA")) {
      CCODDOCUMENTOIMP = "03";
    }

    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);
    let DetalleComprobante = [];
    var cls = document.getElementById("tablaproductos").getElementsByTagName("td");
    let countrows = 1;
    let ntotal = 0;
    let ncantidad = 0;
    let nigv = 0;
    let nsubtotal = 0;
    let nigvsubtotal = 0;
    for (var i = 0; i < cls.length; i++) {
      if (cls[i].className == "countable") {
        ntotal += parseFloat(cls[i].getAttribute("ntotal"));
        ncantidad += parseFloat(cls[i].getAttribute("ncantidad"));
        // ncodproducto="2" ncantidad="1" nprecio="0.000" ntotal="0.000" cproductodesc="ACEITE CIL FS CC 20LT 1BLD"
        nigvsubtotal = parseFloat(parseFloat(cls[i].getAttribute("ntotal")) / 1.18);

        DetalleComprobante.push({
          "NCODEMPRESA": 1,
          "NCODAGENCIA": 1,
          "NCODFACTURA": 0,
          "NTIPOITEM": 1,
          "NITEM": countrows,
          "NCODPRODUCTO": cls[i].getAttribute("ncodproducto"),
          "CPRODUCTODESC": cls[i].getAttribute("cproductodesc"),
          "CCODLOTE": "",
          "NCANTIDAD": cls[i].getAttribute("ncantidad"),
          "CCODLISTAPRECIO": "1",
          "CUNDMEDIDA": "",
          "NVALUNI": nigvsubtotal,
          "NVALBRUTO": nigvsubtotal,
          "NIGV": parseFloat(cls[i].getAttribute("ntotal")) - nigvsubtotal,
          "NVALORSINPROM": cls[i].getAttribute("ntotal"),
          "NDSCTOPROM": 0,
          "NVENTANETA": nigvsubtotal,
          "NDSCUNI": 0,
          "NDSCTO": 0,
          "NVENTATOTAL": cls[i].getAttribute("ntotal"),
          "NCANTDESPACHADA": 0,
          "NCANTPORDESPACHAR": cls[i].getAttribute("ncantidad"),
          "COBSERVACIONES": "",
          "CUSERCREA": "admin",
          "DFECHACREA": "2021-10-04T14:14:23.386Z",
          "CUSERMODIFICA": "",
          "DFECHAMODIFICA": "2021-10-04T14:14:23.387Z",
          "CUSERELIMINA": "",
          "DFECHAELIMINA": "2021-10-04T14:14:23.387Z",
          "CLOCALHOST": "",
          "CESTADO": "A",
          "CPRODUCTODESCLARGA": "",
          "NPORCDSCTO": 0,
          "NCANTDEVUELTA": 0,
          "NCANTPORDEVOLVER": cls[i].getAttribute("ncantidad"),
          "NVAL_UNI": cls[i].getAttribute("nprecio"),
          "NDSC_UNI": 0,
          "CINCLUYEIGV": 1,
          "CCHECKAFECTOIGV": 1
        });
        countrows += 1;
      }

    }

    nsubtotal = parseFloat(ntotal) / 1.18;
    nigv = parseFloat(ntotal) - nsubtotal;

    myHeaders.append("Content-Type", "application/json");
    if (localStorage.getItem("gstoken") == "7777767") {
      var selectElement = document.getElementById('cbotipopago');
            
      // Establecer el valor predeterminado
      selectElement.value = 'EFECTIVO|0.00||';
      let combovendedor = document.getElementById("cbousuariologin");
      console.log("revisar ", combovendedor.options[combovendedor.selectedIndex].value)
      if (combovendedor.options[combovendedor.selectedIndex].value != 0) {
        localStorage.setItem("gsCodigoVendedor", combovendedor.options[combovendedor.selectedIndex].value);
      } else {
        alert("Por favor seleccionar el vendedor");
        combovendedor.focus();
        return;
      }
    }

    let comprobantesalir = null;
    let mydocnumber = (document.getElementById("cbodocventa").value == "01" ? "1" : (document.getElementById("cbodocventa").value == "03" ? "2" : "8"));
    if (mydocnumber == "1" && document.getElementById("txtNumeroDni").value.length != 11) {
      alert("Por favor colocar un ruc valido.")
      return;
    }
    if ((mydocnumber == "2" || mydocnumber == "8") && document.getElementById("txtNumeroDni").value.length != 8) {
      alert("Por favor colocar 88888888 si no cuenta con dni.")
      return;
    }
    debugger;
    let _CCODDOCUMENTOIMP = (document.getElementById("cbodocventa").value == "01" ? "1" : (document.getElementById("cbodocventa").value == "03" ? "2" : "8"));
    if (localStorage.getItem("gsCod_Alma_Caja") == "2") {
      _CCODDOCUMENTOIMP = (document.getElementById("cbodocventa").value == "01" ? "11" : (document.getElementById("cbodocventa").value == "03" ? "10" : "8"));
    }
    debugger
    let cbotipopago = document.getElementById("cbotipopago");
    let tipopago = "";
    if (cbotipopago.selectedIndex<0) {
       tipopago = "EFECTIVO - CONTADO";
    }else{
      tipopago = cbotipopago.options[cbotipopago.selectedIndex].text;
    }  
    debugger
    if (tipopago == "Seleccione" && localStorage.getItem("gstoken") != "7777767") {
      alert("Por favor seleccionar el tipo de pago")
      return;
    }else{
      // if (localStorage.getItem("gstoken") != "777721214") {
      //   tipopago = "EFECTIVO - CONTADO";
      // }

    }
    let yape="";
      let efectivo="";
      let visa="";
      if (tipopago=="MIXTO") {
          
         yape= prompt("Por favor ingresar monto yape")
         efectivo= prompt("Por favor ingresar efectivo")
         visa= prompt("Por favor ingresar visa")
         let sumatotal= parseFloat(document.getElementById("txttotalventa").innerText);
        let yapeefectivo= parseFloat(yape)+parseFloat(efectivo)+parseFloat(visa);
        if (yapeefectivo==sumatotal) {
          tipopago="MIXTO";
        }else{
          alert("Por favor ingresar monto correcto")
          return;
        }
      }
    var raw = JSON.stringify({
      "token": localStorage.getItem("gstoken").toString(),
      "CCONEXION": "string",
      "NCODEMPRESA": 1,
      "CTELEFONO": document.getElementById("txttelefonocliente").value,
      "NPEDIDO": "0",
      "CDIRECCION": document.getElementById("txtdireccioncliente").value,
      "NCODAGENCIA": 1,
      "NCODFACTURA": 0,
      "CCODDOCUMENTOIMP": _CCODDOCUMENTOIMP,
      "CSERFACTURA": "001",
      "CNUMFACTURA": "",
      "DFECHAFACTURA": hoy.toISOString(),
      "CCODCLIENTE": 3,
      "CNOMBRECLIENTE": document.getElementById("txtrazonsocial").value,
      "CCODDOCCLIENTE": document.getElementById("cbodoccliente").value,
      "CNUMDOCCLIENTE": document.getElementById("txtNumeroDni").value,
      "CCODSUCURSAL": "",
      "CCODVEHICULO": "",
      "CCODPEDIDO": "",
      "CCODPERIODO": "130",
      "CCODVENDEDOR": localStorage.getItem("gsCodigoVendedor"),
      "CCODALMACEN": localStorage.getItem("gsCodAlmacen"),
      "CCODGUIAREMISION": "",
      "CCODCONDICION": "03",
      "CCODMONEDA": "1",
      "NTOTALCANTIDAD": ncantidad,
      "NTOTALBRUTO": nsubtotal,
      "NDESCPORC": 0,
      "NDESCUENTO": 0,
      "NTOTALIGV": nigv,
      "NTOTALDSCTOPROM": 0,
      "NTOTAL": ntotal,
      "CTOTALTEXTO": "Son : cinco soles",
      "CESTADOFAC": "3",
      "NMONTOPAGADO": ntotal,
      "NMONTOPENDIENTE": ntotal,
      "DFECHAVENCIMIENTO": "2021-10-04T14:14:23.386Z",
      "NDETRACCION": 0,
      "NMONTODETRACCION": 0,
      "NRETENCION": 0,
      "NMONTORETENCION": 0,
      "NPERCEPCION": 0,
      "NMONTOPERCEPCION": 0,
      "NESTADODESPACHO": 0,
      "COBSERVACIONES": tipopago,
      "CUSERCREA":tipopago=="MIXTO"? yape+"|"+efectivo+"|"+visa:"admin",
      "DFECHACREA": "2021-10-04T14:14:23.386Z",
      "CUSERMODIFICA": "",
      "DFECHAMODIFICA": "2021-10-04T14:14:23.386Z",
      "CUSERELIMINA": "",
      "DFECHAELIMINA": "2021-10-04T14:14:23.386Z",
      "CLOCALHOST": localStorage.getItem("gsmac"),
      "CESTADO": "A",
      "DetalleComprobante": DetalleComprobante,
      "PagoCabs": [
        {
          "NCODEMPRESA": "1",
          "NCODAGENCIA": "1",
          "NCODPAGO": "0",
          "NITEM": "0",
          "NTIPOPAGO": "1",
          "CCODMONEDA": "1",
          "NTIPOTARJETA": "0",
          "CNROTARJETA": "0",
          "CNROVOUCHER": "0",
          "NPAGOTOTAL": document.getElementById("txtpagado").innerText.replace("S/", ""),
          "NMONTOVENTA": ntotal,
          "NVUELTO": document.getElementById("txtvuelto").innerText.replace("Vuelto S/", ''),
          "COBSERVACIONES": tipopago,
          "CUSERCREA": "admin",
          "DFECHACREA": "2021-10-04T14:14:23.386Z",
          "CUSERMODIFICA": "admin",
          "DFECHAMODIFICA": "2021-10-04T14:14:23.386Z",
          "CUSERELIMINA": "admin",
          "DFECHAELIMINA": "0",
          "CLOCALHOST": "PC-DESKTOP-HURIJUM",
          "CESTADO": "A",
          "NCODTIPOPAGO": "1",
          "CCODCONCEPTO": "0",
          "NCODCUENTA": "0",
          "NCAJA": localStorage.getItem("gsCodigoVendedor")
        }
      ]
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    var element = document.getElementById("btnemitircard");
    element.classList.add("d-none");

    fetch(uribase + "Emitir", requestOptions)
      .then(response => response.json())
      .then(result => {


        if (result.Exito) {

          let documentoEmitido = JSON.parse(result.Rpta);
          var raw = JSON.stringify({
            "token": localStorage.getItem("gstoken").toString(),
            "procedure": "spVNT_imprimirweb",
            "parametros":  documentoEmitido.NCODFACTURA+"|"+localStorage.getItem("gsmac")+"|"
          });
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          fetch(uribaseReal+"EjecutarVendey", requestOptions)
            .then(response => response.json())
            .then(result => {
              
            })
            .catch(error => console.log('error', error));

          let codcajafinanzas = localStorage.getItem("gsCod_Alma_Caja");

          var raw1 = JSON.stringify({
            "token": localStorage.getItem("gstoken").toString(),
            "procedure": "spVnt_updatecliente",
            "parametros": document.getElementById("txtNumeroDni").value + "|" + document.getElementById("txttelefonocliente").value + "|" + document.getElementById("txtdireccioncliente").value + "|"
          });
          var myHeaders1 = new Headers();
          myHeaders1.append("Content-Type", "application/json");
          var requestOptions1 = {
            method: 'POST',
            headers: myHeaders1,
            body: raw1,
            redirect: 'follow'
          };
          fetch(uribase + "EjecutarVendey", requestOptions1)
            .then(response => response.json())
            .then(result => {

            })
          // revisar1
          var raw2 = JSON.stringify({
            "token": localStorage.getItem("gstoken").toString(),
            "procedure": "spCTA_CAJAUPDATECSVWEB",
            "parametros": documentoEmitido.NCODFACTURA + "|" + codcajafinanzas + "|"
          });
          var myHeaders2 = new Headers();
          myHeaders2.append("Content-Type", "application/json");
          var requestOptions2 = {
            method: 'POST',
            headers: myHeaders2,
            body: raw2,
            redirect: 'follow'
          };
          fetch(uribase + "EjecutarVendey", requestOptions2)
            .then(response => response.json())
            .then(result => {

            })


          alert("Venta concretada " + documentoEmitido.NCODFACTURA);
          document.getElementById('cbotipopago').value = "0";


          if (localStorage.getItem("gsmac").toString().includes(":")) {
            appCenfelec.Imprimir(documentoEmitido.NCODFACTURA, true);

            //       var raw = JSON.stringify({
            //         "token": localStorage.getItem("gsempresaglobal"),
            //         "procedure": "spVNT_FACTURATICKETCSVWEB",
            //         "parametros": documentoEmitido.NCODFACTURA + "|" +documentoEmitido.NCODFACTURA + "|"
            //     });
            //     var myHeaders = new Headers();
            //     myHeaders.append("Content-Type", "application/json");
            //     var requestOptions = {
            //         method: 'POST',
            //         headers: myHeaders,
            //         body: raw,
            //         redirect: 'follow'
            //     };
            //     let detallearmar=``;
            // let serienumero=""
            // let nmontopagado="";
            // let nsubtotal="";
            // let ntotaligv="";
            // let ntotalfacturaboleta="";
            // let totaltexto="";
            // let datosfinal="";
            // let CLIENTE="";
            // let FECHA="";
            // let RUC="";
            // let DIRECCION="";

            // let TELEFONO="";
            //     fetch(uribaseReal + "EjecutarVendey", requestOptions)
            //         .then(response => response.json())
            //         .then(result => {
            //             let lista = result.Rpta.split("¬");
            //             var nCampos = lista.length;
            //             let col = [];
            //             let j = 1;
            //             for (j = 1; j < nCampos; j++) {
            //                 col = lista[j].split("|");
            //                 if (DIRECCION.length==0) {
            //                   let _DIRECCION=`DIRECCION :${col[70]}`;
            //                   DIRECCION=`${_DIRECCION.replace(/(.{31})/g, "$1\n")}`;
            //         TELEFONO=`TELEFONO : ${col[63].replace(/(.{31})/g, "$1\n") }`;
            //       }
            //                 nmontopagado=`${col[25]}`;
            //                 nsubtotal=`${col[12]}`;
            //                 ntotaligv=`${col[16]}`;
            //                 ntotalfacturaboleta=`${col[18]}`;
            //                 totaltexto=`SON : ${col[21].replace(/(.{31})/g, "$1\n") }\n`;
            //                 nvuelto=`${col[21].replace(/(.{31})/g, "$1\n") }\n`;

            //                 serienumero=`${col[5]}`;
            //                 detallearmar+=`${col[31].replace(/(.{30})/g, "$1\n")}\n`;
            //                 detallearmar+=`${col[66].substring(0,1)}          ${col[58]}      ${col[41]}\n`;
            //                 detallearmar+=`------------------------------`;
            //                 if (datosfinal.length==0) {
            //                      CLIENTE=`CLIENTE : ${col[48]}`.replace(/(.{30})/g, "$1\n");;
            //                      FECHA=`${col[6]}`;
            //                      RUC=`${col[46]}`;
            //                     if (serienumero.includes("B")|| serienumero.includes("F")) {
            //                     datosfinal =`         SUBTOTAL  S/ ${nsubtotal}\n`;
            //                     datosfinal+=`              IGV  S/ ${ntotaligv}\n`;
            //                     }
            //                     datosfinal+=`    IMPORTE TOTAL  S/ ${ntotalfacturaboleta}\n`;
            //                     datosfinal+=`           PAGADO  S/ ${nmontopagado}\n`;
            //                     datosfinal+=`           VUELTO  S/ ${ntotalfacturaboleta-nmontopagado}`;
            //                 }
            //             }
            // let datosEmpresaextra=``;
            // let nombreempresa="            DIONYS"
            // let datosextra2=`DISTRIBUIDORA DE GAS AUTORIZADO
            // POR OSINERGMIN`;
            // let token=localStorage.getItem("gstoken");
            // if (token=="1277717") {
            // nombreempresa="DISTRIBUIDORA ARUBBA S.A.C";
            // datosEmpresaextra="";
            // datosextra2="";
            // }else{
            // datosEmpresaextra=`DISTRIBUIDORA DE GAS AUTORIZADO
            // POR OSINERGMIN
            // DIRECCION : JR LIBERTAD N° 315 
            // (PARQUE ECHENIQUE)
            // LURIGANCHO-CHOSICA-LIMA-LIMA`
            // }            
            //             let documento="    NOTA VENTA"
            // if (serienumero.includes("B")) {
            //     documento="BOLETA ELECTRONICA"
            //     TELEFONO="";
            // }else if(serienumero.includes("F")){
            //     documento="FACTURA ELECTRONICA"
            //     TELEFONO="";
            // }
            // let datosEmpresa="";
            // let extrabuscar=`Representacion impresa de la 
            // facturacion electronica\n
            // consulte en https://gasdiony
            // s.cenfefactu.xyz/buscar`;
            // let myruc=`
            // RUC 10076809041
            // DE : DIONISIA CAMPOS CONDOR`;
            // datosEmpresa=`
            // ${nombreempresa}            
            // ::::::::::::::::::::::::::::::
            // ${documento}
            //   ${serienumero}
            // ::::::::::::::::::::::::::::::
            // ${myruc}
            // ${datosEmpresaextra}`;   

            // if (serienumero.includes("B")) {
            //     documento="BOLETA ELECTRONICA"
            //     TELEFONO="";
            // }else if(serienumero.includes("F")){
            //     documento="FACTURA ELECTRONICA"
            //     TELEFONO="";
            // }else{
            //     myruc="";
            //     DIRECCION+=`\n${TELEFONO}`;
            //     datosEmpresa=`${nombreempresa}
            // ::::::::::::::::::::::::::::::
            // ${documento}
            //   ${serienumero}
            // ::::::::::::::::::::::::::::::
            // ${datosextra2}`;
            //     extrabuscar="";
            // }    
            // let datospedidods="CENTRAL DE PEDIDOS 989005529"        
            // if (token="1277717") {
            // datospedidods="";
            // }

            // let prueba=`${datosEmpresa}
            // ${datospedidods}
            // ::::::::::::::::::::::::::::::
            // ${CLIENTE}
            // RUC/DNI : ${RUC}
            // ${DIRECCION.trim()}
            // FECHA   : ${FECHA}
            // ::::::::::::::::::::::::::::::
            // CANT       P.UNIT        P.TOT
            // ------------------------------
            // ${detallearmar}
            // ${datosfinal}
            // ::::::::::::::::::::::::::::::
            // ${totaltexto.toUpperCase().replace(/(.{31})/g, "$1\n")}
            // ...Gracias por su compra......
            // ${extrabuscar}
            // \n\n\n\n`;


            // debugger
            // bluetoothSerial.write( prueba, function (data) {
            // }, {

            // });
            // });


          }
          element.classList.remove("d-none");
          // pcargarpdf();
          // var wsUri = "wss://cenfelecapp.glitch.me/";
          // var ws = new WebSocket(wsUri);
          // ws.onopen = function () {
          // };
          // ws.send("JOSE-"+documentoEmitido.NCODFACTURA); // send a message

          // ws.onmessage = function (evt) {
          //   console.log("Message received = " + evt.data);
          // };

          // ws.onclose = function () {
          //   // websocket is closed.
          //   console.log("Connection closed...");
          // };

          // cordova.plugins.printer.print(crearComprobante());

          document.getElementById("txtNumeroDni").value = "88888888";
          document.getElementById("txtpagado").innerHTML = "";
          document.getElementById("txtvuelto").innerHTML = "";
          let Xcbodocventa = document.getElementById("cbodocventa");


          limpiarventa();
          document.getElementById("txtNumeroDni").value = "88888888";
          document.getElementById("txtpagado").innerHTML = "";
          document.getElementById("txtvuelto").innerHTML = "";

          document.getElementById("txtdocumentoventa").innerText = Xcbodocventa.options[Xcbodocventa.selectedIndex].text;

          limpiarventa();
          if (localStorage.getItem("gstoken") == "7777767") {

            let combovendedor = document.getElementById("cbousuariologin");
            var opts = combovendedor.options;
            for (var opt, j = 0; opt = opts[j]; j++) {
              if (opt.text == "Seleccione") {
                combovendedor.selectedIndex = j;
                let datosapp = "";
                localStorage.setItem("nombrevendedor", opt.text);
                datosapp = "caja : " + localStorage.getItem("nombrecaja") + "|";
                datosapp += "vendedor : " + localStorage.getItem("nombrevendedor") + "|";
                datosapp += "almacen : " + localStorage.getItem("nombrealmacen") + "|";
                datosapp += "ticketera : " + localStorage.getItem("nombreticketera");
                document.getElementById("txtdatos").innerText = datosapp;
                break;
              }
            }
          }

        }
        else {
          alert("Datos incorrectos llegaron al servidor , enviar captura a videosvencor@gmail.com")
          element.classList.remove("d-none");
        }


      })
      .catch((error) => {
        alert("Revisar conexión internet(INESTABLE)" + error)
        element.classList.remove("d-none");
      })

  } else {
    iziToast.info({
      title: 'Información',
      message: 'Por favor realizar el pago para concretar la venta!',
    });
  }
  var selectElement = document.getElementById('cbotipopago');
            
        // Establecer el valor predeterminado
        selectElement.value = 'EFECTIVO|0.00||';
});

function crearComprobante(documentoEmitido) {
  let detalle = "";
  debugger;
  for (const data of documentoEmitido.DetalleComprobante) {
    detalle += `
  <tr>
  <td class="cantidad">'${data.NCANTIDAD}'</td>
  <td class="producto">'${data.CPRODUCTODESC}'</td>
  <td class="precio">'${data.NVAL_UNI}'</td>
  </tr>`;
  }
  let htmlcadena = `
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
</head>

<body>
    <div class="ticket">
        <img src="logo.jpeg"
            alt="Logotipo">
            <p class="centrado " style="font-weight: bold;" id="lblEmpresa">Empresa Prueba S.A.C</p>
            <p class="centrado " style="font-weight: bold;" id="lblEmpresa">av marañon cdra 4 ,cel : 988970850</p>
        <h4 style="text-align: center; font-weight: bold;" id="lblserienumero">F001-1</h5>
            <div class="row">
                <span id="lblfecha">Fecha : 23/08/2017</span>
                <span id="lblcliente">Cliente :`+ documentoEmitido.CNOMBRECLIENTE + `</span>
                <span id="lblnrodoc">Nro doc : `+ documentoEmitido.CNUMDOCCLIENTE + `</span>
                <span id="lblvendedor">Vendedor : `+ localStorage.getItem("gsUsuarioCaja") + `</span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th class="cantidad">CANT</th>
                        <th class="producto">PRODUCTO</th>
                        <th class="precio">S/</th>
                    </tr>
                </thead>
                <tbody id="tbodydetalleproductoticket">
                '${detalle}'
                </tbody>
            </table>
            <div class="centrado">
                <div class="row">
                    <img style="width: 150px;" src="https://latam.kaspersky.com/content/es-mx/images/repository/isc/2020/9910/a-guide-to-qr-codes-and-how-to-scan-qr-codes-2.png" alt="">
                    <span>Subtotal : S/`+ parseFloat(documentoEmitido.NTOTALBRUTO).toFixed(2) + ` DetalleComprobante </span>
                    <span>Igv : S/`+ parseFloat(documentoEmitido.NTOTALIGV).toFixed(2) + `</span>
                    <span>Total : S/`+ parseFloat(documentoEmitido.NTOTAL).toFixed(2) + ` </span>
                    <span>Pagado : S/`+ documentoEmitido.PagoCabs[0].NPAGOTOTAL + `</span>
                    <span>Vuelto : S/`+ documentoEmitido.PagoCabs[0].NVUELTO + ` </span>
                </div>
                <span>Ingresar a la página www.cenfelecsolutions.com/comprobantes</span> 
            </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ"
        crossorigin="anonymous"></script>
</body>

</html>

`;

  return htmlcadena;
}
var stringToHTML = function (str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, 'text/html');
  return doc.body;
};
function scan() {
  console.log("clicked");
  cordova.plugins.barcodeScanner.scan(function (result) {
    if (result.text.length > 0) {
      peticion.BuscarCodigoDeBarra(uribase, localStorage.getItem("gstoken").toString(), 1, result.text)
    }

  }, function (error) {
    //error callback
    alert(JSON.stringify(error));
  }, {
    preferFrontCamera: false, // iOS and Android
    showFlipCameraButton: true, // iOS and Android
    showTorchButton: true, // iOS and Android
    torchOn: true, // Android, launch with the torch switched on (if available)
    saveHistory: true, // Android, save scan history (default false)
    prompt: "Por favor escanear el código de barras o QR", // Android
    //resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    //formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
    orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
    disableAnimations: true, // iOS
    disableSuccessBeep: false // iOS and Android
  });

}


document.getElementById("txtpreioventa").onkeyup = (e) => {
  let precio = e.target.value; //user enetered 
  let txtcantidad = document.getElementById("txtcantidad").value;
  let txttotalproducto = document.getElementById("txttotalproducto");
  txttotalproducto.value = (parseFloat(txtcantidad).toFixed(2) * parseFloat(precio).toFixed(2)).toFixed(2);
}
document.getElementById("txtcantidad").onkeyup = (e) => {
  let txtcantidad = e.target.value; //user enetered 
  let txtpreioventa = document.getElementById("txtpreioventa").value;
  let txttotalproducto = document.getElementById("txttotalproducto");
  txttotalproducto.value = (parseFloat(txtcantidad).toFixed(2) * parseFloat(txtpreioventa).toFixed(2)).toFixed(2);
}

document.getElementById("btnactualizaroculto").addEventListener("click", (e) => {
  ListarPreciosTodos(uribase, localStorage.getItem("gstoken").toString());
});


document.getElementById("btnactualizar").addEventListener("click", (e) => {
  // ListarPrecios(uribase,localStorage.getItem("gstoken").toString());
  ListarPreciosTodos(uribase, localStorage.getItem("gstoken").toString());

  var element = document.getElementById("btnemitircard");
  element.classList.remove("d-none");
  alert("Datos actualizados")
  document.getElementById("txtbuscarproducto").value = "";
  var element = document.getElementById("search-inputtext");
  element.classList.remove("active");
  createModal();
});

function createModal() {
  // Crear el contenedor del modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  // Crear el contenido del modal
  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = 'white';
  modalContent.style.padding = '20px';
  modalContent.style.borderRadius = '5px';
  modalContent.style.width = '90%';
  modalContent.style.maxWidth = '700px';

  // Crear la etiqueta <pre> con contenido Lorem Ipsum
  let pre = document.createElement('pre');

  let mytoken = localStorage.getItem("gsempresaglobal");
  let prod =document.getElementById("txtNombreProductoinevntorysearch");
  var raw = JSON.stringify({
      "token": mytoken,
      "procedure": "SPCIERRECAJAWEB",
      "parametros": localStorage.getItem("nombrevendedor")
  });
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
   let txtcierrecaja="";
   let mitotal=0;
  fetch(uribaseReal + "EjecutarVendey", requestOptions)
      .then(response => response.json())
      .then(result => {
          let lista = result.Rpta.split("¬");
          var nCampos = lista.length;
          let col = [];
          let j = 0;

          let tipopago="";
          let monto=0;
          let cierrecajaarr=[];

          for (j = 0; j < nCampos; j++) {
              col = lista[j].split("|");
              debugger
              if (col[0].length>0) {
                cierrecajaarr.push({ tipopago: col[0], monto: parseFloat(col[1])});
                mitotal+=parseFloat(col[1]);
                  // tipopago=col[0];
                  // monto=parseFloat(col[1]);
                  // txtcierrecaja+=`Tipo de Pago : ${tipopago} \nMonto : ${monto}\n`;
                  // txtcierrecaja+=`***********************************\n`
              }
              // this.cierrecajaarr.push({ nombrevend: col[0], tipopago: col[1], vendedor: col[2]});
          }
          let yape=0;
          let efectivo=0;
          let visa=0;
          cierrecajaarr.forEach(elm => {
            debugger
            switch (elm.tipopago) {
              case "EFECTIVO - CONTADO":
                efectivo+=elm.monto;
                break;
              case "VISA":
                visa+=elm.monto;  
              break;
              case "YAPE":
                yape+=elm.monto;
                break;
            }
          });
          if (yape>0) {
                  txtcierrecaja+=`Tipo de Pago : YAPE \nMonto : ${yape}\n`;
                  txtcierrecaja+=`***********************************\n`
            }
          if (efectivo>0) {  
                  txtcierrecaja+=`Tipo de Pago : EFECTIVO - CONTADO \nMonto : ${efectivo}\n`;
                  txtcierrecaja+=`***********************************\n`
          }
          if (visa>0) {
                  txtcierrecaja+=`Tipo de Pago : VISA \nMonto : ${visa}\n`;
                  txtcierrecaja+=`***********************************\n`
          }


          let mybody=`Cierre de caja : ${localStorage.getItem("nombrecaja")}
Usuario : ${localStorage.getItem("nombrevendedor")} 
Almacen : ${localStorage.getItem("nombrealmacen")}
Fecha y hora : ${new Date().toLocaleString()}
-----------------------------------------
TOTAL VENTAS : ${mitotal}
-----------------------------------------
${txtcierrecaja}`
          ;
        

          pre.textContent =mybody 
          
          // Crear el botón de cerrar
          const closeButton = document.createElement('button');
          closeButton.textContent = 'Cerrar';
          closeButton.style.marginRight = '10px';
          closeButton.onclick = () => {
            document.body.removeChild(modal);
          };
        
          // Crear el botón de imprimir
          const printButton = document.createElement('button');
          printButton.textContent = 'Imprimir';
          printButton.onclick = () => {
          window.print();
            //   var options = {
          //     documentSize: 'A4',
          //     type: "share",         //Open a context menu and ask the user what to do next (print, mail, etc..).
          //     fileName: "cierredecaja.pdf" //it will use this filename as a place-holder
          // }
         

          // pdf.fromData( '<pre>'+pre.textContent+'</pre>', options)
          // .then((stats)=> console.log('status', stats) )   // ok..., ok if it was able to handle the file to the OS.  
          // .catch((err)=>{
          //   alert(err)

          // })
           
          };
        
          // Añadir los elementos al contenido del modal
          modalContent.appendChild(pre);
          modalContent.appendChild(closeButton);
          modalContent.appendChild(printButton);
        
          // Añadir el contenido al contenedor del modal
          modal.appendChild(modalContent);
        
          // Añadir el modal al cuerpo del documento
          document.body.appendChild(modal);
      })
      .catch(error => console.log('error', error));

 
}


// document.getElementById("btnBuscarInventoryProdOficial").addEventListener("click", (e) => {
//   BuscarInventoryProdOficial();
// });


ListarFamilias(localStorage.getItem("gstoken").toString());
document.getElementById("cbofamilia").onchange = function () {
  ListarPrecios(uribase, localStorage.getItem("gstoken").toString());
}
document.getElementById("cbofamilia").onchange = function () {
  ListarPrecios(uribase, localStorage.getItem("gstoken").toString());
}

function ListarFamilias(token) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "token": token
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  const ui = new UI();
  fetch(uribase + "ListarFamiliasnew", requestOptions)
    .then(response => response.json())
    .then(result => {

      ui.addFamilias(result);

    })
    .catch(error => console.log('error', error));
}


function ListarPrecios(uribase, token) {
  if (localStorage.getItem("ListaFamilias")) {
    console.log("tenemos familias")
  } else {

    ListarFamilias(token);
    ListarPrecios(uribase, token);
    return;
  }

  var select = document.getElementById('cbofamilia');
  var strUser = select.options[select.selectedIndex].value;


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "token": token,
    "NCODFAMILIA": strUser
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  const ui = new UI();
  fetch(uribase+ "ListasDePrecionew", requestOptions)
    .then(response => response.json())
    .then(result => {
      ui.addListaPrecio(result);

      var listaProductos = JSON.parse(result.Rpta);
      var listaProductosConPrecio = listaProductos[0].ListaPrecioDets;
      listaProductos.forEach(element => {
        let contado = 0;
        if (contado == 0) {
          // listaProductosConPrecio = element.ListaPrecioDets;
          //       inputBox.onkeyup = (e) => {
          //         let userData = e.target.value; //user enetered data
          //         let emptyArray = [];
          //         if (true) {
          //           // icon.onclick = () => {
          //           //   // webLink = "https://www.google.com/search?q=" + userData;
          //           //   // linkTag.setAttribute("href", webLink);
          //           //   // console.log(webLink);
          //           //   // linkTag.click();
          //           // }
          //           // emptyArray = suggestions.filter((data)=>{
          //           //     //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
          //           //     return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
          //           // });

          //           emptyArray = listaProductosConPrecio.filter(function (el) {
          //             return el.CPRODUCTODESC.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
          //           });
          // let contadoritems=0;
          //       let    regemptyArray = emptyArray.map((data) => {
          //             contadoritems+=1;
          //             // passing return data inside li tag
          //             if (contadoritems<=30) {
          //               return data = `<li data-bs-toggle="" data-bs-target="#staticBackdrop" ncodproducto='${data.NCODPRODUCTO}' name='${data.NPRECIO}'>${data.CPRODUCTODESC}</li>`;
          //             }
          //           });
          //           searchWrapper.classList.add("active"); //show autocomplete box


          //           let listData='';
          //           if (regemptyArray) {

          //             // if (emptyArray.length) {
          //             // let  userValue = inputBox.value;
          //             //   listData = '<li name=' + inputBox.name + '>' + userValue + '</li>';
          //             // } else {
          //             // }
          //             listData = regemptyArray.join('');
          //           }
          //           suggBox.innerHTML = listData;
          //           // showSuggestions(emptyArray);
          //           // let allList = suggBox.querySelectorAll("li");
          //           const buttons = suggBox.querySelectorAll("li")
          //           for (const button of buttons) {
          //             button.addEventListener('click', function (_e) {
          //               let selectData = button.textContent;
          //               inputBox.value = selectData;
          //               let button_s = document.getel
          //               console.log("id " + button.getAttribute("name"));

          //               // icon.onclick = ()=>{
          //               //     // webLink = "https://www.google.com/search?q=" + selectData;
          //               //     // linkTag.setAttribute("href", webLink);
          //               //     // linkTag.click();
          //               // }
          //               searchWrapper.classList.remove("active");

          //               var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
          //               myModal.show()

          //               let cboListaPrecio = document.getElementById("cboListaPrecio");
          //               var opts = cboListaPrecio.options;
          //               for (var opt, j = 0; opt = opts[j]; j++) {
          //                 if (opt.text.toLocaleLowerCase() == "por menor") {
          //                   cboListaPrecio.selectedIndex = j;
          //                   break;
          //                 }
          //               }
          //               document.getElementById("txtpreioventa").value=button.getAttribute("name");
          //               document.getElementById("txtNombreProducto").setAttribute("ncodproducto",button.getAttribute("ncodproducto"));
          //               document.getElementById("txtNombreProducto").value=selectData;
          //               document.getElementById("txtcantidad").value=1;
          //               document.getElementById("txttotalproducto").value=button.getAttribute("name");

          //             })
          //           }
          //         } else {
          //           searchWrapper.classList.remove("active"); //hide autocomplete box
          //         }
          //       }
          if (element.ListaPrecioDets) {
            const fragment = document.createDocumentFragment();
            let cant = 0;
            let misproductos="";
            document.getElementById("product-form").innerHTML = "";
            for (const prodItem of element.ListaPrecioDets) {
              const product = new Product(prodItem.NCODPRODUCTO, "", prodItem.CPRODUCTODESC, 1, parseFloat(prodItem.NPRECIO).toFixed(2), 0, 0, prodItem.NPRECIO,false,prodItem.COBSERVACIONES);
              const ui = new UI();
              ui.addProductCard(product, fragment);
              cant += 1;
              misproductos+=prodItem.NCODPRODUCTO+","
            }
            console.log('total cards ' + cant,misproductos);
            cardproductList.appendChild(fragment)
          }



        }
        contado += 1;


      });
    })
    .catch(error => console.log('error', error));


}

function ListarPreciosTodos(uribase, token) {

  var select = document.getElementById('cbofamilia');
  var strUser = select.options[select.selectedIndex].value;

  console.log("rpta todos")
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "token": token,
    "NCODFAMILIA": 0
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  const ui = new UI();
  fetch(uribase + "ListasDePrecionew", requestOptions)
    .then(response => response.json())
    .then(result => {
      let rpta_new = JSON.parse(result.Rpta);
      ui.addListaPrecio(result);
      if (rpta_new) {

        var listaProductos = rpta_new;
        var listaProductosConPrecio = listaProductos[0].ListaPrecioDets;
        localStorage.setItem("productos",JSON.stringify(listaProductosConPrecio));
        listaProductos.forEach(element => {
          let contado = 0;
          if (contado == 0) {
            // listaProductosConPrecio = element.ListaPrecioDets;
            inputBox.onkeyup = (e) => {
              let userData = e.target.value; //user enetered data
              let emptyArray = [];
              if (true) {
                // icon.onclick = () => {
                //   // webLink = "https://www.google.com/search?q=" + userData;
                //   // linkTag.setAttribute("href", webLink);
                //   // console.log(webLink);
                //   // linkTag.click();
                // }
                // emptyArray = suggestions.filter((data)=>{
                //     //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
                //     return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
                // });

                emptyArray = listaProductosConPrecio.filter(function (el) {
                  return el.CPRODUCTODESC.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                });
                let contadoritems = 0;
                let regemptyArray = emptyArray.map((data) => {
                  contadoritems += 1;
                  // passing return data inside li tag
                  if (contadoritems <= 30) {
                    return data = `<li data-bs-toggle="" ${(data.COBSERVACIONES.includes('ocupado') ? 'style="color:red"' : "")}  data-bs-target="#staticBackdrop" ncodproducto='${data.NCODPRODUCTO}' name='${parseFloat(data.NPRECIO).toFixed(2)}'>${data.CPRODUCTODESC}</li>`;
                  }
                });
                searchWrapper.classList.add("active"); //show autocomplete box


                let listData = '';
                if (regemptyArray) {

                  // if (emptyArray.length) {
                  // let  userValue = inputBox.value;
                  //   listData = '<li name=' + inputBox.name + '>' + userValue + '</li>';
                  // } else {
                  // }
                  listData = regemptyArray.join('');
                }
                suggBox.innerHTML = listData;
                // showSuggestions(emptyArray);
                // let allList = suggBox.querySelectorAll("li");
                const buttons = suggBox.querySelectorAll("li")
                for (const button of buttons) {
                  button.addEventListener('click', function (_e) {
                    let selectData = button.textContent;
                    inputBox.value = selectData;
                    let button_s = document.getel
                    console.log("id " + button.getAttribute("name"));

                    // icon.onclick = ()=>{
                    //     // webLink = "https://www.google.com/search?q=" + selectData;
                    //     // linkTag.setAttribute("href", webLink);
                    //     // linkTag.click();
                    // }
                    searchWrapper.classList.remove("active");

                    var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
                    myModal.show()

                    let cboListaPrecio = document.getElementById("cboListaPrecio");
                    var opts = cboListaPrecio.options;
                    for (var opt, j = 0; opt = opts[j]; j++) {
                      if (opt.text.toLocaleLowerCase() == "por menor") {
                        cboListaPrecio.selectedIndex = j;
                        break;
                      }
                    }
                    document.getElementById("txtpreioventa").value = button.getAttribute("name");
                    document.getElementById("txtNombreProducto").setAttribute("ncodproducto", button.getAttribute("ncodproducto"));
                    document.getElementById("txtNombreProducto").value = selectData;
                    document.getElementById("txtNombreProducto").setAttribute('readonly', true);
                    debugger
                    if (selectData == "producto servicio") {
                      document.getElementById('txtNombreProducto').removeAttribute('readonly');
                    }
                    document.getElementById("txtcantidad").value = 1;
                    document.getElementById("txttotalproducto").value = button.getAttribute("name");



                    let midivoculto = document.getElementById("habilitar");
                    midivoculto.classList.add("d-none");
                    console.log("evaluando");
                    if (document.getElementById("txtNombreProducto").value.toLowerCase().includes("habi")) {
                      midivoculto.classList.remove("d-none");
                      var raw2 = JSON.stringify({
                        "token": localStorage.getItem("gstoken").toString(),
                        "procedure": "spverestadohabitacion",
                        "parametros": button.getAttribute("ncodproducto") + "|" + 0 + "|"
                      });
                      var myHeaders2 = new Headers();
                      myHeaders2.append("Content-Type", "application/json");
                      var requestOptions2 = {
                        method: 'POST',
                        headers: myHeaders2,
                        body: raw2,
                        redirect: 'follow'
                      };
                      fetch(uribase+"EjecutarVendey", requestOptions2)
                        .then(response => response.json())
                        .then(result => {
                          let checknuevo = document.getElementById("chkhabilitado");
                          if (result.Rpta.length > 0) {
                            checknuevo.checked = false;
                          } else {
                            checknuevo.checked = true;
                          }
                          ActualizarProd();
                        })
                    }

                  })
                }
              } else {
                searchWrapper.classList.remove("active"); //hide autocomplete box
              }
            }
            // if (element.ListaPrecioDets) {
            // const fragment= document.createDocumentFragment(); 
            //   let cant=0;
            //   for (const prodItem of element.ListaPrecioDets) {
            //     const product = new Product(prodItem.NCODPRODUCTO, "", prodItem.CPRODUCTODESC, 1, prodItem.NPRECIO, 0, 0,  prodItem.NPRECIO);
            //     const ui = new UI();
            //     ui.addProductCard(product,fragment);
            //     cant+=1;
            //   }
            //   console.log('total cards '+cant);
            // cardproductList.appendChild(fragment)
            // }



          }
          contado += 1;


        });
      }
    })
    .catch(error => console.log('error', error));


}
ListarPreciosTodos(uribase, localStorage.getItem("gstoken").toString());


function showSuggestions(list) {
  let listData = '';
  if (list) {

    if (list.length) {
      userValue = inputBox.value;
      listData = '<li name=' + inputBox.name + '>' + userValue + '</li>';
    } else {
      listData = list.join('');
    }
  }
  suggBox.innerHTML = listData;
}

function pordefecto() {

  if (localStorage.getItem("gstoken") == "7777767") {

    let combovendedor = document.getElementById("cbousuariologin");
    var opts = combovendedor.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      if (opt.text == "Seleccione") {
        combovendedor.selectedIndex = j;
        let datosapp = "";
        localStorage.setItem("nombrevendedor", opt.text);
        datosapp = "caja : " + localStorage.getItem("nombrecaja") + "|";
        datosapp += "vendedor : " + localStorage.getItem("nombrevendedor") + "|";
        datosapp += "almacen : " + localStorage.getItem("nombrealmacen") + "|";
        datosapp += "ticketera : " + localStorage.getItem("nombreticketera");
        document.getElementById("txtdatos").innerText = datosapp;
        break;
      }
    }
  }

  let userData = "88888888"; //user enetered data
  console.log(userData);
  let cbodoccliente = document.getElementById("cbodoccliente");
  let cbodocventa = document.getElementById("cbodocventa");
  document.getElementById("txtNumeroDni").value = "88888888";
  document.getElementById("txtpagado").innerHTML = "";
  document.getElementById("txtvuelto").innerHTML = "";
  let Xcbodocventa = document.getElementById("cbodocventa");

  document.getElementById("txtNumeroDni").value = "88888888";
  document.getElementById("txtpagado").innerHTML = "";
  document.getElementById("txtvuelto").innerHTML = "";

  document.getElementById("txtdocumentoventa").innerText = Xcbodocventa.options[Xcbodocventa.selectedIndex].text;

  if (userData.length == 8) {
    var opts = cbodoccliente.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      if (opt.text == "DNI") {
        cbodoccliente.selectedIndex = j;
        break;
      }
    }
    var opts = cbodocventa.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      if (opt.text == "TICKET NOTA DE VENTA") {
        cbodocventa.selectedIndex = j;
        break;
      }
    }
    ConsultaDni(userData);
    document.getElementById("btncomprobanteaceptar").click();

  } else if (userData.length == 11) {
    var opts = cbodoccliente.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      if (opt.text == "RUC") {
        cbodoccliente.selectedIndex = j;
        break;
      }
    }
    var opts = cbodocventa.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      if (opt.text == "FACTURA") {
        cbodocventa.selectedIndex = j;
        break;
      }
    }
    ConsultaDni(userData);
  } else {
    let mirazon = document.getElementById("txtrazonsocial");
    mirazon.value = "";
  }

}
pordefecto();


let datosapp = "";

datosapp = "caja : " + localStorage.getItem("nombrecaja") + "|";
datosapp += "vendedor : " + localStorage.getItem("nombrevendedor") + "|";
datosapp += "almacen : " + localStorage.getItem("nombrealmacen") + "|";
datosapp += "ticketera : " + localStorage.getItem("nombreticketera");
document.getElementById("txtdatos").innerText = datosapp;
if (localStorage.getItem("gsmac").toString().includes(":") == false) {
  var element = document.getElementById("connectButton");
  element.classList.add("d-none");

}


let portbluetooh=0;
let macbluetooh="";
document.getElementById("connectButton").addEventListener("click", (e) => {
try {
  let cboticketera = document.getElementById("cboticketera");
      console.log("revisar ", (cboticketera.options[cboticketera.selectedIndex]).value)

  localStorage.setItem("gsmac",(cboticketera.options[cboticketera.selectedIndex]).value)
  var app = {
    macAddress:localStorage.getItem("gsmac"),  // get your mac address from bluetoothSerial.list
    chars: "",
  
  /*
    Application constructor
  */
    initialize: function() {
        this.bindEvents();
        console.log("Starting SimpleSerial app");
    },
  /*
    bind any events that are required on startup to listeners:
  */
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        connectButton.addEventListener('touchend', app.manageConnection, false);
    },
    
  
  
  /*
    this runs when the device is ready for user interaction:
  */
    onDeviceReady: function() {
        // check to see if Bluetooth is turned on.
        // this function is called only
        //if isEnabled(), below, returns success:
        var listPorts = function() {
            // list the available BT ports:
            bluetoothSerial.list(
                function(results) {
                    app.display(JSON.stringify(results));
                },
                function(error) {
                    app.display(JSON.stringify(error));
                }
            );
        }
  
        // if isEnabled returns failure, this function is called:
        var notEnabled = function() {
            app.display("Bluetooth is not enabled.")
        }
  
         // check if Bluetooth is on:
        bluetoothSerial.isEnabled(
            listPorts,
            notEnabled
        );
    },
  /*
    Connects if not connected, and disconnects if connected:
  */
    manageConnection: function() {
  
        // connect() will get called only if isConnected() (below)
        // returns failure. In other words, if not connected, then connect:
        var connect = function () {
            // if not connected, do this:
            // clear the screen and display an attempt to connect
            app.clear();
            app.display("Attempting to connect. " +
                "Make sure the serial port is open on the target device.");
            // attempt to connect:
            bluetoothSerial.connect(
                app.macAddress,  // device to connect to
                app.openPort,    // start listening if you succeed
                app.showError    // show the error if you fail
            );
        };
  
        // disconnect() will get called only if isConnected() (below)
        // returns success  In other words, if  connected, then disconnect:
        var disconnect = function () {
            app.display("attempting to disconnect");
            // if connected, do this:
            bluetoothSerial.disconnect(
                app.closePort,     // stop listening to the port
                app.showError      // show the error if you fail
            );
        };
  
        // here's the real action of the manageConnection function:
        bluetoothSerial.isConnected(disconnect, connect);
    },
  /*
    subscribes to a Bluetooth serial listener for newline
    and changes the button:
  */
    openPort: function() {
        // if you get a good Bluetooth serial connection:
        app.display("Connected to: " + app.macAddress);
        // change the button's name:
        connectButton.innerHTML = "Disconnect";
        // set up a listener to listen for newlines
        // and display any new data that's come in since
        // the last newline:
        bluetoothSerial.subscribe('\n', function (data) {
            app.clear();
            app.display(data);
        });
    },
  
  /*
    unsubscribes from any Bluetooth serial listener and changes the button:
  */
    closePort: function() {
        // if you get a good Bluetooth serial connection:
        app.display("Disconnected from: " + app.macAddress);
        // change the button's name:
        connectButton.innerHTML = "Connect";
        // unsubscribe from listening:
        bluetoothSerial.unsubscribe(
                function (data) {
                    app.display(data);
                },
                app.showError
        );
    },
  /*
    appends @error to the message div:
  */
    showError: function(error) {
        app.display(error);
    },
  
  /*
    appends @message to the message div:
  */
    display: function(message) {
        var display = document.getElementById("message"), // the message div
            lineBreak = document.createElement("br"),     // a line break
            label = document.createTextNode(message);     // create the label
  
        display.appendChild(lineBreak);          // add a line break
        display.appendChild(label); 
                  // add the message node
    },
  /*
    clears the message div:
  */
    clear: function() {
        var display = document.getElementById("message");
        display.innerHTML = "";
    }
  };      // e
  app.initialize();

} catch (error) {
  alert("Error de conexión "+error)
}


});

cbolistarticketeras.addEventListener("click", (e) => {
  bluetoothSerial.list(function (devices) {
    // Iterar sobre los dispositivos encontrados
    let ticketeras = "";
    devices.forEach(function (device) {
      // Filtrar los dispositivos que parezcan ser impresoras térmicas Bluetooth
      if (device.class === 1664) {
        console.log('Impresora encontrada: ' + device.name);
        console.log('Dirección: ' + device.address);
        ticketeras += `<option value="${device.address}">${device.name}</option>`
      }
    });
    if (ticketeras.length > 0) {
      document.getElementById("cboticketera").innerHTML = ticketeras;
    }
  });
});




var checkbox = document.querySelector("input[name=chkhabilitado]");

checkbox.addEventListener('change', function () {
  let link = document.querySelector('#txtNombreProducto');
  let ncodproductosearc = 0;
  let estaocupado = 0;

  if (this.checked) {

    document.getElementById('lblchkhabilitado').innerHTML = 'Habitación libre';
    console.log("Checkbox is checked..");
  } else {
    estaocupado = 1;
    document.getElementById('lblchkhabilitado').innerHTML = 'Habitación ocupada';
    console.log("Checkbox is not checked..");
  }
  if (link) {
    let ncodproductosearc = link.getAttribute('ncodproducto');
    console.log(ncodproductosearc);
    var raw2 = JSON.stringify({
      "token": localStorage.getItem("gstoken").toString(),
      "procedure": "sphabilitarprod",
      "parametros": ncodproductosearc + "|" + estaocupado + "|"
    });
    var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");
    var requestOptions2 = {
      method: 'POST',
      headers: myHeaders2,
      body: raw2,
      redirect: 'follow'
    };
    fetch(uribase+"EjecutarVendey", requestOptions2)
      .then(response => response.json())
      .then(result => {
        ListarPreciosTodos(uribase, localStorage.getItem("gstoken").toString());

      })
  }

});

function ActualizarProd() {
  var checkbox = document.querySelector("input[name=chkhabilitado]");

  let link = document.querySelector('#txtNombreProducto');
  let ncodproductosearc = 0;
  let estaocupado = 0;

  if (checkbox.checked) {

    document.getElementById('lblchkhabilitado').innerHTML = 'Habitación libre';
    console.log("Checkbox is checked..");
  } else {
    estaocupado = 1;
    document.getElementById('lblchkhabilitado').innerHTML = 'Habitación ocupada';
    console.log("Checkbox is not checked..");
  }
  if (link) {
    let ncodproductosearc = link.getAttribute('ncodproducto');
    console.log(ncodproductosearc);
    var raw2 = JSON.stringify({
      "token": localStorage.getItem("gstoken").toString(),
      "procedure": "sphabilitarprod",
      "parametros": ncodproductosearc + "|" + estaocupado + "|"
    });
    var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");
    var requestOptions2 = {
      method: 'POST',
      headers: myHeaders2,
      body: raw2,
      redirect: 'follow'
    };
    fetch(uribase+"EjecutarVendey", requestOptions2)
      .then(response => response.json())
      .then(result => {
        ListarPreciosTodos(uribase, localStorage.getItem("gstoken").toString());

      })
  }
}


function BuscarInventoryProdOficial() {

  let mytoken = localStorage.getItem("gsempresaglobal");
  var raw = JSON.stringify({
    "token": mytoken,
    "procedure": "spbuscarproductocsvapp",
    "parametros": "@NCODPRODUCTO" + document.querySelector("#txtcodprodinventory").value + "|@CPRODUCTODESC" + document.querySelector("#txtNombreProductoinevntory").value
  });
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  let thiss = this;
  // this.productoencontrado = [];
  fetch(uribaseReal + "EjecutarVendey", requestOptions)
    .then(response => response.json())
    .then(result => {
      let lista = result.Rpta.split("¬");
      var nCampos = lista.length;
      var col = [];
      let j = 0;
      for (j = 0; j < nCampos; j++) {
        col = lista[j].split("|");
        if (col.length > 0) {

          document.getElementById("txtcodprodinventory").value = col[0];
          document.getElementById("txtcodprodinternoinventory").value = col[1];
          document.getElementById("txtNombreProductoinevntory").value = col[2];
          // document.querySelector("#cbotipomovinventory").value=col[6];
          break;
        }
      }
    })
    .catch(error => console.log('error', error));
}
document.addEventListener("DOMContentLoaded", function() {
  // Obtener el botón por su ID
  var btnPagar = document.getElementById('btnpagarModal');

  // Agregar un event listener para el evento 'click'
  btnPagar.addEventListener('click', function() {
      // Acción a realizar cuando se hace clic en el botón
      var selectElement = document.getElementById('cbotipopago');
            
// Establecer el valor predeterminado
selectElement.value = 'EFECTIVO|0.00||';
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('txtNombreProductoinevntory');
  const autocompleteList = document.getElementById('autocomplete-list');
  const codProdInput = document.getElementById('txtcodprodinventory');
  const txtnprecio = document.getElementById('txtprecioinventory');

  input.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      autocompleteList.innerHTML = '';

      if (!query) return;

      const productos = JSON.parse(localStorage.getItem('productos')) || [];

      const filteredProductos = productos.filter(producto => 
          producto.CPRODUCTODESC.toLowerCase().includes(query)
      );

      filteredProductos.forEach(producto => {
          const item = document.createElement('div');
          item.textContent = producto.CPRODUCTODESC;
          item.addEventListener('click', function() {
              input.value = producto.CPRODUCTODESC;
              codProdInput.value = producto.NCODPRODUCTO;
              txtnprecio.value = producto.NPRECIO;
              autocompleteList.innerHTML = '';
              document.getElementById("txtcantidadinventory").focus();
          });
          autocompleteList.appendChild(item);
      });
  });

  document.addEventListener('click', function(e) {
      if (e.target !== input) {
          autocompleteList.innerHTML = '';
      }
  });
});
document.getElementById('uploadButton').addEventListener('click', function(e) {
    
  e.preventDefault();
if (document.getElementById("txtcodprodinventory").value>0) {
  
  document.getElementById('imageInput').click();
}else{

  alert("Por favor llenar el campo código de producto")
  document.getElementById("txtcodprodinventory").focus();
}

});

document.getElementById('uploadButton2').addEventListener('click', function(e) {
    
  e.preventDefault();
  let ncodproducto = document.getElementById("txtNombreProducto").getAttribute("ncodproducto");
  document.getElementById("txtcodprodinventory").value=ncodproducto;
  document.getElementById('imageInput').click();
});


// document.getElementById("btnnuevo").addEventListener('change', function(e) {

//         const txtfechainventory = document.getElementById("txtfechainventory").value;
//         let txtcodprodinternoinventory = document.getElementById("txtcodprodinternoinventory").value;
//         let txtcantidadinventory = document.getElementById("txtcantidadinventory").value;
//         let txtprecioinventory = document.getElementById("txtprecioinventory").value;
//         let txtNombreProductoinevntory = document.getElementById("txtNombreProductoinevntory").value;
//         let cbotipomovinventory = document.getElementById("cbotipomovinventory").value;
//         let txtcodprodinventory = document.getElementById("txtcodprodinventory").value;
//         console.log(txtcodprodinventory)
//         console.log(txtcodprodinternoinventory)
//         console.log(txtcantidadinventory);
//         console.log(txtprecioinventory)
//         console.log(txtNombreProductoinevntory)
//         console.log(cbotipomovinventory)
//         if (txtcodprodinventory>0) {
//           var raw = JSON.stringify({
//             "token": localStorage.getItem("gsempresaglobal"),
//             "procedure": "spINVproductonuevo",
//             "parametros": txtcodprodinventory+"|"+txtcodprodinternoinventory+"|"+txtcantidadinventory+"|"+txtprecioinventory+'|'+txtNombreProductoinevntory+"|"+cbotipomovinventory+"|"+txtfechainventory});
//         var myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//         };

//         this.productoencontrado = [];
//         fetch(uribaseReal + "EjecutarVendey", requestOptions)
//             .then(response => response.json())
//             .then(result => {
//                 alert("producto nuevo");
//             })
//             .catch(error => console.log('error', error));
//         }else{
//           alert("Al ser un producto nuevo por favor borrar el código de producto")
//         }
        
// });
document.getElementById('imageInput').addEventListener('change', function(e) {
  e.preventDefault();
  const file = this.files[0];

  if (!file) {
      alert('Por favor, selecciona una imagen para subir.');
      return;
  }

  const formData = new FormData();
  formData.append('image', file);

  const apiKey = '5fe4096a939df6a89692dce90961a078'; // Reemplaza con tu API Key de imgbb.com
  fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
    let txtcodprodinventory=document.getElementById("txtcodprodinventory").value;
      if (data.success) {
          const imageUrl = data.data.url;
          var raw = JSON.stringify({
            "token": localStorage.getItem("gsempresaglobal"),
            "procedure": "spINVACTUALIZARIMAGENCSVWEB",
            "parametros": txtcodprodinventory+"|"+imageUrl});
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        this.productoencontrado = [];
        fetch(uribaseReal + "EjecutarVendey", requestOptions)
            .then(response => response.json())
            .then(result => {
                alert("imagen actualizada");
            })
            .catch(error => console.log('error', error));
          document.getElementById('uploadResult').innerHTML = `<p>Imagen subida exitosamente: <a href="${imageUrl}" target="_blank">${imageUrl}</a></p>`;
      } else {
          document.getElementById('uploadResult').innerHTML = `<p>Error al subir la imagen: ${data.error.message}</p>`;
      }
  })
  .catch(error => {
      document.getElementById('uploadResult').innerHTML = `<p>Error al subir la imagen: ${error.message}</p>`;
  });
});