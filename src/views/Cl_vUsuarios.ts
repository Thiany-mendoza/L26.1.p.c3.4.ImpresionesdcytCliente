import I_vUsuarios from "../interfaces/I_vUsuarios.js";
import Cl_mUsuario from "../models/Cl_mUsuario.js";

export default class Cl_vUsuarios implements I_vUsuarios {
  ui: HTMLElement;
  inCedula: HTMLInputElement;
  inNombre: HTMLInputElement;
  btAgregar: HTMLButtonElement;
  btVolver: HTMLButtonElement;
  tblRegistros: HTMLTableSectionElement;

  constructor() {
    this.ui = document.getElementById("estudiantes") as HTMLElement;
    this.inCedula = document.getElementById(
      "estudiantes_inCedula",
    ) as HTMLInputElement;
    this.inNombre = document.getElementById(
      "estudiantes_inNombre",
    ) as HTMLInputElement;
    this.btAgregar = document.getElementById(
      "estudiantes_btAgregar",
    ) as HTMLButtonElement;
    this.btVolver = document.getElementById(
      "estudiantes_btVolver",
    ) as HTMLButtonElement;
    this.tblRegistros = document.getElementById(
      "estudiantes_tblRegistros",
    ) as HTMLTableSectionElement;
  }

  get cedula(): string {
    return this.inCedula.value.trim();
  }

  get nombre(): string {
    return this.inNombre.value.trim();
  }

  onAgregar(callback: () => void): void {
    this.btAgregar.onclick = callback;
  }

  onVolver(callback: () => void): void {
    this.btVolver.onclick = callback;
  }

  mostrar(): void {
    this.ui.removeAttribute("hidden");
  }

  ocultar(): void {
    this.ui.setAttribute("hidden", "true");
  }

  mostrarEstudiantes(usuarios: Cl_mUsuario[]): void {
    this.tblRegistros.innerHTML = "";
    usuarios.forEach((usuario) => {
      this.tblRegistros.innerHTML += `<tr>
        <td>${usuario.cedula}</td>
        <td>${usuario.nombre}</td>
      </tr>`;
    });
  }

  limpiarInputs(): void {
    this.inCedula.value = "";
    this.inNombre.value = "";
  }
}
