class TablaAemet extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      let shadowRoot = this.attachShadow({ mode: "open" });
      const t = document.querySelector("#tablaAemet");
      const instance = t.content.cloneNode(true);
      this.cargarDatosTabla(instance);
      shadowRoot.appendChild(instance);
    }
   
    disconnectedCallback() {
        console.log('El elemento se ha retirado del DOM');
    }

    attributeChangedCallback(){
      console.log('El elemento se ha cambiado');
        
    }

    cargarDatosTabla(instance) {
      const tbody = instance.querySelector("#tabla-aemet tbody");
      const thead = instance.querySelector("#tabla-aemet thead");
      const thList = JSON.parse(this.getAttribute('thcols'));
      const tdList= JSON.parse(this.getAttribute('tdcols'));

      // {field: 'hora', label: 'Hora'},
      // {field: 'temperatura', label: 'Temperatura'},
      // {field: 'viento', label: 'Viento'},
      // {field: 'rachaMax', label: 'Racha máxima'}

      // DATOS HEADER
      let trThead = document.createElement('tr');
      thList.forEach(th => {
        let thItem = document.createElement('th');
        thItem.innerText = th.label;
        trThead.append(thItem);
      });
      thead.append(trThead);

      // DATOS FILA BODY
      tdList.forEach(rowData => {
        let trTd = document.createElement('tr');
        thList.forEach(th => {
          let columna  = document.createElement('td');
          columna.innerText = rowData[th.field];
          trTd.append(columna);          
        });
        
        // trTd.append(rachaMax);
        tbody.append(trTd);
        this.setAttribute('thcols', 'dataList');
        this.removeAttribute('thcols');
        this.setAttribute('tdcols', 'dataList');
        this.removeAttribute('tdcols');
      });
    }
  }
  
  window.customElements.define("tabla-aemet", TablaAemet);