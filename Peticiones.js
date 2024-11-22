// UI Constructor
import { UI } from "./UI.js";
import { Product } from "./Product.js";
const searchWrapper = document.querySelector(".search-input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const inputBox = searchWrapper.querySelector("input");
let linkTag = searchWrapper.querySelector("a");
export  class Peticiones {

    
    
      EmitirComprobante(uribase,token) {
        var myHeaders = new Headers();
        let cbodocventa= document.getElementById("cbodocventa");
        let cbodoccliente = document.getElementById("cbodoccliente");
        let nmro=document.getElementById("txtNumeroDni").value;
        let documentoventa=(cbodocventa.options[cbodocventa.selectedIndex].text=="BOLETA"?"BOLETA":"FACTURA");
        let CCODDOCUMENTOIMP ="01";
        if (documentoventa="BOLETA") {
          CCODDOCUMENTOIMP="03";
        }
      
        let DetalleComprobante=[];
        var cls = document.getElementById("tablaproductos").getElementsByTagName("td");
        let countrows=1;
        let ntotal=0;
        let ncantidad=0;
        let nigv=0;
        let nsubtotal=0;
        let nigvsubtotal=0;
        for (var i = 0; i < cls.length; i++){
          if(cls[i].className == "countable"){
            ntotal+= parseFloat(cls[i].getAttribute("ntotal"));
            ncantidad+= parseFloat(cls[i].getAttribute("ncantidad"));
            // ncodproducto="2" ncantidad="1" nprecio="0.000" ntotal="0.000" cproductodesc="ACEITE CIL FS CC 20LT 1BLD"
            nigvsubtotal=parseFloat(parseFloat(cls[i].getAttribute("ntotal"))/1.18);
      
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
              "NIGV": parseFloat(cls[i].getAttribute("ntotal"))-nigvsubtotal,
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
            countrows+=1;
            }
      
        }
      
        nsubtotal=parseFloat(ntotal)/1.18;
        nigv=parseFloat(ntotal)-nsubtotal;
        
        myHeaders.append("Content-Type", "application/json");
      
      let comprobantesalir=null;
      
        var raw = JSON.stringify({
          "token": token,
          "CCONEXION": "string",
          "NCODEMPRESA": 1,
          "NCODAGENCIA": 1,
          "NCODFACTURA": 0,
          "CCODDOCUMENTOIMP": (document.getElementById("cbodocventa").value=="01"?"1":"2"),
          "CSERFACTURA": "001",
          "CNUMFACTURA": "",
          "DFECHAFACTURA": "2021-10-04T14:14:23.386Z",
          "CCODCLIENTE": 3,
          "CNOMBRECLIENTE": document.getElementById("txtrazonsocial").value,
          "CCODDOCCLIENTE": document.getElementById("cbodoccliente").value,
          "CNUMDOCCLIENTE": document.getElementById("txtNumeroDni").value,
          "CCODSUCURSAL": "",
          "CCODVEHICULO": "",
          "CCODPEDIDO": "",
          "CCODPERIODO": "130",
          "CCODVENDEDOR": "18",
          "CCODALMACEN": "1",
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
          "COBSERVACIONES": "",
          "CUSERCREA": "admin",
          "DFECHACREA": "2021-10-04T14:14:23.386Z",
          "CUSERMODIFICA": "",
          "DFECHAMODIFICA": "2021-10-04T14:14:23.386Z",
          "CUSERELIMINA": "",
          "DFECHAELIMINA": "2021-10-04T14:14:23.386Z",
          "CLOCALHOST": "",
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
              "NPAGOTOTAL": document.getElementById("txtpagado").innerText.replace("S/",""),
              "NMONTOVENTA":ntotal,
              "NVUELTO":document.getElementById("txtvuelto").innerText.replace("Vuelto S/",''),
              "COBSERVACIONES": "0",
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
              "NCAJA": "34"
            }
          ]
        });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch(uribase+"Emitir", requestOptions)
        .then(response => response.json())
        .then(result =>{
      if (result.Exito) {

        let rptaapi=JSON.parse(result.Rpta)
        console.log(rptaapi);
        console.log("JOSE-"+rptaapi.NCODFACTURA);
        comprobantesalir= JSON.parse(result.Rpta);

        }
        
      })
      .catch(error => console.log('error', error));
    return comprobantesalir;
    }

      BuscarCodigoDeBarra(uribase,token,ncodempresa,codbar){

        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
          fetch(uribase+"BuscarCodBar?codbar="+codbar+"&ncodempresa="+ncodempresa+"&Token="+token, requestOptions)
            .then(response => response.json())
            .then(result =>{
        
              let myproduct = JSON.parse(result.Rpta);
              if (myproduct.NCODPRODUCTO) {
                var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
                myModal.show()
                document.getElementById("txtpreioventa").value=myproduct.NPRECIO;
                document.getElementById("txtNombreProducto").setAttribute("ncodproducto",myproduct.NCODPRODUCTO);
                document.getElementById("txtNombreProducto").value=myproduct.CPRODUCTODESC;
                document.getElementById("txtNombreProducto").setAttribute('readonly', true);
                debugger
                if (product.Nombre=="producto servicio") {
                  document.getElementById("txtNombreProducto").setAttribute('readonly', false);
                }  
                document.getElementById("txtcantidad").value=1;
                document.getElementById("txttotalproducto").value=myproduct.NPRECIO;
              }
        
            })
            .catch(error => console.log('error', error));
      }
   
      
}
