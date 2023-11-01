const transactionTable = document.getElementById('transaction-tableTwo');


document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem("token")) {
        location.href = "index.html";
    }
    getTransactions();
    console.log("entre");
})


async function getTransactions() {
    const response = await fetch(`http://localhost:3000/api/usuarios/historial/${localStorage.getItem('idUser')}`);
    const data = await response.json();
    console.log(data.msg);
    data.msg.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.Fecha}</td>
            <td>${transaction.Hora}</td>
            <td>${transaction.Balance}</td>
        `;
        transactionTable.appendChild(row);
    });
}