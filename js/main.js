//Login users
const formLogin = document.querySelector('.login-form');
const inputEmail = document.querySelector('#correo');
const inputPassword = document.querySelector('#contrasena');
const loginButtons = document.querySelectorAll('#login-button');
const logoutButtons = document.querySelectorAll("#logout-button");
const registerButton = document.getElementById('register-button');

if (registerButton) {
  registerButton.addEventListener('click', async (e) => {
      e.preventDefault();
    
      location.href = 'signin.html';

    });
}

let response;
let errorMessage;

if (window.location.pathname.includes('login.html')) {
  formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = inputEmail.value;
      const password = inputPassword.value;
      
      // Crear dinámicamente un elemento de alerta Bootstrap
      const alertElement = document.createElement('div');
      alertElement.className = 'alert alert-danger';
      alertElement.role = 'alert';
      alertElement.innerText = 'Todos los campos son obligatorios';

      if ([email, password].includes('')) {
          // Si faltan campos, muestra la alerta de error
          errorMessage.appendChild(alertElement);
          alertElement.style.display = 'block';

          // Espera unos segundos y luego elimina la alerta de error
          setTimeout(() => {
              errorMessage.removeChild(alertElement);
          }, 5000); // 5000 ms = 5 segundos

          return; // Detiene la ejecución de la función si faltan campos
      }

      const data = {
          email,
          password,
      };
      try {
          const request = await fetch('http://localhost:3000/api/usuarios/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });
          if (request.ok) {
              response = await request.json();
              console.log(response);
              document.getElementById('error-message').style.display = 'none';
          } else {
              console.error("error de autenticación")
              errorMessage = document.getElementById('error-message');
              errorMessage.style.display = 'block';

              // Espera unos segundos y luego elimina la alerta de error
              setTimeout(() => {
                  errorMessage.style.display = 'none';
              }, 5000); // 5000 ms = 5 segundos
          }

          //save the response data in the local storage (emailUser idUser nameUser token)
          localStorage.setItem('emailUser', response.emailUser);
          localStorage.setItem('idUser', response.idUser);
          localStorage.setItem('nameUser', response.nameUser);
          localStorage.setItem('token', response.token);
          //redirect to index.html
          location.href = 'RegistroGastos.html';
      } catch (error) {
          console.log(error);
      }
  });
}


if (window.location.pathname.includes("about.html")) {
  if (!localStorage.getItem("token")) {
    location.href = "index.html";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('token')) {
    loginButtons.forEach((loginButton) => {
      loginButton.classList.add('d-none');
    });
    logoutButtons.forEach((logoutButton) => {
      logoutButton.classList.remove('d-none');
    });
    logoutSession();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const welcomeMessage = document.getElementById('welcome-message');
  const nameUser = localStorage.getItem('nameUser');

  if (nameUser) {
    welcomeMessage.textContent = `Bienvenido ${nameUser}`;
  }
});

function logoutSession() {
  logoutButtons.forEach(logoutButton => {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('emailUser');
      localStorage.removeItem('idUser');
      localStorage.removeItem('nameUser');
      localStorage.removeItem('token');
      location.href = 'index.html';
    });
    
  })
}


