//Login users
const formLogin = document.querySelector('.login-form');
const inputEmail = document.querySelector('#correo');
const inputPassword = document.querySelector('#contrasena');
const loginButtons = document.querySelectorAll('#login-button');
const logoutButtons = document.querySelectorAll("#logout-button");

if (window.location.pathname.includes('login.html')) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;
    if ([email, password].includes('')) {
      return alert('Todos los campos son obligatorios');
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
      const response = await request.json();
      console.log(response);
      //save the response data in the local storage (emailUser idUser nameUser token)
      localStorage.setItem('emailUser', response.emailUser);
      localStorage.setItem('idUser', response.idUser);
      localStorage.setItem('nameUser', response.nameUser);
      localStorage.setItem('token', response.token);
      //redirect to index.html
      location.href = 'index.html';
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

// Validate if user is logged
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
