class AemetApi {
      constructor (){
            this.apiKey = '/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYW5jeW1tY0Bob3RtYWlsLmVzIiwianRpIjoiZTEyZGFjM2UtZTY3ZC00YWJkLWE3YjMtYTg0NTUwZjgzM2IwIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NDkxNDQxMzUsInVzZXJJZCI6ImUxMmRhYzNlLWU2N2QtNGFiZC1hN2IzLWE4NDU1MGY4MzNiMCIsInJvbGUiOiIifQ.Af1VtfYDHZxbHiPxwYxaokIonwH7YLCLhVVzQ7MYckY';
            this.aemetApiUrl = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/46250';
            this.tbody = document.querySelector('#panelPrincipal .tabla-temperatura tbody');
            this.botonHoy = document.querySelector('#hoy');
            this.botonManyana = document.querySelector('#manyana');
            this.botonPasadoManyana = document.querySelector('#pasadoManyana');
           

      }

      
      
      cargarTemperatura(dia) {
            fetch(this.aemetApiUrl + this.apiKey)
            .then(response => response.json())
            .then(json => {
                  fetch(json.datos)
                  .then( response => response.json())
			.then(json => {
                        this.tbody.innerHTML='';
                        let listaTemperatura = json[0].prediccion.dia[dia].temperatura;
                        let listaViento =  json[0].prediccion.dia[0].vientoAndRachaMax;
                        listaTemperatura.forEach(temperatura=> {
                              let tr = document.createElement('tr');
                              let tdhora = document.createElement('td');
                              let tdtemperatura = document.createElement('td');
                              let tdviento = document.createElement('td');
                    tdhora.innerText = temperatura.periodo + ':00';
                    tr.append(tdhora);
                    tdtemperatura.innerText = temperatura.value + 'º';
                    tr.append(tdtemperatura);
                    /* tdviento.innerText = temperatura.velocidad+ 'km/h'; */
                    tr.append(tdviento);
                    this.tbody.append(tr);
                        });
                        
                        
                  });
            });
            
      }     
    

}



const aemet = new AemetApi();


aemet.botonHoy.addEventListener('click', function(){ aemet.cargarTemperatura(0)}); 
aemet.botonManyana.addEventListener('click', function(){ aemet.cargarTemperatura(1)});
aemet.botonPasadoManyana.addEventListener('click', function(){ aemet.cargarTemperatura(2)});

