
var app = new Framework7({
    //     // App root element
    root: '#registro',
    //     // App Name
    name: 'KAMACHIX CONTROL',
    //     // App id
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

function fcancelar() {
    location.href = "index.html";
}


function fregistro() {
    var txtempresa = document.getElementById("txtempresa").value;
    var txtruc = document.getElementById("txtruc").value;
    var txtcorreo = document.getElementById("txtcorreo").value;
    var txtpassword = document.getElementById("txtpassword").value;
    var cbocar = document.getElementById("cbocar").value;
    var txtnom = document.getElementById("txtnom").value;
    var txtape = document.getElementById("txtape").value;
    var cbodoc = document.getElementById("cbodoc").value;
    var txtnum = document.getElementById("txtnum").value;
    var txtdir = document.getElementById("txtdir").value;
    var txtcel = document.getElementById("txtcel").value;


    if (txtempresa == "" || txtruc == "" || txtcorreo == "" || txtpassword == "" || cbocar == "" || txtnom == "" || txtape == "" || cbodoc == "" || txtnum == "" || txtdir == "" || txtcel == "") {
        alert('Se requiere completar todos los campos.');
    } else {
        var email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (email.test(txtcorreo)) {
            var parametros = "";
            parametros += "@company='" + txtempresa + "',@ruc='" + txtruc + "',@username='" + txtcorreo + "',@password='" + txtpassword + "',@position='" + cbocar + "',@name='" + txtnom + "',@surnames='" + txtape + "',@documenttypeid=" + cbodoc + ",@documentnumber='" + txtnum + "',@address='" + txtdir + "',@mobile='" + txtcel + "'"
            console.log(parametros);
            var url = "https://cenfelecsolutions.com/Kamachixapi/RegistrarUsuario?parametros=" + parametros + "&mycorreo=" + txtcorreo + "&myruc=" + txtruc + "";
            
            post(url, mensajereg)
        } else {
            app.dialog.alert("La dirección de email es incorrecta.");
        }


    }

}

function mensajereg(cmensaje) {

    app.dialog.alert(cmensaje);
}