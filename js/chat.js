import {
  getSession
} from "./auth.js";

const session =
  getSession();

const sidebarTitle =
  document.getElementById(
    "sidebarTitle"
  );

const chatItems =
  document.querySelectorAll(
    ".chat-item"
  );

const chatSelectedTitle =
  document.getElementById(
    "chatSelectedTitle"
  );

const messagesContainer =
  document.getElementById(
    "messagesContainer"
  );

const emptyChat =
  document.getElementById(
    "emptyChat"
  );

const chatInputContainer =
  document.getElementById(
    "chatInputContainer"
  );

const sendBtn =
  document.getElementById(
    "sendBtn"
  );

const messageInput =
  document.getElementById(
    "messageInput"
  );

// ====================================
// CAMBIAR TÍTULO SEGÚN ROL
// ====================================

if (
  session?.role === "tutor"
) {

  sidebarTitle.textContent =
    "Estudiantes";

}

else {

  sidebarTitle.textContent =
    "Tutores";

}

// ====================================
// MENSAJES MOCK
// ====================================

const chats = {

  1: [

    {
      own: false,
      text: "Hola 👋"
    },

    {
      own: true,
      text: "Hola, tengo dudas sobre cálculo."
    }

  ],

  2: [

    {
      own: false,
      text: "¿Confirmamos la sesión?"
    }

  ],

  3: [

    {
      own: false,
      text: "Gracias por la tutoría 🙌"
    }

  ]

};

// ====================================
// RENDER MENSAJES
// ====================================

function renderMessages(
  chatId
) {

  messagesContainer.innerHTML =
    "";

  const mensajes =
    chats[chatId] || [];

  mensajes.forEach((mensaje) => {

    const div =
      document.createElement(
        "div"
      );

    div.className =
      mensaje.own
        ? "mensaje mensaje-propio"
        : "mensaje mensaje-ajeno";

    div.textContent =
      mensaje.text;

    messagesContainer.appendChild(
      div
    );

  });

}

// ====================================
// SELECCIONAR CHAT
// ====================================

chatItems.forEach((item) => {

  item.addEventListener(
    "click",
    () => {

      // ACTIVE

      chatItems.forEach((chat) => {

        chat.classList.remove(
          "active"
        );

      });

      item.classList.add(
        "active"
      );

      // UI

      emptyChat.style.display =
        "none";

      messagesContainer.style.display =
        "flex";

      chatInputContainer.style.display =
        "flex";

      // TITLE

      const nombre =
        item.dataset.name;

      chatSelectedTitle.textContent =
        nombre;

      // MENSAJES

      renderMessages(
        item.dataset.chat
      );

    }
  );

});

// ====================================
// ENVIAR MENSAJE
// ====================================

sendBtn.addEventListener(
  "click",
  () => {

    const text =
      messageInput.value.trim();

    if (!text) return;

    const div =
      document.createElement(
        "div"
      );

    div.className =
      "mensaje mensaje-propio";

    div.textContent =
      text;

    messagesContainer.appendChild(
      div
    );

    messageInput.value = "";

    messagesContainer.scrollTop =
      messagesContainer.scrollHeight;

  }
);

// ENTER

messageInput.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendBtn.click();

    }

  }
);