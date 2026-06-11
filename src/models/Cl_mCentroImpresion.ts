import Cl_mSolicitud from "./Cl_mSolicitud.js";
import Cl_mUsuario from "./Cl_mUsuario.js";

export default class Cl_mCentroImpresion {
  private tarifaPorCopia: number;
  private _solicitudes: Cl_mSolicitud[] = [];
  private _usuarios: Cl_mUsuario[] = [];

  constructor(tarifaPorCopia: number = 0.50) {
    this.tarifaPorCopia = tarifaPorCopia;
  }

  public agregarSolicitud(solicitud: Cl_mSolicitud): void {
    this._solicitudes.push(solicitud);
  }

  public obtenerSolicitudes(): Cl_mSolicitud[] {
    return this._solicitudes;
  }

  public contarSolicitudesPorEstado(estado: string): number {
    return this._solicitudes.filter((sol) => sol.estado === estado).length;
  }

    public setSolicitudes(array: any[]) {
    this._solicitudes = [];
    array.forEach((sol) => {
      this.agregarSolicitud(
        new Cl_mSolicitud({
          idSolicitud: Number(sol.idSolicitud) || Number(sol.id) || 0,
          cedulaUsuario: sol.cedulaUsuario || sol.cedula?.toString() || "",
          nombreDocumento: sol.nombreDocumento || sol.documento || "",
          cantCopias: sol.cantCopias || sol.copias || 0,
          tipo: sol.tipo || "Impresión",
          pmCedula: sol.pmCedula || sol.cedula?.toString() || "",
          pmTelefono: sol.pmTelefono || "",
          pmBanco: sol.pmBanco || "",
          pmRef: sol.pmRef || sol.referencia || "",
          pmMonto: sol.pmMonto || 0,
          estado: sol.estado || "Verificando pago",
          pagoValidado: sol.pagoValidado !== undefined ? sol.pagoValidado : false,
          documentoRecibido: sol.documentoRecibido !== undefined ? sol.documentoRecibido : false,
        }),
      );
    });
    this._solicitudes.sort((a, b) => a.idSolicitud - b.idSolicitud);
  }

  
  public getSolicitudes(soloDisponibles: boolean = false): Cl_mSolicitud[] {
    if (soloDisponibles) {
      return this._solicitudes.filter((sol) => sol.estado === "Disponible");
    }
    return this._solicitudes;
  }

  public setUsuarios(array: any[]) {
    this._usuarios = [];
    array.forEach((usuario) => {
      this._usuarios.push(
        new Cl_mUsuario({
          cedula: usuario.cedula,
          nombre: usuario.nombre,
        }),
      );
    });
  }

  public getUsuarios(): Cl_mUsuario[] {
    return this._usuarios;
  }

  public calcularIngresoTotal(): number {
    return this._solicitudes.reduce((total, sol) => total + sol.pmMonto, 0);
  }

  public calcularIngresoPorTipo(tipo: string): number {
    return this._solicitudes
      .filter((sol) => sol.tipo === tipo)
      .reduce((total, sol) => total + sol.pmMonto, 0);
  }

  public calcularPorcentajeIngresoPorTipo(tipo: string): number {
    const total = this.calcularIngresoTotal();
    if (total === 0) return 0;
    return (this.calcularIngresoPorTipo(tipo) / total) * 100;
  }
}
