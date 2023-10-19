const formRegistro = document.querySelector('.signin-form'); // Selecciona el formulario de registro
const inputNombre = document.querySelector('#nombre'); // Campo de nombre
const inputApellidoP = document.querySelector('#apellidoP'); // Campo de apellido
const inputApellidoM = document.querySelector('#apellidoM'); // Campo de apellido
const inputFoto = document.querySelector('#foto');
const inputFecha = document.querySelector('#fechaNac');
const inputEmailRegistro = document.querySelector('#correo'); // Campo de correo para registro
const inputPasswordRegistro = document.querySelector('#password'); // Campo de contraseña para registro

formRegistro.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData();
  const nombre = inputNombre.value;
  const apellidoP = inputApellidoP.value;
  const apellidoM = inputApellidoM.value;
  const profile_image = inputFoto.files[0];
  const fecha = inputFecha.value;
  const emailRegistro = inputEmailRegistro.value;
  const passwordRegistro = inputPasswordRegistro.value;

  if ([nombre, apellidoP, apellidoM, profile_image, fecha, emailRegistro, passwordRegistro].includes('')) {
    return alert('Todos los campos son obligatorios');
  }

  formData.append('nombre', nombre);
  formData.append('apellidoP', apellidoP); // Corregido el nombre del campo
  formData.append('apellidoM', apellidoM); // Corregido el nombre del campo
  formData.append('profile_image', profile_image);
  formData.append('fecha', fecha);
  formData.append('email', emailRegistro);
  formData.append('password', passwordRegistro);

  try {
    const request = await fetch('http://localhost:3000/api/usuarios/registrar', {
      method: 'POST',
      body: formData, // Configura el cuerpo de la solicitud como FormData
    });
    const response = await request.json();
    if (response.msg == 'Registro guardado con exito') {
      localStorage.setItem('email', emailRegistro);
      window.location.href = '/payment.html';
    }else{
      alert(response.msg);
      location.reload();
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

