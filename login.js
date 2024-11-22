
// var uribase = "http://localhost:61869/Vendey/";

// var uribase = "http://localhost:8099/Vendey/";
// var uribase = "https://cenfelecsolutions.com/Vendey/";
var uribase = "https://www.cenfelecsolutions.com/Vendey/";
// https://cenfelecsolutions.com/

let nproducto = 0;
let LineasWebcsv = "";

localStorage.setItem("uribase", uribase);
const app8 = new Vue({
  el: '#app8',
  data: {
    Empresa: '',
    usuarios: [],
    almacenes: [],
    cajas: []
  }, beforeMount() {

    if (localStorage.getItem("gsempresaglobal")) {
      this.BuscarCajas(localStorage.getItem("gsempresaglobal"));
      this.BuscarUsuarios(localStorage.getItem("gsempresaglobal"));
      this.BuscarAlmacenes(localStorage.getItem("gsempresaglobal"));

    }
  },
  methods: {

    BuscarUsuarios(mytoken) {

      var raw = JSON.stringify({
        "token": mytoken,
        "procedure": "spVNT_UserCajacsvweb",
        "parametros": "1|1|"
      });
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "*");
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      this.usuarios = [];
      fetch(uribase + "EjecutarVendey", requestOptions)
        .then(response => response.json())
        .then(result => {
          let lista = result.Rpta.split("¬");
          var nCampos = lista.length;
          let col = [];
          let j = 1;
          for (j = 1; j < nCampos; j++) {
            col = lista[j].split("|");
            console.log(col[1]);
            this.usuarios.push({ ncodigo: col[0], cdescripcion: col[1] });
          }
        })
        .catch(error => console.log('error', error));
    },
    BuscarAlmacenes(mytoken) {
      var raw = JSON.stringify({
        "token": mytoken,
        "procedure": "spINV_ALMACENLISTACSVWEB",
        "parametros": "1|1|"
      });
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      this.almacenes = [];
      fetch(uribase + "EjecutarVendey", requestOptions)
        .then(response => response.json())
        .then(result => {
          let lista = result.Rpta.split("¬");
          var nCampos = lista.length;
          let col = [];
          let j = 1;
          for (j = 1; j < nCampos; j++) {
            col = lista[j].split("|");
            console.log(col[1]);
            this.almacenes.push({ ncodigo: col[0], cdescripcion: col[1] });
          }
        })
        .catch(error => console.log('error', error));
    },
    BuscarCajas(mytoken) {
      var raw = JSON.stringify({
        "token": mytoken,
        "procedure": "spCTA_CAJACOMBOCSVWEB",
        "parametros": "1|1|1|"
      });
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      this.cajas = [];
      fetch(uribase + "EjecutarVendey", requestOptions)
        .then(response => response.json())
        .then(result => {
          let lista = result.Rpta.split("¬");
          var nCampos = lista.length;
          let col = [];
          let j = 1;
          for (j = 1; j < nCampos; j++) {
            col = lista[j].split("|");
            console.log(col[1]);
            this.cajas.push({ ncodigo: col[0], cdescripcion: col[1] });
          }
        })
        .catch(error => console.log('error', error));
    },
    BuscarEmpresa() {
      var person = prompt("colocar empresa", "");
      const personToToken = {
        "jl": "7777767",
        "gas1": "1777717",
        "import1": "1277717",
        "saisactienda33": "7177777",
        "p1nturas": "31314747",
        "hot3lnew": "77771",
        "m4rt3": "12124777",
        "Tort4as": "777721214",
        "3tort4as": "777721213",
        "E1RL": "1222244777",
        "ES4AC": "1222244778",
        "du1c3snew": "12222447781",
        "unicach1": "unicach1",
        "Tort4soficial": "12123456",
      };

      let mytoken = personToToken[person];
      // localStorage.setItem("empresakey",person)
      if (mytoken.length > 0) {
        localStorage.setItem("gsempresaglobal", mytoken)
        this.BuscarCajas(mytoken);
        this.BuscarUsuarios(mytoken);
        this.BuscarAlmacenes(mytoken);
      }
    },
    IngresarSistema() {
      let cbousuariologin = document.getElementById('cbousuariologin');
      let cboalmacenlogin = document.getElementById('cboalmacenlogin');
      let txtcontrasenialogin = document.getElementById('txtcontrasenialogin').value;
      let cbocajalogin = document.getElementById('cbocajalogin');
      let numserie = document.getElementById("txtmac");

      localStorage.setItem("gsmac", numserie.value);
      localStorage.setItem("gstoken", localStorage.getItem("gsempresaglobal"));//Jose

      var txtcbousuariologin = cbousuariologin.options[cbousuariologin.selectedIndex].text;
      var txtcboalmacenlogin = cboalmacenlogin.options[cboalmacenlogin.selectedIndex].text;
      var txtcbocajalogin = cbocajalogin.options[cbocajalogin.selectedIndex].text;

      var codtxtcbousuariologin = cbousuariologin.options[cbousuariologin.selectedIndex].value;
      var codtxtcboalmacenlogin = cboalmacenlogin.options[cboalmacenlogin.selectedIndex].value;
      var codtxtcbocajalogin = cbocajalogin.options[cbocajalogin.selectedIndex].value;

      debugger
      if (localStorage.getItem("gsempresaglobal") == "7777767") {
        let rptapermitido = false;
        switch (txtcbocajalogin) {
          case "CAJA 1 - gav 1":
            if (codtxtcboalmacenlogin == "6") {
              rptapermitido = true;
            }
            break;
          case "CAJA 2":
            if (codtxtcboalmacenlogin == "5") {
              rptapermitido = true;
            }
            break;
          case "CAJA 3- gav 1":
            if (codtxtcboalmacenlogin == "8") {
              rptapermitido = true;
            }
            break;
        }
        if (!rptapermitido) {
          iziToast.info({
            title: 'Información',
            message: 'almacén no permitida!',
          });
          return;
        }
      }
      debugger
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "usuario": txtcbousuariologin,
        "password": txtcontrasenialogin,
        "vendedor": "",
        "empresa": "",
        "caja": codtxtcbocajalogin,
        "almacen": "",
        "token": localStorage.getItem("gstoken").toString()
      });



      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };




      document.getElementById('enlace').setAttribute('href', "#");

      fetch(uribase + "Login", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.Exito) {
            let rpta = JSON.parse(result.Rpta);
            iziToast.info({
              title: 'Información',
              message: 'Bienvenido' + txtcbousuariologin + ' !',
            });
            localStorage.setItem("gsCodigoVendedor", codtxtcbousuariologin);
            localStorage.setItem("gsNombreCaja", rpta.gsNombreCaja);
            localStorage.setItem("gsUsuarioCaja", rpta.gsUsuarioCaja);
            localStorage.setItem("gsNroCaja", rpta.gsNroCaja);
            localStorage.setItem("gsCod_Alma_Caja", codtxtcbocajalogin);
            localStorage.setItem("gsDesc_Alma_Caja", txtcboalmacenlogin);
            localStorage.setItem("gsCodAlmacen", codtxtcboalmacenlogin);

            localStorage.setItem("nombrecaja", txtcbocajalogin);
            localStorage.setItem("nombrevendedor", txtcbousuariologin);
            localStorage.setItem("nombrealmacen", txtcboalmacenlogin);
            localStorage.setItem("nombreticketera", numserie.value);

            document.getElementById('enlace').setAttribute('href', "vendey.html");
            document.getElementById('enlace').click();


          } else {
            iziToast.info({
              title: 'Información',
              message: 'Contraseña incorrecta!',
            });
          }


        })
        .catch(error => console.log('error', error));



      e.preventDefault();
    }
  }
});

if (localStorage.getItem("gsmac")) {
  document.getElementById("txtmac").value = localStorage.getItem("gsmac");
}


