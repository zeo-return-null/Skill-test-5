// Llamar a nuestra de /mail con fetch()

// const datos = await fetch("/mail")

// datos.map(dato => {
//     contenedor.innerHTML += `
//         <h3>Remitente: ${dato.envelope.from}<h3>
//     `
// })

// Obtener informacion del formulario
const formMail = document.getElementById("mail-form")

formMail.addEventListener("submit", e => {
  e.preventDefault();

  const mailData = new FormData(e.target);
  const newMail = {
    from: mailData.get("from"),
  to: mailData.get("to"),
    subject: mailData.get("subject"),
    text: mailData.get("text"),
    html: mailData.get("text-html"),
  };

  // Post a la ruta de mail con los datos del formulario 
  fetch("/mail", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMail),
  })
    .then(() => {
      e.target.reset();
    })
    .catch(error => {
      console.error(error);
    });
});
