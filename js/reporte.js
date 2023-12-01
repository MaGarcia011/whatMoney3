const addIngreso = document.querySelector('#btn-ingreso');

addIngreso.addEventListener('click', () => {
    
        const alertError = document.createElement('div');
        alertError.className = 'alert alert-danger';
        alertError.role = 'alert';
        alertError.innerText = 'Error al generar el reporte. Por favor contacta con soporte.';

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
        }, 6000); // 3000 milisegundos (3 segundos)

    
})