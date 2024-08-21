let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const renderProducts = (arrayProductos) => {
  let containerCart = document.getElementById("container-cart");
  let cartTotal = document.getElementById("cart-total");
  containerCart.innerHTML = "";

  // Calcular total del carrito
  let total = 0;

  arrayProductos.forEach((producto) => {
    total += producto.price * producto.quantity; // Sumar el precio * cantidad al total

    let productCard = document.createElement("div");
    productCard.className = "producto";
    productCard.innerHTML = `<img src=${producto.image} class="image" />
          <h3>${producto.title}</h3>
          <p>${producto.description}</p>
          <p class="price">$${producto.price}</p>
          <div class="container-btns">
          <button onclick="restarCantidad(${producto.id})">-</button>
          <p class="price">${producto.quantity}</p>
          <button onclick="sumarCantidad(${producto.id})">+</button>
          </div>

          <button onclick="eliminarDelCarrito(${producto.id})">
          Eliminar</button>
      `;
    containerCart.appendChild(productCard);
  });

  // Actualizar el total en el HTML
  cartTotal.textContent = total.toFixed(2); // Mostrar el total con dos decimales
};

renderProducts(carrito);

const eliminarDelCarrito = (id) => {
  Swal.fire({
    title: "¿Seguro de que deseas eliminar este producto?",
    showDenyButton: true,
    confirmButtonText: "Si, eliminar",
    denyButtonText: `No, no eliminar`,
  }).then((res) => {
    if (res.isConfirmed) {
      carrito = carrito.filter((elemento) => elemento.id !== id);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderProducts(carrito);
      Swal.fire({
        title: "¡Producto eliminado!",
        icon: "info",
      });
    }
  });
};

const restarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado && productoEncontrado.quantity > 1) {
    productoEncontrado.quantity -= 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
    Toastify({
      text: "Cantidad reducida",
      gravity: "bottom",
      position: "right",
      backgroundColor: "Purple",
      close: true,
    }).showToast();
  } else if (productoEncontrado && productoEncontrado.quantity === 1) {
    eliminarDelCarrito(productoEncontrado.id);
  }
};

const sumarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado) {
    productoEncontrado.quantity += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
  }
};
