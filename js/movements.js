const transactionTable = document.getElementById('transaction-table');


document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem("token")) {
        location.href = "index.html";
    }
    getTransactions();
    console.log("entre");
})


async function getTransactions() {
    const response = await fetch(`http://localhost:3000/api/usuarios/movimientos/${localStorage.getItem('idUser')}`);
    const data = await response.json();
    console.log(data.msg);
    data.msg.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.Fecha}</td>
            <td>${transaction.Hora}</td>
            <td>${transaction.Categoria}</td>
            <td>${transaction.Tipo}</td>
            <td>${transaction.Monto}</td>
        `;
        transactionTable.appendChild(row);
    });
}
