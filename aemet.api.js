class AemetApi {
      constructor (){
            this.apiKey = '/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYW5jeW1tY0Bob3RtYWlsLmVzIiwianRpIjoiZTEyZGFjM2UtZTY3ZC00YWJkLWE3YjMtYTg0NTUwZjgzM2IwIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NDkxNDQxMzUsInVzZXJJZCI6ImUxMmRhYzNlLWU2N2QtNGFiZC1hN2IzLWE4NDU1MGY4MzNiMCIsInJvbGUiOiIifQ.Af1VtfYDHZxbHiPxwYxaokIonwH7YLCLhVVzQ7MYckY';
            this.aemetApiUrl = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/46250';
            this.tabla = document.querySelector('#panelPrincipal .tabla-temperatura tbody');
            this.cargarTempetura();
      }

      

      cargarTempetura(){
      fetch(this.aemetApiUrl + this.apiKey)
      .then(response => response.json())
      .then(json => {
  		console.log()
  	      fetch(json.datos)
  			.then( response => response.json())
			.then(json => {
                json[0].prediccion.dia[1].temperatura.forEach(temperatura=> {
                    let tr = document.createElement('tr');
                    let tdhora = document.createElement('td');
                    let tdtemperatura = document.createElement('td');
                    tdhora.innerText = temperatura.periodo;
                    tr.append(tdhora);
                    tdtemperatura.innerText = temperatura.value;
                    tr.append(tdtemperatura);
                    this.tabla.append(tr);
                    console.log(temperatura);
                   
                    
                });

                              
                  });
          });
		
      }


}



const aemet = new AemetApi();
