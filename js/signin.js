const formRegistro = document.querySelector('.signin-form'); // Selecciona el formulario de registro
const inputNombre = document.querySelector('#nombre'); // Campo de nombre
const inputApellidoP = document.querySelector('#apellidoP'); // Campo de apellido
const inputApellidoM = document.querySelector('#apellidoM'); // Campo de apellido
const inputFoto = document.querySelector('#foto');
const inputFecha = document.querySelector('#fecha');
const inputEmailRegistro = document.querySelector('#correo-registro'); // Campo de correo para registro
const inputPasswordRegistro = document.querySelector('#contrasena-registro'); // Campo de contraseña para registro

  formRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(inputFoto);
    const nombre = inputNombre.value;
    const apellidoP = inputApellidoP.value;
    const apellidoM = inputApellidoM.value;
    const profile_image = inputFoto.value;
    const fecha = inputFecha.value;
    const emailRegistro = inputEmailRegistro.value;
    const passwordRegistro = inputPasswordRegistro.value;

    if ([nombre, apellidoP, apellidoM, profile_image, fecha, emailRegistro, passwordRegistro].includes('')) {
      return alert('Todos los campos son obligatorios');
    }

    const data = {
      nombre,
      apellidoP,
      apellidoM,
      fecha,
      email: emailRegistro,
      password: passwordRegistro,
      profile_image,
    };

    try {
      const request = await fetch('http://localhost:3000/api/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await request.json();
      console.log(response);

      // Puedes redirigir al usuario a la página de inicio de sesión después del registro
      location.href = 'login.html';

    } catch (error) {
      console.log(error);
    }
  });

