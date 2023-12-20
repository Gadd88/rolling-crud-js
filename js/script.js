// {
//     producto:,
//     descripcion:,
//     precio:,
//     stock:,
// }

// const productos = [
//     {
//         producto:1,
//         descripcion:'aaa',
//         precio: 200,
//         stock: 10,
//     },
//     {
//         producto: 2,
//         descripcion: 'bbbb',
//         precio: 500,
//         stock: 5,
//     }
// ]

const nombreProducto = document.getElementById('inputProducto')
const descripcionProducto = document.getElementById('inputDescripcion')
const precioProducto = document.getElementById('inputPrecio')
const stockProducto = document.getElementById('inputStock')
const btnAgregarProducto = document.getElementById('btn-agregar')
let productos = []

const agregarProducto = () => {
    const producto = {
        id: crypto.randomUUID().slice(0,4),
        producto: nombreProducto.value,
        descripcion: descripcionProducto.value,
        precio: precioProducto.value,
        stock: stockProducto.value,
    }
    productos.push(producto)
    console.log(productos)
    nombreProducto.value = ''
    descripcionProducto.value = ''
    precioProducto.value = ''
    stockProducto.value = ''
}

btnAgregarProducto.addEventListener('click', () => {
    e.preventDefault()
    agregarProducto()
})