// Clase para manejar las notas
class NotasManager {
    constructor() {
        this.notas = JSON.parse(localStorage.getItem('notas')) || [];
        this.form = document.getElementById('nota-form');
        this.listaNotas = document.getElementById('lista-notas');
        this.setupEventListeners();
        this.renderNotas();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.agregarNota(e));
    }

    agregarNota(e) {
        e.preventDefault();
        const titulo = document.getElementById('nota-titulo').value;
        const contenido = document.getElementById('nota-contenido').value;
        
        const nuevaNota = {
            id: Date.now(),
            titulo,
            contenido,
            fecha: new Date().toLocaleDateString()
        };

        this.notas.unshift(nuevaNota);
        this.guardarNotas();
        this.renderNotas();
        this.form.reset();
    }

    guardarNotas() {
        localStorage.setItem('notas', JSON.stringify(this.notas));
    }

    renderNotas() {
        this.listaNotas.innerHTML = this.notas.map(nota => `
            <div class="nota" data-id="${nota.id}">
                <h3>${nota.titulo}</h3>
                <p>${nota.contenido}</p>
                <div class="fecha">${nota.fecha}</div>
            </div>
        `).join('');
    }
}

// Función que se ejecuta cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('Documento cargado, iniciando aplicación...');
    // Inicializar el contador
    let contador = 0;
    const contadorElement = document.querySelector('.contador');
    
    // Actualizar el contador cada segundo
    setInterval(() => {
        contador++;
        if (contadorElement) {
            contadorElement.textContent = `Tiempo con mi bebé: ${contador} segundos`;
        }
    }, 1000);

    // Inicializar el sistema de notas
    const notasManager = new NotasManager();
});
