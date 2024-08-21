let productos = [];
document.addEventListener("DOMContentLoaded", () => {
  const getProducts = fetch("./data.json");
  getProducts
    .then((res) => res.json())
    .then((res) => {
      productos = res;
      renderProducts(productos);
    });
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const renderProducts = (arrayProductos) => {
  let containerProducts = document.getElementById("products-container");
  containerProducts.innerHTML = "";

  // renderizar

  arrayProductos.forEach((producto) => {
    let productCard = document.createElement("div");
    productCard.className = "producto";
    productCard.innerHTML = `<img src=${producto.image} class="image" />
        <h3>${producto.title}</h3>
        <p>${producto.description}</p>
        <p class="price">$${producto.price}</p>
        <button onclick="agregarAlCarrito(${producto.id})">
        Agregar al carrito</button>
    `;
    containerProducts.appendChild(productCard);
  });
};

renderProducts(productos);
// [{}{}{}]
const agregarAlCarrito = (id) => {
  // encontrar el producto al cual le dimos click
  let producto = productos.find((elemento) => elemento.id === id);
  let productoEnElCarrito = carrito.find((elemento) => elemento.id === id); // {} - undefined

  if (productoEnElCarrito) {
    // {} - undefined
    // entra cuando ya esta en el carrito
    productoEnElCarrito.quantity += 1;
    Swal.fire({
      title: "Su producto se aumento en 1",
      icon: "success",
      position: "center",
      // showConfirmButton: true,
      confirmButtonText: "aceptar",
      timer: 5000,
    });
  } else {
    // entra cuando todavia no esta
    carrito.push({ ...producto, quantity: 1 });
    Swal.fire({
      title: "Se agrego exitosamente",
      icon: "success",
      position: "center",
      // showConfirmButton: true,
      confirmButtonText: "aceptar",
      timer: 5000,
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const inputSearch = document.getElementById("search");
if (inputSearch) {
  inputSearch.addEventListener("input", (evento) => {
    let value = evento.target.value.toLowerCase();
    let arrayFiltrado = productos.filter((producto) =>
      producto.title.toLowerCase().includes(value)
    );
    renderProducts(arrayFiltrado);
  });
}
