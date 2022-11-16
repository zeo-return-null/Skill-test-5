const accessToken = localStorage.getItem("access_token");
if (accessToken) {
  window.location = "/home.html";
}

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(registerForm);

  const newUser = {
    user: formData.get("user"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  fetch("/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error("Error al registrarse");
      }
      return res.json();
    })
    .then(() => {
      console.log(newUser);
      e.target.reset();
    })
    .catch((error) => {
      console.error(error);
    });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(formData.get("email"));
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  fetch("/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Error al iniciar sesion");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("access_token", data.token);
      e.target.reset();
      window.location = "/home.html";
    })
    .catch((error) => {
      console.error(error);
    });
});

const logout = () => {
  localStorage.removeItem("access_token");
  window.location = "/";
};
