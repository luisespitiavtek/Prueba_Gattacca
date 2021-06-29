const express = require("express");
const path = require("path");
const http = require("http");
const fs = require('fs');

const app = express();



app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname + '/')));

/*Metodo de inicio de pagina q redirige al index*/
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

/*Metodo el cual coge lo que recibe del formulario y crea un nuevo objeto y lo agrega a info.json*/
app.post("/", (req, res) => {

    var nombre_evento = req.body.slc_tipo_tiempo;
    var fecha_inicio = convertDateFormat(req.body.fch_inicio);
    var fecha_fin = convertDateFormat(req.body.fch_fin);
    var rango_fechas = [];
    rango_fechas.push(fecha_inicio);
    rango_fechas.push(fecha_fin);

    var evento_nuevo = {
        id: '6',
        name: nombre_evento,
        date: rango_fechas,
        type: 'event',
        color: "#63d867" 
    }

    
    fs.readFile("info.json", (err, data) => {  

        var arreglo_archivo = JSON.parse(data);

        arreglo_archivo.events.push(evento_nuevo);
        fs.writeFile("info.json", '{"events":' + JSON.stringify(arreglo_archivo.events) + '}', (err) => {
            if (err) {  console.error(err);  return; };
            res.sendFile(path.join(__dirname + "/index.html"));
        });
    });
    
    
});

/*Metodo que convierte una cadena de fecha a un formato que utiliza el calendario*/
function convertDateFormat(string) {
    var info = string.split('-');
    return info[1] + '/' + info[2] + '/' + info[0];
  }

app.listen(8081, ()=>{
    console.log("funciona");
});