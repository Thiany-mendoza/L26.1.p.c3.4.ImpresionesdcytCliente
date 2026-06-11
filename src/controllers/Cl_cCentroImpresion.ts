import I_vCentroImpresion from "../interfaces/I_vCentroImpresion.js";
import solicitudesService from "../services/Cl_sCentroImpresion.js";
import solicitudService from "../services/Cl_sSolicitud.js";
import sUsuarios from "../services/Cl_sUsuarios.js";
import Cl_mCentroImpresion from "../models/Cl_mCentroImpresion.js";
import Cl_mSolicitud from "../models/Cl_mSolicitud.js";

export default class Cl_cCentroImpresion {
  private modelo: Cl_mCentroImpresion;
  private vista: I_vCentroImpresion;
  private volverCallback: () => void;
  private usuariosMap: Map<string, string> = new Map();

  constructor({
    modelo,
    vista,
    volverCallback,
  }: {
    modelo: Cl_mCentroImpresion;
    vista: I_vCentroImpresion;
    volverCallback: () => void;
  }) {
    this.modelo = modelo;
    this.vista = vista;
    this.volverCallback = volverCallback;

    this.vista.onRecargar(() => this.btRecargarOnClick());
    this.vista.onChangeSoloCorrectos(() => this.onChangeSoloCorrectos());
    this.vista.onVolver(() => this.onVolver());
    this.vista.mostrar();
    this.btRecargarOnClick();
  }

  public onChangeSoloCorrectos() {
    this.btRecargarOnClick();
  }

  public onVolver() {
    this.vista.ocultar();
    this.volverCallback();
  }

  public async btRecargarOnClick() {
    // 1. Fetch user list to resolve names dynamically
    let resUsuarios = await sUsuarios.getUsuarios();
    if (resUsuarios.ok) {
      this.usuariosMap.clear();
      resUsuarios.tabla.forEach((u: any) => {
        if (u.cedula && u.nombre) {
          this.usuariosMap.set(u.cedula.toString(), u.nombre);
        }
      });
    }

    // 2. Fetch solicitudes
    let resultado = await solicitudesService.getSolicitudes();
    if (resultado.ok === false) {
      alert("Error: No se pudo conectar con el servidor");
      return;
    }
    this.modelo.setSolicitudes(resultado.tabla);
    this.actualizarVista();
  }

  public resolverNombreUsuario(cedula: string): string {
    return this.usuariosMap.get(cedula) || "No registrado";
  }

  public actualizarVista() {
   
    const solicitudesFiltradas = this.modelo.getSolicitudes(this.vista.soloCorrectos);
    

    this.vista.mostrarSolicitudes(
      solicitudesFiltradas,
      (cedula) => this.resolverNombreUsuario(cedula),
      (sol) => this.validarPago(sol),
      (sol) => this.validarDoc(sol),
      (sol) => this.aprobarOrden(sol),
      (sol) => this.completar(sol),
    );
    const total = this.modelo.calcularIngresoTotal();
    const ingresoImpresion = this.modelo.calcularIngresoPorTipo("Impresión");
    const pctImpresion = this.modelo.calcularPorcentajeIngresoPorTipo("Impresión");
    const ingresoCopia = this.modelo.calcularIngresoPorTipo("Copia");
    const pctCopia = this.modelo.calcularPorcentajeIngresoPorTipo("Copia");

    this.vista.mostrarEstadisticas(
      total,
      ingresoImpresion,
      pctImpresion,
      ingresoCopia,
      pctCopia
    );
  }

  public async validarPago(sol: Cl_mSolicitud) {
    sol.pagoValidado = true;
    if (!sol.documentoRecibido) {
      sol.estado = "Esperando documento";
    }
    let res = await solicitudService.actualizar(sol);
    alert(res.mensaje);
    this.btRecargarOnClick();
  }

  public async validarDoc(sol: Cl_mSolicitud) {
    sol.documentoRecibido = true;
    let res = await solicitudService.actualizar(sol);
    alert(res.mensaje);
    this.btRecargarOnClick();
  }

  public async aprobarOrden(sol: Cl_mSolicitud) {
    if (!sol.pagoValidado || !sol.documentoRecibido) {
      alert(
        "Debe validar el pago y la recepción del documento antes de aprobar.",
      );
      return;
    }
    sol.estado = "Imprimiendo";
    let res = await solicitudService.actualizar(sol);
    alert(res.mensaje);
    this.btRecargarOnClick();
  }

  public async completar(sol: Cl_mSolicitud) {
    if (sol.estado !== "Imprimiendo") {
      alert("La orden no está en proceso de impresión.");
      return;
    }
    sol.estado = "Disponible";
    let res = await solicitudService.actualizar(sol);
    alert(res.mensaje);
    this.btRecargarOnClick();
  }
}
