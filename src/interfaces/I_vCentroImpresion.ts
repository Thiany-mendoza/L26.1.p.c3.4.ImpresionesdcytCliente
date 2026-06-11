import Cl_mSolicitud from "../models/Cl_mSolicitud.js";

export default interface I_vCentroImpresion {
  get soloCorrectos(): boolean;
  mostrarSolicitudes(
    solicitudes: Cl_mSolicitud[],
    resolverNombre: (cedula: string) => string,
    onValidarPago: (sol: Cl_mSolicitud) => void,
    onValidarDoc: (sol: Cl_mSolicitud) => void,
    onAprobarOrden: (sol: Cl_mSolicitud) => void,
    onCompletar: (sol: Cl_mSolicitud) => void,
  ): void;
  onRecargar(callback: () => void): void;
  onChangeSoloCorrectos(callback: () => void): void;
  onVolver(callback: () => void): void;
  mostrar(): void;
  ocultar(): void;
  mostrarEstadisticas(
    total: number,
    ingresoImpresion: number,
    pctImpresion: number,
    ingresoCopia: number,
    pctCopia: number,
  ): void;
}
