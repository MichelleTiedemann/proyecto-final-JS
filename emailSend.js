const form = document.getElementById("contact-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let info = getData();
  sendEmail(info);

  form.reset();
  showSuccessMessage();
});

const getData = () => {
  let nombre = document.getElementById("nombre").value;
  let telefono = document.getElementById("telefono").value;
  let email = document.getElementById("email").value;
  let mensaje = document.getElementById("mensaje").value;
  return { nombre, telefono, email, mensaje };
};

const sendEmail = (informacion) => {
  emailjs
    .send("service_a3agflc", "template_935lvjn", informacion)
    .then(() => {
      console.log("Correo enviado exitosamente");
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
    });
};

const showSuccessMessage = () => {
  const successMessage = document.createElement("p");
  successMessage.textContent =
    "Formulario enviado con éxito. Gracias por realizar tu compra con nosotros!";
  successMessage.style.color = "#28a745"; // Color verde
  successMessage.style.textAlign = "center";
  successMessage.style.marginTop = "20px";

  // Insertar el mensaje después del formulario
  form.parentNode.insertBefore(successMessage, form.nextSibling);

  // Eliminar el mensaje después de 5 segundos
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
};
