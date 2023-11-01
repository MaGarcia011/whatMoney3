const addmeta = document.querySelector('#btn-metaadd');

const metaNombre = document.querySelector('#metaNombre');
const metacant = document.querySelector('#metacant');
const metafecha = document.querySelector('#metafecha');
const metacategoria = document.querySelector('#metacategoria');
const metadescrip = document.querySelector('#metadescrip');


addmeta.addEventListener('click', () => {
    const meta_Nombre = metaNombre.value
    const meta_cant = metacant.value
    const meta_fecha = metafecha.value
    const meta_categoria = metacategoria.value
    const meta_descrip = metadescrip.value

    console.log(meta_Nombre, meta_cant, meta_fecha,meta_categoria,meta_descrip);

    if (!meta_Nombre && !meta_cant && !meta_fecha && !meta_categoria && !meta_descrip) {
        return alert('Todos los campos son obligatorios');
    }
    alert('Meta agregada correctamente');
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