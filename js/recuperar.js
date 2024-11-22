
var app = new Framework7({
    // App root element
    root: '#recuperar',
    // App Name
    name: 'KAMACHIX CONTROL',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [
        {
            path: '/about/',
            url: 'about.html',
        },
    ],
    // ... other parameters
});


var url = "https://cenfelecsolutions.com/Kamachixapi/Ejecutaraccion?myproc="

function post(url, callback) {

    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.response);
      }
    }
  
    xhr.open('POST', url, true);
    xhr.send('');
  }

function frecuperar() {
    var txtreruc = document.getElementById("txtreruc").value;
    var txtrecorreo = document.getElementById("txtrecorreo").value;


    if (txtreruc == "" || txtrecorreo == "") {
        alert('Se requiere completar todos los campos.');
    } else {
        var reemail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (reemail.test(txtrecorreo)) {
            
            var parametros =  txtrecorreo + "&myruc=" + txtreruc ;
            var newurl = "https://cenfelecsolutions.com/Kamachixapi/RecuperarContrasenia?mycorreo=" ;
            
            post(newurl+parametros, mensajereg)
            
        } else {
            app.dialog.alert("Solicitud no valida !!!");
        }


    }

}
function mensajereg(rpta) {
console.log(rpta);
    app.dialog.alert("Revise su bandeja de entrada, ah recibido un TOKEN.");
}

function fcancelar() {
    location.href = "index.html";
}
function fmensaje(rpta){
    app.dialog.alert(rpta);
    console.log(rpta);
}

function fnewpass() {
    debugger;
    var txttoken = document.getElementById("txttoken").value;
    var txtpass = document.getElementById("txtrepassword").value;
    var txtpassconfirm = document.getElementById("txtrepasswordconfirm").value;

    if (txtpass != txtpassconfirm) {
        document.getElementById("txtppassconfirm").focus();
        app.dialog.alert("Ingresa bien tu contraseña");
        
      } else {
        if (txttoken == "" || txtpass == "" || txtpassconfirm == "" ) {
                alert('Se requiere completar todos los campos.');
              } else {

                var parametros = "";
                parametros += "adm.spuser&parametros=@caccion='CambiarPass',@token='"+txttoken+"',@password='"+txtpass+"'";
                console.log(url+parametros);
                btnretorno = "notbtnback";
                post(url + parametros,fmensaje)//falta el callback
              }
      }


}
// function mensajereg(cmensaje) {

//     app.dialog.alert(cmensaje);
// }
