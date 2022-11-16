const accessToken = localStorage.getItem("access_token");
const userLogout = document.getElementById("user-logout");

const logout = () => {
  localStorage.removeItem("access_token");
  window.location = "/";
};

if (accessToken) {
  userLogout.classList.remove("visually-hidden");
}

// Obtener informacion del formulario
const formMail = document.getElementById("mail-form");
formMail.addEventListener("submit", (e) => {
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
    .catch((error) => {
      console.error(error);
    });
});
