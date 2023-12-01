const userBalance = document.querySelector('#user-monto');
const addIngreso = document.querySelector('#btn-ingreso');
const addEngreso = document.querySelector('#btn-egreso');
const Ingreso_Cantidad = document.querySelector('#Ingreso_Cantidad');
const Ingreso_Categoria = document.querySelector('#Ingreso_Categoria');
const Ingreso_Detalle = document.querySelector('#Ingreso_Detalle');

const Egreso_Cantidad = document.querySelector('#Egreso_Cantidad');
const Egreso_Categoria = document.querySelector('#Egreso_Categoria');
const Egreso_Detalle = document.querySelector('#Egreso_Detalle');



document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem("token")) {
        location.href = "index.html";
    }
    getUserBalance();
    console.log("Entre");
})

async function getUserBalance() {
    const response = await fetch(`http://localhost:3000/api/usuarios/${localStorage.getItem('idUser')}`);
    const data = await response.json();
    userBalance.textContent = `$${data.msg}`;
}

addIngreso.addEventListener('click', () => {
    const cantidadIngreso = Ingreso_Cantidad.value
    const categoriaIngreso = Ingreso_Categoria.value
    const detalleIngreso = Ingreso_Detalle.value

    console.log(cantidadIngreso, categoriaIngreso, detalleIngreso);

    if (!cantidadIngreso || !categoriaIngreso || !detalleIngreso) {
        // Si falta al menos un campo, muestra la alerta de error
        const alertError = document.createElement('div');
        alertError.className = 'alert alert-danger';
        alertError.role = 'alert';
        alertError.innerText = 'Por favor, completa todos los campos';

        // Agrega el elemento de alerta de error al cuerpo del documento
        document.body.appendChild(alertError);

        // Aplica estilos para centrar la alerta de error
        alertError.style.position = 'fixed';
        alertError.style.top = '50%';
        alertError.style.left = '50%';
        alertError.style.transform = 'translate(-50%, -50%)';

        // Espera unos segundos y luego elimina la alerta de error
        setTimeout(() => {
            document.body.removeChild(alertError);
        }, 4000); // 3000 milisegundos (3 segundos)

        return; // Detiene la ejecución de la función si faltan campos
    }

    else if (cantidadIngreso <0 || cantidadIngreso > 100000) {
        const alertError = document.createElement('div');
        alertError.className = 'alert alert-danger';
        alertError.role = 'alert';
        alertError.innerText = 'Ingresa un valor menor a $100,000 y mayor a $0';
        Ingreso_Cantidad.value = '';
        Ingreso_Categoria.value = '';
        Ingreso_Detalle.value = '';

        // Agrega el elemento de alerta de error al cuerpo del documento
        document.body.appendChild(alertError);

        // Aplica estilos para centrar la alerta de error
        alertError.style.position = 'fixed';
        alertError.style.top = '50%';
        alertError.style.left = '50%';
        alertError.style.transform = 'translate(-50%, -50%)';

        // Espera unos segundos y luego elimina la alerta de error
        setTimeout(() => {
            document.body.removeChild(alertError);
        }, 4000); // 3000 milisegundos (3 segundos)

        return; // Detiene la ejecución de la función si faltan campos
    }


    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-success';
    alertElement.role = 'alert';
    alertElement.innerText = 'Ingreso agregado correctamente';

     // Agrega el elemento de alerta al cuerpo del documento
     document.body.appendChild(alertElement);

     // Aplica estilos para centrar la alerta
     alertElement.style.position = 'fixed';
     alertElement.style.top = '50%';
     alertElement.style.left = '50%';
     alertElement.style.transform = 'translate(-50%, -50%)';
 
     // Espera unos segundos y luego elimina la alerta
     setTimeout(() => {
         document.body.removeChild(alertElement);
     }, 3000); // 3000 milisegundos (3 segundos)
     
    addBalance();
    Ingreso_Cantidad.value = '';
    Ingreso_Detalle.value = '';
})

async function addBalance() {
    const cantidadIngreso = Ingreso_Cantidad.value.trim();
    const categoriaIngreso = Ingreso_Categoria.value.trim();
    const detalleIngreso = Ingreso_Detalle.value.trim();

    const response = await fetch(`http://localhost:3000/api/usuarios/ingresos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "quantity": cantidadIngreso,
            "category": categoriaIngreso,
            "detail": detalleIngreso,
            "userId": localStorage.getItem('idUser')
        })
    });
    const data = await response.json();
    console.log(data);
    getUserBalance();
}

addEngreso.addEventListener('click', () => {
    const cantidadEgreso = Egreso_Cantidad.value;
    const categoriaEgreso = Egreso_Categoria.value;
    const detalleEgreso = Egreso_Detalle.value;

    console.log(cantidadEgreso, categoriaEgreso, detalleEgreso);

    if (!categoriaEgreso || !cantidadEgreso || !detalleEgreso) {
        // Si falta al menos un campo, muestra la alerta de error
        const alertError = document.createElement('div');
        alertError.className = 'alert alert-danger';
        alertError.role = 'alert';
        alertError.innerText = 'Por favor, completa todos los campos';

        // Agrega el elemento de alerta de error al cuerpo del documento
        document.body.appendChild(alertError);

        // Aplica estilos para centrar la alerta de error
        alertError.style.position = 'fixed';
        alertError.style.top = '50%';
        alertError.style.left = '50%';
        alertError.style.transform = 'translate(-50%, -50%)';

        // Espera unos segundos y luego elimina la alerta de error
        setTimeout(() => {
            document.body.removeChild(alertError);
        }, 4000); // 3000 milisegundos (3 segundos)

        return; // Detiene la ejecución de la función si faltan campos
    }

    else if (cantidadEgreso <0 || cantidadEgreso > 100000) {
        const alertError = document.createElement('div');
        alertError.className = 'alert alert-danger';
        alertError.role = 'alert';
        alertError.innerText = 'Ingresa un valor menor a $100,000 y mayor a $0';
        Egreso_Cantidad.value = '';
        Egreso_Detalle.value = '';


        // Agrega el elemento de alerta de error al cuerpo del documento
        document.body.appendChild(alertError);

        // Aplica estilos para centrar la alerta de error
        alertError.style.position = 'fixed';
        alertError.style.top = '50%';
        alertError.style.left = '50%';
        alertError.style.transform = 'translate(-50%, -50%)';

        // Espera unos segundos y luego elimina la alerta de error
        setTimeout(() => {
            document.body.removeChild(alertError);
        }, 4000); // 3000 milisegundos (3 segundos)

        return; // Detiene la ejecución de la función si faltan campos
    }

    

    // Crea dinámicamente un elemento de alerta Bootstrap
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-success';
    alertElement.role = 'alert';
    alertElement.innerText = 'Egreso agregado correctamente';

    // Agrega el elemento de alerta al cuerpo del documento
    document.body.appendChild(alertElement);

    // Aplica estilos para centrar la alerta
    alertElement.style.position = 'fixed';
    alertElement.style.top = '50%';
    alertElement.style.left = '50%';
    alertElement.style.transform = 'translate(-50%, -50%)';

    // Espera unos segundos y luego elimina la alerta
    setTimeout(() => {
        document.body.removeChild(alertElement);
    }, 3000); // 3000 milisegundos (3 segundos)
    
    // Resta el balance
    restarBalance();

    // Limpia los valores del formulario
    Egreso_Cantidad.value = '';
    Egreso_Detalle.value = '';
});


async function restarBalance() {
    const cantidadEgreso = Egreso_Cantidad.value.trim();
    const categoriaEgreso = Egreso_Categoria.value.trim();
    const detalleEgreso = Egreso_Detalle.value.trim();

    const response = await fetch(`http://localhost:3000/api/usuarios/egresos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "quantity": cantidadEgreso,
            "category": categoriaEgreso,
            "detail": detalleEgreso,
            "userId": localStorage.getItem('idUser')
        })
    });
    const data = await response.json();
    console.log(data);
    getUserBalance();
}

