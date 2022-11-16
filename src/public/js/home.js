const accessToken = localStorage.getItem("access_token");
const bearerToken = `Bearer ${accessToken}`;
const profileContainer = document.getElementById("profile-container");
const userLogout = document.getElementById("user-logout");

const renderUser = (user) => {
  const body = `
    <h2>${user.user} has iniciado sesión</h2>
    <p>Ya podes acceder al chat.</p>
    `;
  profileContainer.innerHTML = body;
};

if (accessToken) {
  fetch("/profile", {
    headers: {
      Authorization: bearerToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      renderUser(data);
    })
    .catch((error) => console.error(error));
}

if (accessToken) {
  userLogout.classList.remove("visually-hidden");
}

const logout = () => {
  localStorage.removeItem("access_token");
  window.location = "/";
};
