class Articulo{
	constructor (id,nombre,desc,precio,img){
		this.id=id;
		this.nombre=nombre;
		this.desc= desc
		this.precio=precio;
		this.img=img;
		this.cantidad=1;

		this.obtenerArticulo=function (){
			return 'Producto '+this.id+': ' + this.nombre + '\n valor: $' + this.precio;	
		}
	}

		agregarCantidad(valor){
			this.cantidad += valor;
		}
		

		subtotal(){
			return this.cantidad * this.precio;
		}
}

