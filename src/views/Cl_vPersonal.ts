import I_vPersonal from "../interfaces/I_vPersonal.js";
import Cl_mServicio from "../models/Cl_mServicio.js";
import Cl_mPedido from "../models/Cl_mPedido.js";

export default class Cl_vPersonal implements I_vPersonal {
  panelMenu: HTMLDivElement;
  panelServicios: HTMLDivElement;
  panelPedidos: HTMLDivElement;

  btMenuServicios: HTMLButtonElement;
  btMenuPedidos: HTMLButtonElement;
  btMenuTasaBcv: HTMLButtonElement;
  txtMenuTasaBcv: HTMLElement;

  inServiciosCodigo: HTMLInputElement;
  inServiciosNombre: HTMLInputElement;
  inServiciosPrecio: HTMLInputElement;
  btServiciosAgregar: HTMLButtonElement;
  btServiciosEliminar: HTMLButtonElement;
  btServiciosBuscar: HTMLButtonElement;
  tblServiciosRegistros: HTMLTableSectionElement;
  btServiciosVolver: HTMLButtonElement;
  txtServiciosCantidad: HTMLElement;

  inPedidosIdPedido: HTMLInputElement;
  btPedidosAceptar: HTMLButtonElement;
  btPedidosCancelar: HTMLButtonElement;
  btPedidosProcesar: HTMLButtonElement;
  lstPedidosRegistros: HTMLUListElement;
  btPedidosVolver: HTMLButtonElement;

  constructor() {
    this.panelMenu = document.getElementById("panelMenu") as HTMLDivElement;
    this.panelServicios = document.getElementById("panelServicios") as HTMLDivElement;
    this.panelPedidos = document.getElementById("panelPedidos") as HTMLDivElement;

    this.btMenuServicios = document.getElementById("menu_btServicios") as HTMLButtonElement;
    this.btMenuPedidos = document.getElementById("menu_btPedidos") as HTMLButtonElement;
    this.btMenuTasaBcv = document.getElementById("menu_btTasaBcv") as HTMLButtonElement;
    this.txtMenuTasaBcv = document.getElementById("menu_txtTasaBcv") as HTMLElement;

    this.inServiciosCodigo = document.getElementById("servicios_inCodigo") as HTMLInputElement;
    this.inServiciosNombre = document.getElementById("servicios_inNombre") as HTMLInputElement;
    this.inServiciosPrecio = document.getElementById("servicios_inPrecio") as HTMLInputElement;
    this.btServiciosAgregar = document.getElementById("servicios_btAgregar") as HTMLButtonElement;
    this.btServiciosEliminar = document.getElementById("servicios_btEliminar") as HTMLButtonElement;
    this.btServiciosBuscar = document.getElementById("servicios_btBuscar") as HTMLButtonElement;
    this.tblServiciosRegistros = document.getElementById("servicios_tblRegistros") as HTMLTableSectionElement;
    this.btServiciosVolver = document.getElementById("servicios_btVolver") as HTMLButtonElement;
    this.txtServiciosCantidad = document.getElementById("servicios_txtCantidad") as HTMLElement;

    this.inPedidosIdPedido = document.getElementById("pedidos_inIdPedido") as HTMLInputElement;
    this.btPedidosAceptar = document.getElementById("pedidos_btAceptar") as HTMLButtonElement;
    this.btPedidosCancelar = document.getElementById("pedidos_btCancelar") as HTMLButtonElement;
    this.btPedidosProcesar = document.getElementById("pedidos_btProcesar") as HTMLButtonElement;
    this.lstPedidosRegistros = document.getElementById("pedidos_lstRegistros") as HTMLUListElement;
    this.btPedidosVolver = document.getElementById("pedidos_btVolver") as HTMLButtonElement;
  }

  public get codigoServicio(): string {
    return this.inServiciosCodigo.value.trim().toUpperCase();
  }

  public get nombreServicio(): string {
    return this.inServiciosNombre.value.trim();
  }

  public get precioServicio(): number {
    return parseFloat(this.inServiciosPrecio.value.trim()) || 0;
  }

  public get idPedido(): string {
    return this.inPedidosIdPedido.value.trim().toUpperCase();
  }

  public onServiciosClick(callback: () => void): void {
    this.btMenuServicios.onclick = callback;
  }

  public onPedidosClick(callback: () => void): void {
    this.btMenuPedidos.onclick = callback;
  }

  public onTasaBcvClick(callback: () => void): void {
    this.btMenuTasaBcv.onclick = callback;
  }

  public onAgregarServicio(callback: () => void): void {
    this.btServiciosAgregar.onclick = callback;
  }

  public onEliminarServicio(callback: () => void): void {
    this.btServiciosEliminar.onclick = callback;
  }

  public onBuscarServicio(callback: () => void): void {
    this.btServiciosBuscar.onclick = callback;
  }

  public onVolverServicio(callback: () => void): void {
    this.btServiciosVolver.onclick = callback;
  }

  public onAceptarPedido(callback: () => void): void {
    this.btPedidosAceptar.onclick = callback;
  }

  public onCancelarPedido(callback: () => void): void {
    this.btPedidosCancelar.onclick = callback;
  }

  public onProcesarPedido(callback: () => void): void {
    this.btPedidosProcesar.onclick = callback;
  }

  public onVolverPedido(callback: () => void): void {
    this.btPedidosVolver.onclick = callback;
  }

  public mostrarPanel(panelName: "menu" | "servicios" | "pedidos"): void {
    this.panelMenu.hidden = panelName !== "menu";
    this.panelServicios.hidden = panelName !== "servicios";
    this.panelPedidos.hidden = panelName !== "pedidos";
  }

  public actualizarTasa(tasa: number): void {
    this.txtMenuTasaBcv.innerText = tasa.toFixed(2);
  }

  public mostrarServicios(servicios: Cl_mServicio[]): void {
    this.tblServiciosRegistros.innerHTML = "";
    servicios.forEach((s) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${s.codigo}</td>
        <td>${s.nombre}</td>
        <td>${s.precio.toFixed(2)}</td>
      `;
      this.tblServiciosRegistros.appendChild(tr);
    });
  }

  public mostrarCantidadServicios(cantidad: number): void {
    this.txtServiciosCantidad.innerText = cantidad.toString();
  }

  public llenarFormularioServicio(nombre: string, precio: number): void {
    this.inServiciosNombre.value = nombre;
    this.inServiciosPrecio.value = precio.toFixed(2);
  }

  public mostrarPedidos(pedidos: Cl_mPedido[]): void {
    this.lstPedidosRegistros.innerHTML = "";
    if (pedidos.length === 0) {
      this.lstPedidosRegistros.innerHTML = `<li style="text-align: center; color: #999;">No hay pedidos registrados</li>`;
      return;
    }

    pedidos.forEach((p) => {
      // Formato según mockup:
      // + ID: R001 - Juan Pérez, 10:15 AM [Estado]
      //   > Impresión Carta Color, 10, $0.30, $3.00
      //   > Total a pagar: $5.00
      //   > Pago móvil - CI: 12345678, Tel: 04121234567, Banco: Mercantil
      const li = document.createElement("li");
      li.style.marginBottom = "15px";

      let statusColor = "#333";
      if (p.estado === "Aceptado") statusColor = "green";
      if (p.estado === "Cancelado") statusColor = "red";
      if (p.estado === "Procesado") statusColor = "blue";

      let html = `<div class="parent-item">+ ID: ${p.idPedido} - ${p.nombreCliente}, ${p.fecha} <span style="color: ${statusColor}; font-size: 11px;">(${p.estado})</span></div>`;

      p.items.forEach((item) => {
        html += `<div class="child-item">> ${item.nombre}, ${item.cantidad}, $${item.precio.toFixed(2)}, $${item.subtotal.toFixed(2)}</div>`;
      });

      html += `<div class="child-item">> Total a pagar: $${p.totalDolar.toFixed(2)} (${p.totalBs.toFixed(2)} Bs)</div>`;

      if (p.metodoPago !== "Efectivo") {
        html += `<div class="child-item">> Pago móvil - CI: ${p.pmCedula}, Tel: ${p.pmTelefono}, Banco: ${p.pmBanco}, Ref: ${p.pmRef}</div>`;
      } else {
        html += `<div class="child-item">> Pago en Efectivo</div>`;
      }

      li.innerHTML = html;
      this.lstPedidosRegistros.appendChild(li);
    });
  }

  public limpiarInputsServicios(): void {
    this.inServiciosCodigo.value = "";
    this.inServiciosNombre.value = "";
    this.inServiciosPrecio.value = "";
  }

  public limpiarInputsPedidos(): void {
    this.inPedidosIdPedido.value = "";
  }
}
