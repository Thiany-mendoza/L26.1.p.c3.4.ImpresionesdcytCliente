import sUsuarios from "../services/Cl_sUsuarios.js";
import I_vUsuarios from "../interfaces/I_vUsuarios.js";
import Cl_mUsuario from "../models/Cl_mUsuario.js";
import Cl_mCentroImpresion from "../models/Cl_mCentroImpresion.js";

export default class Cl_cUsuarios {
  private modelo: Cl_mCentroImpresion;
  private vista: I_vUsuarios;
  private volverCallback: () => void;

  constructor({
    modelo,
    vista,
    volverCallback,
  }: {
    modelo: Cl_mCentroImpresion;
    vista: I_vUsuarios;
    volverCallback: () => void;
  }) {
    this.modelo = modelo;
    this.vista = vista;
    this.volverCallback = volverCallback;
    this.vista.onAgregar(() => this.onAgregar());
    this.vista.onVolver(() => this.onVolver());
    this.vista.mostrar();
    this.cargarUsuarios();
  }

  private async onAgregar() {
    let usuario = new Cl_mUsuario({
      cedula: this.vista.cedula,
      nombre: this.vista.nombre,
    });
    let chkExiste = await sUsuarios.existe(usuario.cedula);
    if (chkExiste.ok === false) {
      alert("Error: No se pudo conectar con el servidor");
      return;
    }
    if (chkExiste.existe) {
      alert("Ya existe un usuario registrado con esa cédula");
      return;
    }
    sUsuarios.agregar(usuario).then((resultado) => {
      alert(resultado.mensaje);
      if (resultado.ok) this.cargarUsuarios();
    });
  }

  private onVolver() {
    this.vista.ocultar();
    this.volverCallback();
  }
  async cargarUsuarios() {
    let resultado = await sUsuarios.getUsuarios();
    if (resultado.ok === false) {
      alert("Error: No se pudo conectar con el servidor");
      return;
    }
    this.modelo.setUsuarios(resultado.tabla);
    this.vista.mostrarEstudiantes(this.modelo.getUsuarios());
  }
}
