
    
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



var url = "https://cenfelecsolutions.com/Kamachixapi/Ejecutaraccion?"
var parametros = "myproc=adm.spuser&parametros=@caccion='usercomplete'";
post(url + parametros, llenarAutocompleted)

var company = [];

function llenarAutocompleted(rpta) {
    if (rpta) {
        var arr = rpta.split('¬');
        for (let index = 0; index < arr.length; index++) {
            company.push(arr[index]);
        }
    }
}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    if (inp) {
        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) {
                return false;
            }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }
}
autocomplete(document.getElementById("txtcompany"), company);









function obtenerdatos() {
    var empresa = document.getElementById("txtempresa").value;
    var ruc = document.getElementById("txtruc").value;
    var correo = document.getElementById("txtcorreo").value;
    var cargo = document.getElementById("cbocar").value;
    var nombre = document.getElementById("txtnom").value;
    var apellido = document.getElementById("txtape").value;
    var documento = document.getElementById("cbodoc").value;
    var numerodoc = document.getElementById("txtnum").value;
    var direccion = document.getElementById("txtdir").value;
    var celular = document.getElementById("txtcel").value;
    console.log(empresa, ruc, correo, cargo, nombre, apellido, documento, numerodoc, direccion, celular);
}


function finiciarsesion() {
debugger;
    var txtcompany = document.getElementById("txtcompany").value;
    var detes = txtcompany.split('-');
    var company = detes[0];
    var txtuser = document.getElementById("txtuser").value;
    var txtpass = document.getElementById("txtpass").value;


    if (txtcompany == "" || txtuser == "" || txtpass == "") {
        alert('Complete los campos');
    } else {

        var parametros = "";
        parametros += "@company='" + company + "',@username='" + txtuser + "',@password='" + txtpass + "'"
        console.log(parametros);
        var url = "https://cenfelecsolutions.com/Kamachixapi/login?parametros=" + parametros;
        post(url, mensaje)

    }

}
function fcancelar() {
    location.href = "index.html";
}

// function fregistro() {
//     var txtempresa = document.getElementById("txtempresa").value;
//     var txtruc = document.getElementById("txtruc").value;
//     var txtcorreo = document.getElementById("txtcorreo").value;
//     var txtpassword = document.getElementById("txtpassword").value;
//     var cbocar = document.getElementById("cbocar").value;
//     var txtnom = document.getElementById("txtnom").value;
//     var txtape = document.getElementById("txtape").value;
//     var cbodoc = document.getElementById("cbodoc").value;
//     var txtnum = document.getElementById("txtnum").value;
//     var txtdir = document.getElementById("txtdir").value;
//     var txtcel = document.getElementById("txtcel").value;


//     if (txtempresa == "" || txtruc == "" || txtcorreo == "" || txtpassword == "" || cbocar == "" || txtnom == "" || txtape == "" || cbodoc == "" || txtnum == "" || txtdir == "" || txtcel == "") {
//         alert('Se requiere completar todos los campos.');
//     } else {
//         var email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
//         if (email.test(txtcorreo)) {
//             var parametros = "";
//             parametros += "@company='" + txtempresa + "',@ruc='" + txtruc + "',@username='" + txtcorreo + "',@password='" + txtpassword + "',@position='" + cbocar + "',@name='" + txtnom + "',@surnames='" + txtape + "',@documenttypeid=" + cbodoc + ",@documentnumber='" + txtnum + "',@address='" + txtdir + "',@mobile='" + txtcel + "'"
//             console.log(parametros);
//             var url = "https://cenfelecsolutions.com/Kamachixapi/RegistrarUsuario?parametros=" + parametros + "&mycorreo=" + txtcorreo + "&myruc=" + txtruc + "";
            
//             post(url, mensajereg)
//         } else {
//             app.dialog.alert("La dirección de email es incorrecta.");
//         }


//     }

// }








function mensaje(cmensaje) {
    debugger;

    if (cmensaje.indexOf(4) > -1) {
        var list = [];
        list = cmensaje.split("|");
        if (list[3].length>1) {
            sessionStorage.setItem("userid", list[0]);
            sessionStorage.setItem("company", list[1]);
            sessionStorage.setItem("ruc", list[2]);
            sessionStorage.setItem("username", list[3]);
            sessionStorage.setItem("password", list[4]);
            sessionStorage.setItem("position", list[5]);
            sessionStorage.setItem("name", list[6]);
            sessionStorage.setItem("surnames", list[7]);
            sessionStorage.setItem("documenttypeid", list[8]);
            sessionStorage.setItem("documentnumber", list[9]);
            sessionStorage.setItem("address", list[10]);
            sessionStorage.setItem("mobile", list[11]);
            sessionStorage.setItem("rolid", list[12]);
            sessionStorage.setItem("nameschedule", list[13]);
            sessionStorage.setItem("scheduletypeid", list[14]);
            sessionStorage.setItem("description", list[15]);
            sessionStorage.setItem("observation", list[16]);
            sessionStorage.setItem("daystart", list[17]);
            sessionStorage.setItem("dayend", list[19]);
            sessionStorage.setItem("timestart", list[21]);
            sessionStorage.setItem("timeend", list[22]);
            sessionStorage.setItem("myserver", list[24]);
            location.href = "inicioapp.html";
        }
    } else {
        
        alert("Usted aun no tiene asignado un horario.Comuniquese con soporte." +" videosvencor@gmail.com "+"");

    }
}




function mensajereg(cmensaje) {

    app.dialog.alert(cmensaje);
}

















