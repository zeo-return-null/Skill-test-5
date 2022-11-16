const socket = io.connect();

// Setear todos los elementos 
const $home = document.getElementById("chat-index");
const $chatForm = document.getElementById("chat-form");
const $rooms = document.getElementById("chat-rooms");
const $room = document.getElementById("chat-room");
const $messages = document.getElementById("chat-message");
const $messageForm = document.getElementById("message-form");
const $chatTitle = document.getElementById("chat-title");
const $chatLeave = document.getElementById("chat-leave");
const userLogout = document.getElementById("user-logout");

// Token
const accessToken = localStorage.getItem("access_token");
const bearerToken = `Bearer ${accessToken}`;


if (!accessToken) {
  window.location= "/";
}

if (accessToken) {
  userLogout.classList.remove("visually-hidden");
}

let user;

// Traer info del perfil
if (accessToken) {
  fetch("/profile", {
    headers: {
      Authorization: bearerToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      user = data;
    })
    .catch((error) => console.error(error));
}

// Mostrar salas existentes
const renderRooms = (rooms) => {
  let body = `<p class="title fw-bold text-center my-4">Salas activas</p>`;

  if (!rooms.length) {
    body += `<p class="title">No hay salas</p>`;
  }

  rooms.forEach((room) => {
    body += `<button class="btn btn-primary" onclick="connectToChatRoom('${room}')">Unirse a : ${room}</button>`;
  });
  $rooms.innerHTML = body;
};

// Volver visible elementos al unirse a la sala
const connectRoom = (user, room) => {
  $room.classList.remove("visually-hidden");
  $chatTitle.classList.remove("visually-hidden");
  $messages.classList.remove("visually-hidden");
  $messageForm.classList.remove("visually-hidden");
  $chatLeave.classList.remove("visually-hidden");
  $home.classList.add("visually-hidden");

  socket.emit("connect:room", { user, room });
};
// Unirse a una sala
const connectToChatRoom = (room) => {
  connectRoom(user, room);
};

// Obtener datos del formulario para crear sala
$chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const room = formData.get("room");

  if (room.trim() !== "") {
    connectRoom(user, room);
  }
});

socket.on("get:rooms", ({ rooms }) => {
  renderRooms(rooms);
});

// Mostrar nombre de sala y sus usuarios
const renderRoom = (room, users) => {
  let body = `<h3 class="title">Sala ${room}</h3>`;
  body += `<div>`;
  users.forEach((user) => {
    body += `<p>${user.user} (${user.email})</p>`;
  });

  body += `</div>`;
  $room.innerHTML = body;
};

socket.on("room:users", ({ room, users }) => {
  renderRoom(room, users);
});

const renderMessage = ({ user, text, time }) => {
  $messages.innerHTML += `<p>
    <span class="fw-bold"> [${time} ] - ${user} :</span> ${text}
  </p>`;
  $messages.scrollTop = $messages.scrollHeight;
};

const renderMessages = (messages) => {
  messages.forEach((message) => {
    renderMessage(message);
  });
};

socket.on("room:get-messages", (messages) => {
  renderMessages(messages);
});

socket.on("room:message", (message) => {
  renderMessage(message);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const message = formData.get("message");
  socket.emit("room:send-message", message);
  e.target.reset();
});

$chatLeave.addEventListener("click", () => {
  window.location.reload();
});