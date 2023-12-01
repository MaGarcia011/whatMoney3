const selectElement = document.getElementById('metanombre');
const inputElement = document.getElementById('metacant');
const dateElement = document.getElementById('metafecha');
const optionElement = document.getElementById('metacategoria');
const textElemento = document.getElementById('metadescrip');
const OptionElemento = document.getElementById('optionName');
const btn = document.getElementById('btn-metaadd');

let selectedDate;

$("#metafecha").flatpickr({
    enableTime: false,
    dateFormat: "F, d Y H:i",
    dateFormat: "Y/m/d",
    minDate: "today",
    maxDate: "30.12.2025",
    onClose: (selectedtDates, dateStr, instance)=>{
        selectedDate = $('#metafecha').val()
    }
});


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
        
        if (!meta_cant || !meta_fecha || !meta_categoria || !meta_descrip) {
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
    
        else if (meta_cant <0 || meta_cant > 100000) {
            const alertError = document.createElement('div');
            alertError.className = 'alert alert-danger';
            alertError.role = 'alert';
            alertError.innerText = 'Ingresa un valor menor a $100,000 y mayor a $0';
            metaNombre.value = '';
            metacant.value = '';
            metafecha.value = '';
            metacategoria.value = '';
            metadescrip.value = '';
    
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
            }, 40000); // 3000 milisegundos (3 segundos)
    
            return; // Detiene la ejecución de la función si faltan campos
        }
        

        const alertElement1 = document.createElement('div');
        alertElement1.className = 'alert alert-success';
        alertElement1.role = 'alert';
        alertElement1.innerText = 'Meta agregada correctamente';
    
         // Agrega el elemento de alerta al cuerpo del documento
        document.body.appendChild(alertElement1);
    
         // Aplica estilos para centrar la alerta
        alertElement1.style.position = 'fixed';
        alertElement1.style.top = '50%';
        alertElement1.style.left = '50%';
        alertElement1.style.transform = 'translate(-50%, -50%)';
        
        setTimeout(() => {
            document.body.removeChild(alertElement1);
         }, 60000000); // 3000 milisegundos (3 segundos)


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