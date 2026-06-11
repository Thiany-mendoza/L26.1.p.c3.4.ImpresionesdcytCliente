export default class Cl_vUsuarios {
    ui;
    inCedula;
    inNombre;
    btAgregar;
    btVolver;
    tblRegistros;
    constructor() {
        this.ui = document.getElementById("estudiantes");
        this.inCedula = document.getElementById("estudiantes_inCedula");
        this.inNombre = document.getElementById("estudiantes_inNombre");
        this.btAgregar = document.getElementById("estudiantes_btAgregar");
        this.btVolver = document.getElementById("estudiantes_btVolver");
        this.tblRegistros = document.getElementById("estudiantes_tblRegistros");
    }
    get cedula() {
        return this.inCedula.value.trim();
    }
    get nombre() {
        return this.inNombre.value.trim();
    }
    onAgregar(callback) {
        this.btAgregar.onclick = callback;
    }
    onVolver(callback) {
        this.btVolver.onclick = callback;
    }
    mostrar() {
        this.ui.removeAttribute("hidden");
    }
    ocultar() {
        this.ui.setAttribute("hidden", "true");
    }
    mostrarEstudiantes(usuarios) {
        this.tblRegistros.innerHTML = "";
        usuarios.forEach((usuario) => {
            this.tblRegistros.innerHTML += `<tr>
        <td>${usuario.cedula}</td>
        <td>${usuario.nombre}</td>
      </tr>`;
        });
    }
    limpiarInputs() {
        this.inCedula.value = "";
        this.inNombre.value = "";
    }
}
//# sourceMappingURL=Cl_vUsuarios.js.map