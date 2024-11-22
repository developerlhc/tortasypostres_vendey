const productList = document.getElementById("tbodyproductos");
// var uribase = "http://localhost:61869/";
var uribase = localStorage.getItem("uribase");


// UI Constructor
export class UI {
  // Add a new Product
  addProduct(product) {
    if (this.updateCantidadTabla(product)) {
      if (product.IsEdit) {

      } else {
        iziToast.info({
          title: 'Información',
          message: 'El producto ya se encuentra agregado , si desea puede editarlo.',
        });
      }
    } else {
      const fragment = document.createDocumentFragment();

      const element = document.createElement("tr");
      element.innerHTML = `
                          <tr >
                              <th scope="row">
                                  <input   type="button" class="btn btn-sm btn-danger" name="eliminarproducto" value="X">
                                  <input ncodproducto="${product.Id}" ncantidad="${product.Cantidad}" nprecio="${product.Precio}" ntotal="${product.Total}" cproductodesc="${product.Nombre}" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" name="editarproducto" value="E">
                              </th>
                              <td><p style="font-size: 11px;">${product.Nombre + "    "}${"|<b>" + product.Cantidad}</b></p></td>
                              <td  ncodproducto="${product.Id}" ncantidad="${product.Cantidad}" nprecio="${product.Precio}" ntotal="${product.Total}" cproductodesc="${product.Nombre}" class="countable"><h6 style="font-size: 11px;">${product.Total}</h6></td>
                          </tr ">
            `;
      element.setAttribute("id", "idfila" + product.Id);
      fragment.appendChild(element);
      productList.appendChild(fragment);
      // this.showMessage("Producto Agregado", "success");
      // iziToast.success({
      //   title: product.Nombre,
      //   message: 'agregado!',
      // });
      // alert("Producto agregado "+product.Nombre);
    }
  }

  addProductCard(product, fragment) {

    const element = document.createElement("div");

    let proddefault = "book.png";

    if (product.Nombre.toLowerCase().includes("habita")) {
      proddefault = "llave.png";
    }else if(product.CIMAGEN){
      proddefault = product.CIMAGEN;
    }


    element.className = "card mb-3 rounded-3 shadow-sm col-12 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6"
    element.innerHTML = `
                        
                                            <img src="${proddefault}" class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <p id="lblPrecio" 
                                                    class="text-break fs-6">${product.Nombre}- S/ ${product.Precio}</p>
                                             </div>
          `;
    element.addEventListener('click', function (event) {
      const ui = new UI();

      let thiss=this;
      // ui.addProduct(product);
      // ui.updateTotalVenta();
      var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
      myModal.show()
      document.getElementById("txtpreioventa").value = parseFloat(product.Precio).toFixed(2);
      document.getElementById("txtNombreProducto").setAttribute("ncodproducto", product.Id);

      document.getElementById("txtNombreProducto").setAttribute('readonly', true);
      if (product.Nombre == "producto servicio") {
        document.getElementById("txtNombreProducto").setAttribute('readonly', false);
      }
      document.getElementById("txtNombreProducto").value = product.Nombre;
      document.getElementById("txtcantidad").value = 1;
      document.getElementById("txttotalproducto").value = product.Precio;

      let midivoculto = document.getElementById("habilitar");
      midivoculto.classList.add("d-none");
      console.log("evaluando");
      if (document.getElementById("txtNombreProducto").value.toLowerCase().includes("habi")) {
        midivoculto.classList.remove("d-none");
        var raw2 = JSON.stringify({
          "token": localStorage.getItem("gstoken").toString(),
          "procedure": "spverestadohabitacion",
          "parametros": product.Id + "|" + 0 + "|"
        });
        var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/json");
        var requestOptions2 = {
          method: 'POST',
          headers: myHeaders2,
          body: raw2,
          redirect: 'follow'
        };
        fetch(uribase*"EjecutarVendey", requestOptions2)
          .then(response => response.json())
          .then(result => {
            let checknuevo = document.getElementById("chkhabilitado");
            if (result.Rpta.length > 0) {
              checknuevo.checked = false;
            } else {
              checknuevo.checked = true;
            }
            ui.ActualizarProd();

          })

      }
    })
    fragment.appendChild(element);
    // cardproductList.appendChild(element);
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }
  ActualizarProd() {
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
          const ui = new UI();

          ui.ListarPreciosTodos(uribase, localStorage.getItem("gstoken").toString());

        })
    }
    return "";
  }
  deleteProduct(element) {
    if (element.name === "eliminarproducto") {
      element.parentElement.parentElement.remove();
      // this.showMessage("Producto eliminado", "danger");
      //   iziToast.warning({
      //     title: 'Advertencia',
      //     message: 'Producto retirado',
      // });
      this.updateTotalVenta();
      // }
      // alert("Producto retirado");
    }
  }


  editarProductoTable(element) {
    if (element.name === "editarproducto") {
      console.log(element)


      document.getElementById("txtNombreProducto").setAttribute('readonly', true);
      debugger
      // if (product.Nombre=="producto servicio") {
      //   document.getElementById("txtNombreProducto").setAttribute('readonly', false);
      // }  

      document.getElementById("txtNombreProducto").value = element.getAttribute("cproductodesc");
      document.getElementById("txtNombreProducto").setAttribute("ncodproducto", element.getAttribute("ncodproducto"));
      document.getElementById("txtcantidad").value = element.getAttribute("ncantidad");
      document.getElementById("txtpreioventa").value = element.getAttribute("nprecio");
      document.getElementById("txttotalproducto").value = element.getAttribute("ntotal")

      this.updateTotalVenta();
    }
  }



  addProductTable(element) {
    if (element.name === "agregarproducto") {

    }
  }

  updateTotalVenta(borrar) {
    var sum = 0.00;
    if (borrar) {
      document.getElementById("tbodyproductos").innerHTML = "";
    } else {
      var cls = document.getElementById("tablaproductos").getElementsByTagName("td");
      for (var i = 0; i < cls.length; i++) {
        if (cls[i].className == "countable") {
          let total = Number.parseFloat(cls[i].getAttribute("ntotal").trim());
          sum += Number.parseFloat(total);
        }
      }
    }

    document.getElementById("txtmontopagado").value = sum;
    document.getElementById("txttotalventa").innerText = sum;
    document.getElementById("txtmontopagar").value = sum;
    document.getElementById("txtpagado").value = 0.00;
    document.getElementById("txtvuelto").value = 0.00;
  }


  updateCantidadTabla(product) {
    let rpta = false;
    var cls = document.getElementById("tablaproductos").getElementsByTagName("td");
    for (var i = 0; i < cls.length; i++) {
      if (cls[i].getAttribute("ncodproducto") === product.Id && cls[i].getAttribute("cproductodesc") === product.Nombre) {
        rpta = true;
        if (product.IsEdit) {
          let myid = product.Id;
          let updaterow = `
            <th scope="row">
                <input   type="button" class="btn btn-sm btn-danger" name="eliminarproducto" value="X">
                <input ncodproducto="${product.Id}" ncantidad="${product.Cantidad}" nprecio="${product.Precio}" ntotal="${product.Total}" cproductodesc="${product.Nombre}" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" name="editarproducto" value="E">
            </th>
            <td><p style="font-size: 11px;">${product.Nombre + "    "}${"|<b>" + product.Cantidad}</b></p></td>
            <td  ncodproducto="${product.Id}" ncantidad="${product.Cantidad}" nprecio="${product.Precio}" ntotal="${product.Total}" cproductodesc="${product.Nombre}" class="countable"><h6 style="font-size: 11px;">${product.Total}</h6></td>
            `
          let fila = document.getElementById("idfila" + myid);
          fila.innerHTML = updaterow;
        }
        break;
      }
    }
    return rpta;
  }

  clearVenta() {
    this.updateTotalVenta(true);
  }


  updateProduct(element) {
    console.log("quiero editar");
    // if (element.name === "editarproducto") {
    // alert("En proceso...");
    // }
  }


  addListaPrecio(resultado) {
    const productList = document.getElementById("cboListaPrecio");
    const productform = document.getElementById("product-form");
    productform.innerHTML = "";

    if (localStorage.getItem("ListaProductos")) {
      localStorage.removeItem("ListaProductos")
    }
    let combo = "";
    productList.innerHTML = "";
    if (resultado.Exito) {
      let lista = JSON.parse(resultado.Rpta)
      localStorage.setItem("ListaProductos", resultado.Rpta);
      lista.forEach(item => {
        combo += `<option value="${item.NCODLISTAPRECIO}">${item.CNOMLISTAPRECIO}</option>`;
        // let element = document.createElement("option");
        // productList.appendChild(element);
      });
    }
    productList.innerHTML = combo;

  }

  addFamilias(resultado) {
    if (resultado.Exito) {
      let lista = JSON.parse(resultado.Rpta)
      if (localStorage.getItem("ListaFamilias")) {
        localStorage.removeItem("ListaFamilias")
      }
      localStorage.setItem("ListaFamilias", resultado.Rpta);
      const cbofamilia = document.getElementById("cbofamilia");
      cbofamilia.innerHTML = "";
      let elementinnerHTML = "";
      
      lista.forEach(item => {
        
        elementinnerHTML += `
        <option  value="${item.NCODFAMILIA}">${item.CFAMILIADESC}</option>
        `;
      });
      cbofamilia.innerHTML = elementinnerHTML;
    }

  }



  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alertFloat alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));

    // Show in The DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");

    // Insert Message in the UI
    app.append(div);



    // Remove the Message after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
 ListarPreciosTodos(uribase,token) {
  const searchWrapper = document.querySelector(".search-input");

  const inputBox = searchWrapper.querySelector("input");

      var select = document.getElementById('cbofamilia');
      var strUser = select.options[select.selectedIndex].value;
  
  console.log("rpta todos")
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
    
      var raw = JSON.stringify({
        "token": token,
        "NCODFAMILIA":0
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
          let rpta_new= JSON.parse(result.Rpta); 
          ui.addListaPrecio(result);
          if (rpta_new) {
      
            var listaProductos = rpta_new;
            var listaProductosConPrecio = listaProductos[0].ListaPrecioDets;
            listaProductos.forEach(element => {
    let contado=0;
              if (contado==0) {
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
          let contadoritems=0;
                let    regemptyArray = emptyArray.map((data) => {
                      contadoritems+=1;
                      // passing return data inside li tag
                      if (contadoritems<=30) {
                        
                        return data = `<li data-bs-toggle="" ${(data.COBSERVACIONES.includes('ocupado')?'style="color:red"':"")}  data-bs-target="#staticBackdrop" ncodproducto='${data.NCODPRODUCTO}' name='${parseFloat(data.NPRECIO).toFixed(2)}'>${data.CPRODUCTODESC}</li>`;
                      }
                    });
                    searchWrapper.classList.add("active"); //show autocomplete box
                    
                    
                    let listData='';
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
                        document.getElementById("txtpreioventa").value=button.getAttribute("name");
                        document.getElementById("txtNombreProducto").setAttribute("ncodproducto",button.getAttribute("ncodproducto"));
                        document.getElementById("txtNombreProducto").value=selectData;
                        document.getElementById("txtNombreProducto").setAttribute('readonly', true);
                        
                        if (selectData=="producto servicio") {
                          document.getElementById('txtNombreProducto').removeAttribute('readonly');
                        }  
                        document.getElementById("txtcantidad").value=1;
                        document.getElementById("txttotalproducto").value=button.getAttribute("name");
                        


                        let midivoculto= document.getElementById("habilitar");
                        midivoculto.classList.add("d-none");
                        console.log("evaluando");
                        if (document.getElementById("txtNombreProducto").value.toLowerCase().includes("habi")) {
                          midivoculto.classList.remove("d-none");
                          var raw2 = JSON.stringify({
                            "token": localStorage.getItem("gstoken").toString(),
                            "procedure": "spverestadohabitacion",
                            "parametros":  button.getAttribute("ncodproducto")+"|"+0+"|"
                          });
                          var myHeaders2 = new Headers();
                          myHeaders2.append("Content-Type", "application/json");
                          var requestOptions2 = {
                            method: 'POST',
                            headers: myHeaders2,
                            body: raw2,
                            redirect: 'follow'
                          };
                          fetch(uribase*"EjecutarVendey", requestOptions2)
                            .then(response => response.json())
                            .then(result => {
                              let checknuevo=document.getElementById("chkhabilitado");
                              if (result.Rpta.length>0) {
                                checknuevo.checked =false;
                              }else{
                                checknuevo.checked =true;
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
    contado+=1;
          
                
            });
          }
        })
        .catch(error => console.log('error', error));
        
        
    }
  
}



