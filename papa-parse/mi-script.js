// Definimos una variable que contendrá nuestra base de datos.
let db; 

// Cargamos nuestra base de datos con PapaParse indicando su dirección.
Papa.parse("db.csv", {
    download: true,  // Indicamos que es un archivo que existe en nuestro servidor y se debe descargar.
    header: true,    // Indicamos que la primera fila corresponde al nombre de cada columna.
    complete: function(results) {
        /*
        Una vez que se haya completado la descarga de nuestro archivo asignamos la variable a los datos obtenidos. 
        Esto corresponderá a una lista de n elementos, dónde n corresponde al número de filas en la base de datos.
        Por ejemplo, podemos aceder a la columna "1960" en la i-ésima fila con db[i]["1960"];
        */
        db = results.data; 

        // Eliminamos nuestro texto de "Cargando base de datos...".
        d3.select("p#cargando").remove();
        
        // Creamos una lista a partir de los bases de datos.
        crear_lista();
	}
});

// Crea una lista "drop down" a partir de la base de datos.
function crear_lista() {
    // Agregamos primero un "label" (etiqueta) explicativo de la lista.
    d3.select("body").append("label").text("Elige un país: ");
    
    /*
    Ahora creamos la lista cuál contendrá los países de nuestra base de datos.
    Usaremos "vanilla JS" ya que usar D3 para esto sale un tanto enredado.
    */
    let select = document.createElement("select");
    
    // Ahora iteramos sobre cada elemento de la base de datos.
    for (var fila = 0; fila < db.length; fila++) {
        // Creamos un "option", el cual corresponde a una opción de la lista.
        var option = document.createElement("option");
        
        // Asignamos el texto de la opción al nombre del país. 
        option.text = db[fila]["Country Name"];

        // Asignamos el valor de la opción a su fila en la base de datos (¡esto nos ayudará después!).
        option.value = fila;

        // Agregamos esta opción a la lista.
        select.appendChild(option);
    }

    /*
    Queremos activar una función cada vez que el usuario selecione un pais.
    Para lograr esto, conectamos el evento "onchage" de nuestra lista a una función creada por nosotros.
    */
    select.onchange = mostrarDatosPais;
    
    // Finalmente, agregamos la lista creada al cuerpo de la página.
    document.body.appendChild(select);
}

function mostrarDatosPais()
{
    // Partimos removiendo todo el texto que había antes.
    d3.selectAll("p").remove()

    // 'event.target.value' nos retorna el valor de la opción elegida. En nuestro caso, será la fila de este país en la base de datos.
    let fila = event.target.value;

    /*
    Mediante el sigueinte for podemos iterar sobre todas las columnas de la fila, obteniendo el nombre de la columna y el valor en esa columna.
    En este caso, lo agregaremos como texto nomás, pero fácilmente esta parte podría ser el punto de partida para graficar...
    */
    for (let [columna, valor] of Object.entries(db[fila])) 
        d3.select("body").append("p").text(columna + ": " + valor);
}