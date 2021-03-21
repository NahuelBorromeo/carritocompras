//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

uploadEventListeners();
function uploadEventListeners() {
    //Agregar un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos de carrito
    carrito.addEventListener('click', borrarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos el array

        limpiarHTML(); //Eliminamos todo el HTML
    });
}

//functions
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerdatosCurso(cursoSeleccionado);
    }
}

// Elimina el curso del carrito
function borrarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del array con filter
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML(); //Iteramos sobre el carrito y mostramos el html
    }
}

// Extrae el los datos del curso clickeado
function leerdatosCurso(curso) {
    console.log(curso);

    //Crear un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad ++;
                return curso; // retorna el objeto actualizado
            }else {
                return curso; // retorna los objetos no duplicados
            }
        } );
        articulosCarrito = [...cursos];
    }else {
        //Agrega elementos al array de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }



    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el html
function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
            
        `;
        // Agrega el HTML del carrito en el Tbody
        contenedorCarrito.appendChild(row);
    })
}
//Limpia el carrito
function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

