const addmeta = document.querySelector('#btn-metaadd');

const metaNombre = document.querySelector('#metaNombre');
const metacant = document.querySelector('#metacant');
const metafecha = document.querySelector('#metafecha');
const metacategoria = document.querySelector('#metacategoria');
const metadescrip = document.querySelector('#metadescrip');

let selectedDate;

$("#metafecha").flatpickr({
    enableTime: false,
    dateFormat: "F, d Y H:i",
    dateFormat: "Y/m/d",
    minDate: "today",
    maxDate: "30.12.2025",
    onClose: (selectedtDates, dateStr, instance)=>{
        selectedDate = $('#metafecha').val()
        addmeta.style.display = 'inline-block';
    } 
});


addmeta.addEventListener('click', () => {
    console.log(typeof selectedDate);
    const meta_Nombre = metaNombre.value
    const meta_cant = metacant.value
    const meta_fecha = selectedDate
    const meta_categoria = metacategoria.value
    const meta_descrip = metadescrip.value

    console.log(meta_Nombre, meta_cant, meta_fecha,meta_categoria,meta_descrip);

    if (!meta_Nombre || !meta_cant || !meta_fecha || !meta_categoria || !meta_descrip) {
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
        

        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-success';
        alertElement.role = 'alert';
        alertElement.innerText = 'Meta agregada correctamente';
    
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
         }, 6000); // 3000 milisegundos (3 segundos)

    addmetabd();
    metaNombre.value = '';
    metacant.value = '';
    metafecha.value = '';
    metacategoria.value = '';
    metadescrip.value = '';
})

async function addmetabd() {
    const meta_Nombre = metaNombre.value.trim();
    const meta_cant = metacant.value.trim();
    const meta_fecha = metafecha.value.trim();
    const meta_categoria = metacategoria.value.trim();
    const meta_descrip = metadescrip.value.trim();

    const response = await fetch(`http://localhost:3000/api/usuarios/metas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "nombre": meta_Nombre ,
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