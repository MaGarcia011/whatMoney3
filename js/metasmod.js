const selectElement = document.getElementById('metanombre');


document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem("token")) {
        location.href = "index.html";
    }
    getOptions();
    console.log("entre");
})

async function getOptions() {
    const response = await fetch(`http://localhost:3000/api/usuarios/metasshowone/${localStorage.getItem('idUser')}`);
    const data = await response.json();
    console.log(data.msg);
    data.msg.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.Id_Meta;  
        optionElement.text = option.Nombres;  
        selectElement.appendChild(optionElement);
    });
}