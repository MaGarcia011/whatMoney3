const userBalance = document.querySelector('#user-monto');
const addIngreso = document.querySelector('#btn-ingreso');

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
})

async function getUserBalance(){
    const response = await fetch (`http://localhost:3000/api/usuarios/${localStorage.getItem('idUser')}`);
    const data = await response.json();
    userBalance.textContent = `$${data.msg}`;
}

addIngreso.addEventListener('click', () => {

})

