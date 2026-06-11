import Cl_mServicio from "../models/Cl_mServicio.js";
import Cl_mPedido from "../models/Cl_mPedido.js";

export default interface I_vPersonal {
  get codigoServicio(): string;
  get nombreServicio(): string;
  get precioServicio(): number;
  get idPedido(): string;

  onServiciosClick(callback: () => void): void;
  onPedidosClick(callback: () => void): void;
  onTasaBcvClick(callback: () => void): void;

  onAgregarServicio(callback: () => void): void;
  onEliminarServicio(callback: () => void): void;
  onBuscarServicio(callback: () => void): void;
  onVolverServicio(callback: () => void): void;

  onAceptarPedido(callback: () => void): void;
  onCancelarPedido(callback: () => void): void;
  onProcesarPedido(callback: () => void): void;
  onVolverPedido(callback: () => void): void;

  mostrarPanel(panelName: "menu" | "servicios" | "pedidos"): void;
  actualizarTasa(tasa: number): void;
  mostrarServicios(servicios: Cl_mServicio[]): void;
  mostrarCantidadServicios(cantidad: number): void;
  llenarFormularioServicio(nombre: string, precio: number): void;
  mostrarPedidos(pedidos: Cl_mPedido[]): void;
  limpiarInputsServicios(): void;
  limpiarInputsPedidos(): void;
}
