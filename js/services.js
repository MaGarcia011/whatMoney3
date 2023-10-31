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

    if (!cantidadIngreso && !categoriaIngreso && !detalleIngreso) {
        return alert('Todos los campos son obligatorios');
    }
    alert('Ingreso agregado correctamente');
    addBalance();
    Ingreso_Cantidad.value = '';
    Ingreso_Categoria.value = '';
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
    const cantidadEgreso = Egreso_Cantidad.value
    const categoriaEgreso = Egreso_Categoria.value
    const detalleEgreso = Egreso_Detalle.value

    console.log(cantidadEgreso, categoriaEgreso, detalleEgreso);

    if (!cantidadEgreso && !categoriaEgreso && !detalleEgreso) {
        return alert('Todos los campos son obligatorios');
    }
    alert('Egreso agregado correctamente');
    restarBalance();
    Egreso_Cantidad.value = '';
    Egreso_Categoria.value = '';
    Egreso_Detalle.value = '';
})

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

