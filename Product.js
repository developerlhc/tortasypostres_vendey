// Product Constructor
export class Product {
    constructor(Id,CodBarras, Nombre,Cantidad,Precio,SubTotal,Igv,Total,IsEdit,CIMAGEN) {
        this.Id= Id;
        this.CodBarras= CodBarras;
        this.Nombre= Nombre;
        this.Cantidad = Cantidad;
        this.Precio = Precio;
        this.SubTotal = SubTotal;
        this.Igv= Igv;
        this.Total = Total;
        this.IsEdit=IsEdit;
        this.CIMAGEN=CIMAGEN;
    }

}