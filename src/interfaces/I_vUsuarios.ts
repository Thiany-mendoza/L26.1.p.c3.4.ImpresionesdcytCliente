import Cl_mUsuario from "../models/Cl_mUsuario.js";

export default interface I_vUsuarios {
  get cedula(): string;
  get nombre(): string;
  onAgregar(callback: () => void): void;
  onVolver(callback: () => void): void;
  mostrar(): void;
  ocultar(): void;
  mostrarEstudiantes(usuarios: Cl_mUsuario[]): void; // We keep the method name or adapt it. Keeping it as 'mostrarEstudiantes' or changing to 'mostrarUsuarios'? Let's keep it as 'mostrarEstudiantes' to minimize change or change to 'mostrarUsuarios' for consistency. Let's use 'mostrarUsuarios'!
  limpiarInputs(): void;
}
