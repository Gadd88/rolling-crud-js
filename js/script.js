
const nombreProducto = document.getElementById('inputProducto')
const categoriaProducto = document.getElementById('inputCategoria')
const descripcionProducto = document.getElementById('inputDescripcion')
const precioProducto = document.getElementById('inputPrecio')
const stockProducto = document.getElementById('inputStock')
const btnAgregarProducto = document.getElementById('btn-agregar')
const listaProductos = document.getElementById('lista-productos')
let productos = []

//Agregar Producto
const agregarProducto = () => {
    const producto = {
        id: crypto.randomUUID().slice(0,4),
        nombre: nombreProducto.value,
        categoria: categoriaProducto.value,
        descripcion: descripcionProducto.value,
        precio: precioProducto.value,
        stock: stockProducto.value,
    }
    productos.push(producto)
    nombreProducto.value = ''
    categoriaProducto.value = ''
    descripcionProducto.value = ''
    precioProducto.value = ''
    stockProducto.value = ''
}
btnAgregarProducto.addEventListener('click', (e) => {
    e.preventDefault()
    agregarProducto()
    mostrarProductos()
})

//Mostrar productos

const mostrarProductos = () => {
    const listaProductos = document.getElementById('lista-productos')
    listaProductos.innerHTML = ''
    productos.forEach((producto) => {

        const {id, categoria, nombre, descripcion, stock, precio} = producto

        listaProductos.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start col-4" id=${id}>
            
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title">${nombre}</h5>
                        <button type='button' class="bg-danger text-white borrar rounded-pill col-2" id="btn-eliminar">X</button>
                    </div>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${categoria}</h6>
                    <p class="card-text">${descripcion}</p>
                    <div class="d-flex justify-content-between">
                        <span class="p-2 col-5">${stock}UN.</span>
                        <span class="bg-success text-white fw-bold rounded-none p-2 col-5">$${precio}</span>
                    </div>
                </div>
            </div>
        </li>
        `
    })
}

//Eliminar Producto
const eliminarProducto = (id) => {
    document.getElementById(id).remove()
}
listaProductos.addEventListener('click', (e) => {
    if(e.target.classList.contains('borrar') || e.target.parentElement.classList.contains('borrar')){
        const productoId = e.target.closest('li').id
        eliminarProducto(productoId)
    }
})