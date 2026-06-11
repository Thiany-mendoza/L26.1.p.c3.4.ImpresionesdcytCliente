import I_vPersonal from "../interfaces/I_vPersonal.js";
import Cl_mServicio from "../models/Cl_mServicio.js";
import sServicios from "../services/Cl_sServicios.js";
import sPedidos from "../services/Cl_sPedidos.js";

export default class Cl_cPersonal {
  private vista: I_vPersonal;
  private tasaBCV: number = 30.00;

  constructor({ vista }: { vista: I_vPersonal }) {
    this.vista = vista;

    // Menu principal
    this.vista.onServiciosClick(() => this.mostrarServiciosPanel());
    this.vista.onPedidosClick(() => this.mostrarPedidosPanel());
    this.vista.onTasaBcvClick(() => this.onEditarTasaBcv());

    // Panel Servicios
    this.vista.onAgregarServicio(() => this.onAgregarServicio());
    this.vista.onEliminarServicio(() => this.onEliminarServicio());
    this.vista.onBuscarServicio(() => this.onBuscarServicio());
    this.vista.onVolverServicio(() => this.volverAlMenu());

    // Panel Pedidos
    this.vista.onAceptarPedido(() => this.onActualizarEstadoPedido("Aceptado"));
    this.vista.onCancelarPedido(() => this.onActualizarEstadoPedido("Cancelado"));
    this.vista.onProcesarPedido(() => this.onActualizarEstadoPedido("Procesado"));
    this.vista.onVolverPedido(() => this.volverAlMenu());

    this.cargarTasa();
    this.volverAlMenu();
  }

  private cargarTasa() {
    const tasaStr = localStorage.getItem("tasaBCV");
    if (tasaStr) {
      this.tasaBCV = parseFloat(tasaStr) || 30.00;
    } else {
      this.tasaBCV = 30.00;
      localStorage.setItem("tasaBCV", "30.00");
    }
    this.vista.actualizarTasa(this.tasaBCV);
  }

  private onEditarTasaBcv() {
    const entrada = prompt("Ingrese la tasa BCV actual (Bs/$):", this.tasaBCV.toFixed(2));
    if (entrada !== null) {
      const nuevaTasa = parseFloat(entrada);
      if (nuevaTasa > 0) {
        this.tasaBCV = nuevaTasa;
        localStorage.setItem("tasaBCV", nuevaTasa.toString());
        this.vista.actualizarTasa(this.tasaBCV);
        alert(`Tasa BCV actualizada con éxito a ${nuevaTasa.toFixed(2)} Bs/$`);
      } else {
        alert("Por favor, ingrese un valor de tasa válido y mayor a 0.");
      }
    }
  }

  private volverAlMenu() {
    this.cargarTasa();
    this.vista.mostrarPanel("menu");
  }

  private async mostrarServiciosPanel() {
    this.vista.mostrarPanel("servicios");
    await this.cargarServicios();
  }

  private async cargarServicios() {
    const res = await sServicios.getServicios();
    if (res.ok) {
      this.vista.mostrarServicios(res.tabla);
      const cantidad = await sServicios.cantidadServicios();
      this.vista.mostrarCantidadServicios(cantidad);
    } else {
      alert("Error al cargar la lista de servicios.");
    }
  }

  private async onAgregarServicio() {
    const codigo = this.vista.codigoServicio;
    const nombre = this.vista.nombreServicio;
    const precio = this.vista.precioServicio;

    if (!codigo || !nombre || precio <= 0) {
      alert("Por favor, complete todos los campos de servicio con datos válidos.");
      return;
    }

    const existe = await sServicios.existe(codigo);
    if (existe.ok && existe.existe) {
      alert(`El servicio con código ${codigo} ya existe.`);
      return;
    }

    const nuevoServicio = new Cl_mServicio({
      codigo,
      nombre,
      precio,
    });

    const res = await sServicios.agregar(nuevoServicio);
    alert(res.mensaje);
    if (res.ok) {
      this.vista.limpiarInputsServicios();
      await this.cargarServicios();
    }
  }

  private async onEliminarServicio() {
    const codigo = this.vista.codigoServicio;
    if (!codigo) {
      alert("Por favor, ingrese el código del servicio a eliminar.");
      return;
    }

    const res = await sServicios.eliminar(codigo);
    alert(res.mensaje);
    if (res.ok) {
      this.vista.limpiarInputsServicios();
      await this.cargarServicios();
    }
  }

  private async onBuscarServicio() {
    const codigo = this.vista.codigoServicio;
    if (!codigo) {
      alert("Por favor, ingrese el código del servicio a buscar.");
      return;
    }

    const servicio = await sServicios.buscarPorReferencia(codigo);
    if (servicio) {
      this.vista.llenarFormularioServicio(servicio.nombre, servicio.precio);
      alert(`Servicio encontrado: ${servicio.nombre} ($${servicio.precio.toFixed(2)})`);
    } else {
      alert(`Servicio con código ${codigo} no encontrado.`);
    }
  }

  private async mostrarPedidosPanel() {
    this.vista.mostrarPanel("pedidos");
    await this.cargarPedidos();
  }

  private async cargarPedidos() {
    const res = await sPedidos.getPedidos();
    if (res.ok) {
      this.vista.mostrarPedidos(res.tabla);
    } else {
      alert("Error al cargar la lista de pedidos.");
    }
  }

  private async onActualizarEstadoPedido(nuevoEstado: "Aceptado" | "Cancelado" | "Procesado") {
    const idPedido = this.vista.idPedido;
    if (!idPedido) {
      alert("Por favor, ingrese el ID del pedido.");
      return;
    }

    const res = await sPedidos.actualizarEstado(idPedido, nuevoEstado);
    alert(res.mensaje);
    if (res.ok) {
      this.vista.limpiarInputsPedidos();
      await this.cargarPedidos();
    }
  }
}
