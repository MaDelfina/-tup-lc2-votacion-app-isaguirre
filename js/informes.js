let mensajeAmarillo = document.getElementById("mensaje-amarillo-informes");
let textoAmarillo = document.getElementById("texto-amarillo-informes");
let mensajeVerde = document.getElementById("mensaje-verde-informes");
let textoVerde = document.getElementById("texto-verde-informes");
let mensajeRojo = document.getElementById("mensaje-rojo-informes");
let textoRojo = document.getElementById("texto-rojo-informes");
let arrayDatosString = localStorage.getItem('INFORMES');
let cuadro = document.getElementById('sec-contenido'); //todo el cuadro



document.addEventListener("DOMContentLoaded", function () {
    mostrarMensajes();
    console.log(arrayDatosString)
})

function mostrarMensajes (){
    // Se verifica si la cadena arrayDatosString tiene algún valor
    if (arrayDatosString) {
        //si tiene datos se bloquean todos los mensajes
        mensajeAmarillo.style.display="none";
        mensajeRojo.style.display="none";
        mensajeVerde.style.display="none";
        cuadro.style.display = "block";
        verificarLocal();
    } else {
        // Si el localStorage está vacío, muestra mensaje amarillo
        mensajeAmarillo.style.display="block";
        mensajeRojo.style.display="none";
        mensajeVerde.style.display="none";
        textoAmarillo.innerHTML = "No hay informes guardados para mostrar."
        cuadro.style.display = "none";
    }
}

async function verificarLocal() {
    let arrayDatosString = localStorage.getItem('INFORMES');
    let arrayDatos = arrayDatosString ? arrayDatosString.split(',') : []; //Verifica si la cadena existe y la divide en un array llamado arrayDatos usando la coma como separador. Si la cadena no existe, se asigna un array vacío
    console.log(arrayDatos)
    let svgDistrito = document.getElementById("svg-provincias");
    let titulo = document.getElementById('titulo');
    let subtitulo = document.getElementById('subtitulo')
    
    //Verificar si hay elementos en arrayDatos
    if (arrayDatos.length > 0) {
        for (let i = 0; i < arrayDatos.length; i++) {
            let registro = arrayDatos[i];
            let datosSeparados = registro.split('|');

            let añoElegido = datosSeparados[0];
            let tipoRecuento = datosSeparados[1];
            let tipoEleccion = datosSeparados[2];
            let categoriaId = datosSeparados[3];
            let distritoElegidoId = datosSeparados[4];
            let seccionProvinciaElegida = datosSeparados[5];
            let idSeccionElegidaId = datosSeparados[6];
            let circuitoId = datosSeparados[7];
            let mesaId = datosSeparados[8];
            let cargoElegido = datosSeparados[9];
            let distritoElegido = datosSeparados[10];
            let seccionElegida = datosSeparados[11];

            fetch(`https://elecciones-lc2.bruselario.com/api/resultados/getResultados/?anioEleccion=${añoElegido}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}&categoriaId=${categoriaId}&distritoId=${distritoElegidoId}&seccionProvincialId=${seccionProvinciaElegida}&seccionId=${idSeccionElegidaId}&circuitoId=${circuitoId}&mesaId=${mesaId}`)

                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error al obtener los datos del servidor. ');
                    }
                })
                .then(data => {
                    dataFiltrar = data
                    console.log(dataFiltrar);

                    
                    //MAPA
                    svgDistrito.innerHTML = distritoElegido;
                    svgDistrito.innerHTML = mapas[distritoElegido]; //me muestra el numero en el que se encuentra el mapa

                    //TITULO Y SUBTITULO
                    if (tipoEleccion == "2"){
                        titulo.innerHTML = `Elecciones ${añoElegido} | Generales`; //esto funcina
                        subtitulo.innerHTML = `${añoElegido} > Generales > ${cargoElegido} > ${distritoElegido} > ${seccionElegida}`;
                    }
                    else{
                        titulo.innerHTML = `Elecciones ${añoElegido} | Paso`; //esto funcina
                        subtitulo.innerHTML = `${añoElegido} > Paso > ${cargoElegido} > ${distritoElegido} > ${seccionElegida}`;
                    }

                })
                .catch(error => {
                    console.error('Error al realizar la consulta a la API:', error);
                });
        }
    }
}