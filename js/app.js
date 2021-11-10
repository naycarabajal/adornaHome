
$("#galeriayForm").hide();

 $.get("data/productos.json",function(respuesta, estado){
	console.dir(respuesta);
	console.log(estado);
	if(estado=="success"){
		for (const objeto of respuesta){
			//console.log(objeto);
			stockProductos.push(new Articulo(objeto.id,objeto.nombre,objeto.desc,objeto.precio,objeto.img));
		}

		//mostrar los articulos del listado en card
		mostrarCatalogo(stockProductos,'#catalogo');
	}else{
		console.log('No cargaron los datos');
	}

})

/*la primer linea la agrego para validar que se cargen todas las cards previamente, para que el DOM este listo*/
$(document).ready(function(){
	$(".agregarCarrito").click(agregarProducto);
	if("productos" in localStorage){
		const datos= JSON.parse(localStorage.getItem('productos'));
		for (const objeto of datos){
			carrito.push(new Articulo(objeto.id,objeto.nombre,objeto.desc,objeto.precio,objeto.img));
		}
		mostrarCompra(carrito);
	}
})


/*agregamos espera hasta que carguen todos los recursos externos, fotos, etc*/
$(window).on('load',function(){
	$("#iconoEspera").remove();
	$("#galeriayForm").fadeIn();
});

$(".textoIntro").css("color","#c3b767").animate({opacity:0.9, fontSize:"2.5rem"},3000);