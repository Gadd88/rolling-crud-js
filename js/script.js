
const nombreProducto = document.getElementById('inputProducto')
const categoriaProducto = document.getElementById('inputCategoria')
const descripcionProducto = document.getElementById('inputDescripcion')
const direccionImg = document.getElementById('inputImg')
const precioProducto = document.getElementById('inputPrecio')
const stockProducto = document.getElementById('inputStock')
const btnAgregarProducto = document.getElementById('btn-agregar')
const listaProductos = document.getElementById('lista-productos')
let productos = []

//agregar a localStorage
const agregarStorage = (productos) => {
    localStorage.setItem('productos', JSON.stringify(productos))
}

//Agregar Producto
const agregarProducto = () => {
    const producto = {
        id: crypto.randomUUID().slice(0,4),
        nombre: nombreProducto.value,
        categoria: categoriaProducto.value,
        descripcion: descripcionProducto.value,
        imagen: direccionImg.value,
        precio: precioProducto.value,
        stock: stockProducto.value,
    }
    //agregamos el producto al array de productos y limpiamos los valores del formulario
    productos.push(producto)
    nombreProducto.value = ''
    categoriaProducto.value = ''
    descripcionProducto.value = ''
    direccionImg.value = ''
    precioProducto.value = ''
    stockProducto.value = ''
}
btnAgregarProducto.addEventListener('click', (e) => {
    e.preventDefault()
    agregarProducto()
    mostrarProductos()
    agregarStorage(productos) //cada vez que agregamos un producto, se agregar el array nuevo al localStorage
})

//Mostrar productos

const mostrarProductos = () => {
    const listaProductos = document.getElementById('lista-productos')
    listaProductos.innerHTML = ''
    productos.forEach((producto) => {

        const {id, categoria, nombre, descripcion, imagen, stock, precio} = producto

        listaProductos.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start col-12 col-md-4" id=${id}>        
            <div class="col-md-12 col-lg-6 mb-4 mb-lg-0">
                <div class="card">
                    <div class="d-flex justify-content-between p-3">
                        <p class="lead mb-0">New!!!</p>
                        <div class="bg-danger rounded-circle d-flex align-items-center borrar justify-content-center shadow-1-strong" style="width: 35px; height: 35px;">
                            <p class="text-white mb-0 small borrar pointer" id="btn-eliminar" role="button">X</p>
                        </div>
                    </div>
                    <img src=${imagen} class="card-img-top" alt="Laptop" />
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <p class="small">
                                <a href="#!" class="text-muted">${categoria}</a>
                            </p>
                            <p class="small text-danger">
                                <s>$ ${precio*1.5}</s>
                            </p>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <h5 class="mb-0">${nombre}</h5>
                            <h5 class="text-dark mb-0">$ ${precio}</h5>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <p class="text-muted mb-0">
                                Stock: <span class="fw-bold">${stock}</span>
                            </p>
                            <p class="text-muted mb-0">
                                <button class="btn btn-warning editar" data-bs-toggle="modal" data-bs-target="#modalProducto">Editar</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>        
        </li>
        `
    })
}
{/* <div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-titlems-1 me-auto">${nombre}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${categoria}</h6>
        <p class="card-text">${descripcion}</p>
        <div class="d-flex justify-content-between">
        <span class="p-2 col-5">${stock}UN.</span>
        <span class="bg-success text-white fw-bold rounded-none p-2 col-5">$${precio}</span>
        </div>
        <div class="d-flex align-items-center justify-content-end gap-3 col-12">
            <button type='button' class="bg-warning text-white modificar rounded-pill border-0 p-1" data-id="${id}">Editar</button>
            <button type='button' class="bg-danger text-white borrar rounded-pill border-0 p-1" id="btn-eliminar">X</button>
        </div>
    </div>
</div> */}
    

//Eliminar Producto
const eliminarProducto = (id) => {
    document.getElementById(id).remove()
}
//Boton "Eliminar"
listaProductos.addEventListener('click', (e) => {
    if(e.target.classList.contains('borrar') || e.target.parentElement.classList.contains('borrar')){
        const productoId = e.target.closest('li').id
        eliminarProducto(productoId) //se elimina el item del DOM - MUCHO MUY IMPORTANTE!!! no del array productos
        let newProductos = productos.filter(producto => producto.id != productoId) // creamos un nuevo array sin el producto eliminado
        productos = newProductos //reemplaza todos los items del array productos por los del nuevo array filtrado
        mostrarProductos()
        agregarStorage(productos)
    }
})

//Boton "Editar"
listaProductos.addEventListener('click', (e) => {
    if(e.target.classList.contains('editar') || e.target.parentElement.classList.contains('editar')){
        const productoId = e.target.closest('li').id
        mostrarFormularioModificar(productoId);
    }
})

//Modificar producto
const modal = document.getElementById('modalProducto')
const modalTitle = document.getElementById('modal-title')
const modalBody = document.getElementById('modal-body')
const mostrarFormularioModificar = (id) => {
    //buscamos el producto que queremos modificar usando el metodo find y el id
    const producto = productos.find((producto) => producto.id === id);
    //form para modificacion:
    const formEdicion = document.getElementById('form-edicion');
    formEdicion.innerHTML = `
        <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
            <span class="input-group-text col-3" for="new-producto">Producto:</span>
            <input class="form-control" type="text" id="new-producto" value="${producto.nombre}">
        </div>
        <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
            <span class="input-group-text col-3" for="new-categoria">Categoria:</span>
            <input class="form-control" type="text" id="new-categoria" value="${producto.categoria}">
        </div>
        <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
            <span class="input-group-text col-3" for="new-descripcion">Descripcion:</span>
            <input class="form-control" type="text" id="new-descripcion" value="${producto.descripcion}">
        </div>
        <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
            <span class="input-group-text col-3" for="new-precio">Precio:</span>
            <input class="form-control" type="number" id="new-precio" value="${producto.precio}">
        </div>
        <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
            <span class="input-group-text col-3" for="new-stock">Stock:</span>
            <input class="form-control" type="number" id="new-stock" value="${producto.stock}">
        </div>
    `;
    modalTitle.textContent = `${producto.nombre}`

    // funcion para guardar los cambios
    const guardarEdicion = document.getElementById('btn-guardar')
    guardarEdicion.addEventListener('click', () => {
        // cambiamos los datos originales por los agregados en el form de arriba
        producto.nombre = document.getElementById('new-producto').value;
        producto.categoria = document.getElementById('new-categoria').value;
        producto.descripcion = document.getElementById('new-descripcion').value;
        producto.precio = document.getElementById('new-precio').value;
        producto.stock = document.getElementById('new-stock').value;
        // Mostrar nuevamente listado de productos
        mostrarProductos();
    });
    
}