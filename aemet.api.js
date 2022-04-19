class AemetApi {
      constructor (){
            this.apiKey = '/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYW5jeW1tY0Bob3RtYWlsLmVzIiwianRpIjoiZTEyZGFjM2UtZTY3ZC00YWJkLWE3YjMtYTg0NTUwZjgzM2IwIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NDkxNDQxMzUsInVzZXJJZCI6ImUxMmRhYzNlLWU2N2QtNGFiZC1hN2IzLWE4NDU1MGY4MzNiMCIsInJvbGUiOiIifQ.Af1VtfYDHZxbHiPxwYxaokIonwH7YLCLhVVzQ7MYckY';
            this.aemetApiUrl = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/46250';
            this.panelPrincipal = document.querySelector('#panelPrincipal');
            this.panelTabla = document.querySelector('#panelTabla');
            this.tbody = document.querySelector('#panelPrincipal .tabla-temperatura tbody');
            this.botonHoy = document.querySelector('#hoy');
            this.botonManyana = document.querySelector('#manyana');
            this.botonPasadoManyana = document.querySelector('#pasadoManyana');
            this.listaDias = [];
            this.columnasTh = [];
            this.columnasTd = [];
      }

      cargarTemperatura(dia) {
            const tableAemet = document.querySelector('tabla-aemet');
            console.log(tableAemet);
            if(tableAemet){
                  tableAemet.remove();
            }
            fetch(this.aemetApiUrl + this.apiKey)
            .then(response => response.json())
            .then(json => {
                  fetch(json.datos)
                  .then( response => response.json())
                  .then(json => {
                       // this.tbody.innerHTML='';
                        let listaTemperatura = json[0].prediccion.dia[dia].temperatura;
                        let listaViento =  json[0].prediccion.dia[dia].vientoAndRachaMax;
                         /// cargamos listado de días
                        json[0].prediccion.dia.forEach(dia => {
                              this.listaDias.push({
                                    dia: dia.fecha,
                                    ocaso: dia.ocaso
                              });
                        });
                        // columnas que queremos mostrar en la tabla (field nombre del campo donde está el valor, y label nombre que queremos mostrar en la tabla)
                        this.columnasTh = [
                              {field: 'hora', label: 'Hora'},
                              {field: 'temperatura', label: 'Temperatura'},
                              {field: 'viento', label: 'Viento'},
                              {field: 'rachaMax', label: 'Racha máxima'}
                        ];
                        listaTemperatura.forEach(temperatura=> {
                              let tdItem = {
                                    hora: temperatura.periodo,
                                    temperatura: temperatura.value,
                                    viento: null,
                                    rachaMax: null
                              };

                              listaViento.forEach(viento => {
                                    if( viento.periodo === temperatura.periodo ) {
                                          if(viento.value !== undefined ) {                                          
                                                tdItem.rachaMax = viento.value;
                                          }
                                          if(viento.direccion  !== undefined  && viento.direccion.length > 0
                                                && viento.velocidad  !== undefined  && viento.velocidad.length > 0) {
                                                tdItem.viento = viento.velocidad[0] + '-' + viento.direccion[0];
                                          }
                                    }
                              });

                              this.columnasTd.push(tdItem);
                        });
                        const params = {
                              columnasTh: this.columnasTh,
                              columnasTd: this.columnasTd
                        };
                        console.log(params);
                        this.panelTabla.innerHTML = this.panelTabla.innerHTML + ` <tabla-aemet thcols='` + JSON.stringify(this.columnasTh) + `' tdcols='` + JSON.stringify(this.columnasTd) + `'></tabla-aemet>`;/* */
                  });
            });   
      }    
}
const aemet = new AemetApi();

aemet.botonHoy.addEventListener('click', function(){ aemet.cargarTemperatura(0)}); 
aemet.botonManyana.addEventListener('click', function(){ aemet.cargarTemperatura(1)});
aemet.botonPasadoManyana.addEventListener('click', function(){ aemet.cargarTemperatura(2)});

