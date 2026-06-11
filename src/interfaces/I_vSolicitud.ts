import Cl_mServicio from "../models/Cl_mServicio.js";

export interface I_vSolicitud {
  get nombreCliente(): string;
  get codigo(): string;
  get cantidad(): number;
  get metodoPago(): string;
  get pmCedula(): string;
  get pmTelefono(): string;
  get pmBanco(): string;
  get pmRef(): string;

  onVerProductos(callback: () => void): void;
  onAgregarItem(callback: () => void): void;
  onEliminarItem(callback: () => void): void;
  onHacerPedido(callback: () => void): void;

  mostrarProductos(servicios: Cl_mServicio[]): void;
  mostrarAgregados(items: any[]): void;
  mostrarTotales(totalUsd: number, tasaBcv: number, totalBs: number): void;
  toggleProductos(): void;
  limpiarFormulario(): void;
}
