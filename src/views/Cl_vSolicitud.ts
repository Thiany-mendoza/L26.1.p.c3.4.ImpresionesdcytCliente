import { I_vSolicitud } from "../interfaces/I_vSolicitud.js";
import Cl_mServicio from "../models/Cl_mServicio.js";

export default class Cl_vSolicitud implements I_vSolicitud {
  inNombre: HTMLInputElement;
  btVerProductos: HTMLButtonElement;
  panelProductos: HTMLDivElement;
  tblProductos: HTMLTableSectionElement;
  inCodigo: HTMLInputElement;
  inCantidad: HTMLInputElement;
  btAgregarItem: HTMLButtonElement;
  btEliminarItem: HTMLButtonElement;
  lstAgregados: HTMLUListElement;
  txtTotalUsd: HTMLElement;
  txtTasaBcv: HTMLElement;
  txtTotalBs: HTMLElement;
  txtTotalBsDup: HTMLElement;
  inMetodo: HTMLSelectElement;
  panelPagoMovil: HTMLDivElement;
  inPmCedula: HTMLInputElement;
  inPmTelefono: HTMLInputElement;
  inPmBanco: HTMLInputElement;
  inPmRef: HTMLInputElement;
  btHacerPedido: HTMLButtonElement;

  constructor() {
    this.inNombre = document.getElementById("cliente_inNombre") as HTMLInputElement;
    this.btVerProductos = document.getElementById("cliente_btVerProductos") as HTMLButtonElement;
    this.panelProductos = document.getElementById("cliente_panelProductos") as HTMLDivElement;
    this.tblProductos = document.getElementById("cliente_tblProductos") as HTMLTableSectionElement;
    this.inCodigo = document.getElementById("cliente_inCodigo") as HTMLInputElement;
    this.inCantidad = document.getElementById("cliente_inCantidad") as HTMLInputElement;
    this.btAgregarItem = document.getElementById("cliente_btAgregarItem") as HTMLButtonElement;
    this.btEliminarItem = document.getElementById("cliente_btEliminarItem") as HTMLButtonElement;
    this.lstAgregados = document.getElementById("cliente_lstAgregados") as HTMLUListElement;
    this.txtTotalUsd = document.getElementById("cliente_txtTotalUsd") as HTMLElement;
    this.txtTasaBcv = document.getElementById("cliente_txtTasaBcv") as HTMLElement;
    this.txtTotalBs = document.getElementById("cliente_txtTotalBs") as HTMLElement;
    this.txtTotalBsDup = document.getElementById("cliente_txtTotalBsDup") as HTMLElement;
    this.inMetodo = document.getElementById("cliente_inMetodo") as HTMLSelectElement;
    this.panelPagoMovil = document.getElementById("cliente_panelPagoMovil") as HTMLDivElement;
    this.inPmCedula = document.getElementById("cliente_inPmCedula") as HTMLInputElement;
    this.inPmTelefono = document.getElementById("cliente_inPmTelefono") as HTMLInputElement;
    this.inPmBanco = document.getElementById("cliente_inPmBanco") as HTMLInputElement;
    this.inPmRef = document.getElementById("cliente_inPmRef") as HTMLInputElement;
    this.btHacerPedido = document.getElementById("cliente_btHacerPedido") as HTMLButtonElement;

    // Controlar visibilidad del panel de Pago Móvil según método de pago
    this.inMetodo.onchange = () => {
      if (this.inMetodo.value === "Efectivo") {
        this.panelPagoMovil.style.display = "none";
      } else {
        this.panelPagoMovil.style.display = "block";
      }
    };
  }

  public get nombreCliente(): string {
    return this.inNombre.value.trim();
  }

  public get codigo(): string {
    return this.inCodigo.value.trim().toUpperCase();
  }

  public get cantidad(): number {
    return parseInt(this.inCantidad.value) || 0;
  }

  public get metodoPago(): string {
    return this.inMetodo.value;
  }

  public get pmCedula(): string {
    return this.inPmCedula.value.trim();
  }

  public get pmTelefono(): string {
    return this.inPmTelefono.value.trim();
  }

  public get pmBanco(): string {
    return this.inPmBanco.value.trim();
  }

  public get pmRef(): string {
    return this.inPmRef.value.trim();
  }

  public onVerProductos(callback: () => void): void {
    this.btVerProductos.onclick = callback;
  }

  public onAgregarItem(callback: () => void): void {
    this.btAgregarItem.onclick = callback;
  }

  public onEliminarItem(callback: () => void): void {
    this.btEliminarItem.onclick = callback;
  }

  public onHacerPedido(callback: () => void): void {
    this.btHacerPedido.onclick = callback;
  }

  public mostrarProductos(servicios: Cl_mServicio[]): void {
    this.tblProductos.innerHTML = "";
    servicios.forEach((s) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${s.codigo}</td>
        <td>${s.nombre}</td>
        <td>${s.precio.toFixed(2)}</td>
      `;
      this.tblProductos.appendChild(tr);
    });
  }

  public mostrarAgregados(items: any[]): void {
    this.lstAgregados.innerHTML = "";
    if (items.length === 0) {
      this.lstAgregados.innerHTML = `<li style="color: #999;">Ningún servicio agregado</li>`;
      return;
    }
    items.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `+ ID: ${item.codigo} - ${item.nombre}, $${item.precio.toFixed(2)} x ${item.cantidad} = $${item.subtotal.toFixed(2)}`;
      this.lstAgregados.appendChild(li);
    });
  }

  public mostrarTotales(totalUsd: number, tasaBcv: number, totalBs: number): void {
    this.txtTotalUsd.innerText = totalUsd.toFixed(2);
    this.txtTasaBcv.innerText = tasaBcv.toFixed(2);
    this.txtTotalBs.innerText = totalBs.toFixed(2);
    this.txtTotalBsDup.innerText = totalBs.toFixed(2);
  }

  public toggleProductos(): void {
    if (this.panelProductos.hasAttribute("hidden")) {
      this.panelProductos.removeAttribute("hidden");
    } else {
      this.panelProductos.setAttribute("hidden", "true");
    }
  }

  public limpiarFormulario(): void {
    this.inNombre.value = "";
    this.inCodigo.value = "";
    this.inCantidad.value = "1";
    this.inPmCedula.value = "";
    this.inPmTelefono.value = "";
    this.inPmBanco.value = "";
    this.inPmRef.value = "";
    this.lstAgregados.innerHTML = "";
    this.txtTotalUsd.innerText = "0.00";
    this.txtTotalBs.innerText = "0.00";
    this.txtTotalBsDup.innerText = "0.00";
  }
}
