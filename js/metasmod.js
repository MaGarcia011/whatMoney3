const selectElement = document.getElementById('metanombre');
const inputElement = document.getElementById('metacant');
const dateElement = document.getElementById('metafecha');
const optionElement = document.getElementById('metacategoria');
const textElemento = document.getElementById('metadescrip');
const OptionElemento = document.getElementById('optionName');
const btn = document.getElementById('btn-metaadd');


document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem("token")) {
        location.href = "index.html";
    }
    getOptions();
    console.log("entre");

    selectElement.addEventListener('change', () => {
        const selectedOptionID = selectElement.value;
        getTransactions(selectedOptionID);
        OptionElemento.remove();
        btn.style.display = 'inline-block';
    });
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
    console.log(selectElement.value);
    
}

async function getTransactions() {
    const response = await fetch(`http://localhost:3000/api/usuarios/metasdescription/${localStorage.getItem('idUser')}/${selectElement.value}`);
    const data = await response.json();
    console.log(data.msg);
    data.msg.forEach(transaction => {
        inputElement.value = transaction.Cantidad;
        dateElement.value = transaction.FechaMeta;
        textElemento.value = transaction.Descripcion;
    });

}



btn.addEventListener('click', () => {
    const meta_cant = metacant.value
    const meta_fecha = metafecha.value
    const meta_categoria = metacategoria.value
    const meta_descrip = metadescrip.value

    console.log( meta_cant, meta_fecha,meta_categoria,meta_descrip);

    if (!meta_cant && !meta_fecha && !meta_categoria && !meta_descrip) {
        return alert('Todos los campos son obligatorios');
    }
    alert('Meta mmodificada correctamente');
    addmetabd();
    metacant.value = '';
    metafecha.value = '';
    metacategoria.value = '';
    metadescrip.value = '';
})

async function addmetabd() {
    const meta_cant = metacant.value.trim();
    const meta_fecha = metafecha.value.trim();
    const meta_categoria = metacategoria.value.trim();
    const meta_descrip = metadescrip.value.trim();

    const response = await fetch(`http://localhost:3000/api/usuarios/metasupd`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "idMeta": selectElement.value,
            "cantidad": meta_cant,
            "fecha": meta_fecha,
            "categoria": meta_categoria,
            "descripcion": meta_descrip ,
            "idUser": localStorage.getItem('idUser')
        })
    });
    const data = await response.json();
    console.log(data);
}