//Función para verificar formulario
function verificarFormulario(event) {
    event.preventDefault();

    if (window.location.pathname.includes('index.html')) {
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;
        
        if (nombre === '' || correo === '' || mensaje === '') {
            console.log("Todos los campos deben estar completos.");
        } else {
            console.log("Formulario enviado correctamente.");
            event.target.submit(); 
        }
    }
}
const formulario = document.querySelector('form');
if (formulario) {
    formulario.addEventListener('submit', verificarFormulario);
}


//Lista de productos
const productos = [
    { id: 1,  nombre: "Paleta de Sombras Obsidian", precio: 32000, description: "Descubre la nueva paleta de sombras de Ruby Rose, diseñada con tonos neutros ideales para un maquillaje social. Su fórmula altamente pigmentada permite crear looks versátiles, perfectos para cualquier ocasión."},
    { id: 2, nombre: "Iluminador en Crema Obsidian", precio: 15000, description: "El iluminador y sombra Mystic Glam es un producto multifuncional que ofrece un acabado brillante y posee una textura cremosa que se desliza suavemente en la piel."},
    { id: 3, nombre: "Perfume Obsidian", precio: 28000, description: "Es una fragancia de la familia olfativa Oriental Floral.Las Notas de Salida son pastelito, frambuesa y bergamota; las Notas de Corazón son regaliz, frangipani y vainilla; las Notas de Fondo son pachulí y haba tonka."},
    { id: 4, nombre: "Lip Oil Obsidian", precio: 11000, description: "El Lip Oil hidrata y nutre los labios ofreciendo una experiencia de uso sumamente cómoda. Ideal para quienes buscan cuidado para los labios sin renunciar a un acabado natural y discreto."},
    { id: 5, nombre: "Bálsamo para labios Obsidian", precio: 14000, description: "Este bálsamo labial es súper confortable además hidrata profundamente tus labios con un toque suave de color. Perfecto para realzar la belleza natural de tus labios. Tono Onyx"},
    { id: 6, nombre: "Bálsamo para labios Obsidian", precio: 14000, description: "Este bálsamo labial es súper confortable además hidrata profundamente tus labios con un toque suave de color. Perfecto para realzar la belleza natural de tus labios. Tono Rhodonite."},
    { id: 7, nombre: "Rubor Duo Obsidian", precio: 18000, description: "Ofrece dos opciones de texturas en un único producto, permitiendo personalización y versatilidad en la aplicación. Contiene un blush cremoso y uno compacto."},
    { id: 8, nombre: "Rubor Marmolado Obsidian", precio: 16000, description: "Puede ser utilizado como rubor, iluminador y sombra. Perfecto para quien busca practicidad en su kit de belleza. Textura sedosa, alta pigmentanción y fácil de esfumar."},
    { id: 9, nombre: "Agua Micelar Melu", precio: 10500, description: "Contiene Pantenol y Ácido Hialurónico que limpia suavemente la piel a la vez que hidrata. Utilizar en rostro y cuello para eliminar maquillaje e impuresas. De uso diario."},
    { id: 10, nombre: "Serum Durazno Melu", precio: 10000, description: "Contiene activos de alto poder hidratante. Su fórmula incluye extracto de Durazno, Ácido Hialurónico, Vitamina E y Algas Marinas. Posee una textura suave de fácil absorción, promoviento una piel más hidratada y suave."},
    { id: 11, nombre: "Serum Kiwi Melu", precio: 10000, description: "Antioxidante. Compuesto por poderosos activos que juntos poseen un alto poder hidratante, con Ácido Hialurónico, Vitamina E, Aloe Vera y Pantenol. De textura suave y fácil absorción, promoviento una piel más hidratada y suave."},
    { id: 12, nombre: "Mousse de Limpieza", precio: 14000, description: "Tiene una acción revitalizante y antioxidante, favoreciendo una piel hidratada, limpia y bonita. La espuma cremosa tiene una textura suave y aterciopelada. Su uso diario evita la deshidratación y descamación de la piel."}
];

//Función para recorrer la lista y mostrar los productos en consola
function mostrarProductos(){
   console.log("Lista de productos disponibles");
   for (let i = 0; i < productos.length; i++) {
    console.log(`ID: ${productos[i].id} - Nombre: ${productos[i].nombre} - Precio: $${productos[i].precio}`);
   };
}
mostrarProductos();

//Evento click para mostrar descripción de productos
const botonesDescripcion = document.querySelectorAll('.descripcion');

botonesDescripcion.forEach(boton => {
    boton.addEventListener('click', (event) => {
        const idProducto = event.target.closest('.producto').querySelector('.descripcion-texto').dataset.productoId;
        const descripcionElemento = event.target.closest('.producto').querySelector('.descripcion-texto');
        
        const producto = productos.find(p => p.id == idProducto);

        if (descripcionElemento.style.display === 'block') {
            descripcionElemento.style.display = 'none';
        } else {
            descripcionElemento.textContent = producto.description;
            descripcionElemento.style.display = 'block';
        }
    });
});

//CARRITO DE COMPRAS
// Cargar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para mostrar el carrito y desplazarse hacia él
document.getElementById('mostrar-carrito').addEventListener('click', function () {
    const carrito = document.getElementById('carrito');
    carrito.style.display = 'block';
    carrito.scrollIntoView({ behavior: 'smooth' }); 
});
  
//Función para el contador del carrito en
function obtenerTotalProductosEnCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    return carrito.reduce((total, item) => total + item.cantidad, 0);
}
function actualizarContador() {
    const totalProductos = obtenerTotalProductosEnCarrito();
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = totalProductos;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    mostrarCarrito();
});

//Función para agregar producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find((prod) => prod.id === idProducto);
    const productoEnCarrito = carrito.find((item) => item.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
        const notificacion = document.createElement("div");
        notificacion.classList.add("notificacion");
        notificacion.textContent = "Producto agregado al carrito";

        document.body.appendChild(notificacion);

        setTimeout(() => {
            notificacion.style.display = "none";
        }, 3000);
    }

    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
    calcularTotalConIva();
}

//Función para modificar cantidad de un producto en el carrito
function modificarCantidad(id, cantidad) {
    const producto = carrito.find((item) => item.id == id);
    if (!producto) return;

    producto.cantidad += cantidad;
    if (producto.cantidad <= 0) {
        producto.cantidad = 1;
    }

    guardarCarrito();
    mostrarCarrito();
    calcularTotalConIva();
    actualizarContador();
}

//Función para eliminar producto del carrito
function eliminarProducto(id) {
    carrito = carrito.filter((item) => item.id !== id);
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
    calcularTotalConIva();
}

//Función para mostrar productos en el carrito
function mostrarCarrito() {
    const carritoLista = document.getElementById("carrito-lista");
    carritoLista.innerHTML = "";

    if (carrito.length === 0) {
        carritoLista.innerHTML = "<p>Tu carrito está vacío</p>";
        return;
    }

    carrito.forEach((item) => {
        const div = document.createElement("div");
        div.className = "carrito-item";
        div.innerHTML = `
            <p>${item.nombre}</p>
            <p>Precio: $${item.precio}</p>
            <p>Cantidad: 
                <button class="btn-decrementar" data-id="${item.id}">-</button>
                ${item.cantidad}
                <button class="btn-incrementar" data-id="${item.id}">+</button>
            </p>
            <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
        `;
        carritoLista.appendChild(div);
    });

    // Agregar eventos solo después de crear los elementos
    document.querySelectorAll(".btn-decrementar").forEach((btn) =>
        btn.addEventListener("click", () => modificarCantidad(btn.dataset.id, -1))
    );
    document.querySelectorAll(".btn-incrementar").forEach((btn) =>
        btn.addEventListener("click", () => modificarCantidad(btn.dataset.id, 1))
    );
    document.querySelectorAll(".btn-eliminar").forEach((btn) =>
        btn.addEventListener("click", () => eliminarProducto(parseInt(btn.dataset.id)))
    );
}



document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
});
document.querySelectorAll(".comprar").forEach((btn, index) =>
    btn.addEventListener("click", () => agregarAlCarrito(index + 1))
);

//Función vaciar carrito
const botonVaciar = document.getElementById('vaciar-carrito');
if (botonVaciar) {
    botonVaciar.addEventListener('click', () => {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
        actualizarContador();
        calcularTotalConIva();
    });
}
mostrarCarrito();

//Funcion para calcular precio con IVA
const IVA_PORCENTAJE = 21;

function calcularTotalConIva() {
    const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    const montoIva = (subtotal * IVA_PORCENTAJE) / 100;
    const totalConIva = subtotal + montoIva;

    document.getElementById("modal-subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("modal-iva").textContent = montoIva.toFixed(2);
    document.getElementById("modal-total").textContent = totalConIva.toFixed(2);
}
calcularTotalConIva();

//Funcion para finalizar la compra
function realizarCompra() {
    carrito = [];
    guardarCarrito();  
    mostrarCarrito(); 
    calcularTotalConIva();
    actualizarContador();

    const notificacion = document.createElement("div");
    notificacion.classList.add("notificacion");
    notificacion.textContent = "Compra realizada con éxito";
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.style.display = "none";
    }, 3000);

    cerrarCheckout();
}

function cerrarCheckout() {
    document.getElementById('carrito').style.display = 'none'; 
  }


