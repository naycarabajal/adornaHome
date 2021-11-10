/*función para catalogo*/
function mostrarCatalogo(stockProductos,id){
	for(const producto of stockProductos){
		$(id).append(`<div class="card-group margenHorizontal">
		  <div class="col margenVertical">
		    <div class="card ">
		      <img src="${producto.img}" class="card-img-top mt-3 fotoPequenia" alt="fotosDeProducto">
		      <div class="card-body">
		        <h5 class="card-title ">${producto.precio}</h5>
		        <p class="card-text">${producto.desc}</p>
		      	<a href="#" class="u-full-width button input agregarCarrito" id="${producto.id}">Agregar Al Carrito</a>
		      </div>
		    </div>
		  </div>`);

	}
}


function agregarProducto(event){
	event.preventDefault(); //para que no refresque la página
	let productoAgregado= stockProductos.find((prod) =>prod.id == this.id) //puede ser event.target.id
	const existe =carrito.find(producto=>producto.id == productoAgregado.id);
	if(existe == undefined){
		let productoAgregado= stockProductos.find((prod) =>prod.id == this.id) //puede ser event.target.id
		carrito.push(productoAgregado);
	}else{
		existe.agregarCantidad(1);
	}
	$("#animacionCarrito").fadeIn("slow").fadeOut(1200);
	//es para guardar en el localStorage lo que hay en el carrito
	localStorage.setItem('productos',JSON.stringify(carrito));
	mostrarCompra(carrito);
}

	
function mostrarCompra(carrito){
	$("#CarritoCantidad").html(carrito.length);
	$("#carritosProductos").empty();
	let totalCarrito=0;
	for (const producto of carrito){
		$("#carritosProductos").append(`<p> <span class="badge badge-light"><strong> ${producto.nombre} <strong> <a id="${producto.id}" class="btn btn-light btn-delete"> x </a> </span>
											<span class="badge badge-light">$${producto.precio} </span>
											<span class="badge badge-light">cant: ${producto.cantidad} </span>
											<span class="badge badge-warning">subtotal:  ${producto.subtotal()} </span>

											</p>`);
		totalCarrito+= producto.subtotal();
		}
	$('.btn-delete').on('click', eliminarCarrito);

	$("#carritosProductos").append(`<p><span class="badge badge-dark"><strong>Precio Total: ${totalCarrito}</strong></span></p>`);
	$("#carritosProductos").append(`<button id="btnConfirmarCompra" class="margenHorizontal btn-light">Confirmar</button>`);
	$("#btnConfirmarCompra").on("click",enviarCompra);
}


function enviarCompra(){
	$.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(carrito),function(respuesta,estado){
		console.log(estado);
		console.dir(respuesta);
		$("#compraConfirmada").fadeIn("slow").fadeOut(2500);
	});
}

function eliminarCarrito(event){
	event.stopPropagation();
	carrito = carrito.filter(articulo => articulo.id != event.target.id);
	mostrarCompra(carrito);
	localStorage.setItem('productos',JSON.stringify(carrito));
}