var eventos_json = [];

$(document).ready(function () {

  $('#calendario').hide();

  /*Leo la información en el info.json para saber q eventos son los que hay que mostrar en el calendario*/
  $.ajax({
    url: "http://localhost:8081/info.json",
    async: false
  }).done(function (resultado) {
    eventos_json = resultado.events;
  });

  /*Se crea el calendario y le damos los eventos leidos anteriormente*/
  $('#calendar').evoCalendar({
    theme: "Midnight blue",
    calendarEvents: eventos_json
  });


  /*Evento de elegir por mes - consulta la cantidad de días laborables y no laborables*/
  $("#calendar").on('selectMonth', function () {

    $('#calendario').show();

    var numeroDias = $('#calendar').evoCalendar('calculateDaysforMonth');
    //alert(numeroDias);
    var active_events = $('#calendar').evoCalendar('getActiveEvents');
    var cantidadDias = 0;

    active_events.forEach(e => {
      if (typeof e.date === 'string') {
        cantidadDias++;
      } else {
        var fecha1 = new Date(e.date[0]).getTime();
        var fecha2 = new Date(e.date[1]).getTime();

        var diff = (fecha2 - fecha1) / (1000 * 60 * 60 * 24) + 1;
        cantidadDias = cantidadDias + diff;
      }

    });

    var diasLaborables = numeroDias - cantidadDias;
    var diasNoLaborables = cantidadDias;

    document.getElementById('lbl_cant_diaslaborables').innerHTML = diasLaborables;
    document.getElementById('lbl_cant_diasnolaborables').innerHTML = diasNoLaborables;

  });

    /*Evento cuando cambia el txtfield para calcular cuantos días tiene la solicitud*/
    $("#fch_fin").change(function(){
      var fecha_inicio = new Date(document.getElementById('fch_inicio').value).getTime();
      var fecha_fin = new Date(document.getElementById('fch_fin').value).getTime();

      var diff = (fecha_fin - fecha_inicio) / (1000 * 60 * 60 * 24) + 1;

      document.getElementById('lbl_sol_dias').innerHTML = diff;
    });



})