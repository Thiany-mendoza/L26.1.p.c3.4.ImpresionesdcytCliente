import I_vCentroImpresion from "../interfaces/I_vCentroImpresion.js";
import Cl_mSolicitud from "../models/Cl_mSolicitud.js";

export default class Cl_vCentroImpresion implements I_vCentroImpresion {
  ui: HTMLDivElement;
  btRecargar: HTMLButtonElement;
  btVolver: HTMLButtonElement;
  chkSoloCorrectos: HTMLInputElement;
  tblRegistros: HTMLTableElement;
  txtIngresoTotal: HTMLElement;
  txtIngresoImpresiones: HTMLElement;
  pctImpresiones: HTMLElement;
  txtIngresoCopias: HTMLElement;
  pctCopias: HTMLElement;

  constructor() {
    this.ui = document.getElementById("entregas") as HTMLDivElement;
    this.tblRegistros = document.getElementById(
      "entregas_tblRegistros",
    ) as HTMLTableElement;
    this.btRecargar = document.getElementById(
      "entregas_btRecargar",
    ) as HTMLButtonElement;
    this.btVolver = document.getElementById(
      "entregas_btVolver",
    ) as HTMLButtonElement;
    this.chkSoloCorrectos = document.getElementById(
      "entregas_chkSoloCorrectos",
    ) as HTMLInputElement;
    this.chkSoloCorrectos.onchange = () => this.onChangeSoloCorrectos(() => {});
    this.txtIngresoTotal = document.getElementById("stats_txtIngresoTotal") as HTMLElement;
    this.txtIngresoImpresiones = document.getElementById("stats_txtIngresoImpresiones") as HTMLElement;
    this.pctImpresiones = document.getElementById("stats_pctImpresiones") as HTMLElement;
    this.txtIngresoCopias = document.getElementById("stats_txtIngresoCopias") as HTMLElement;
    this.pctCopias = document.getElementById("stats_pctCopias") as HTMLElement;
  }

  public get soloCorrectos(): boolean {
    return this.chkSoloCorrectos.checked;
  }

  public onChangeSoloCorrectos(callback: () => void): void {
    this.chkSoloCorrectos.onchange = callback;
  }

  public onRecargar(callback: () => void): void {
    this.btRecargar.onclick = callback;
  }

  public onVolver(callback: () => void): void {
    this.btVolver.onclick = callback;
  }

  public mostrarSolicitudes(
    solicitudes: Cl_mSolicitud[],
    resolverNombre: (cedula: string) => string,
    onValidarPago: (sol: Cl_mSolicitud) => void,
    onValidarDoc: (sol: Cl_mSolicitud) => void,
    onAprobarOrden: (sol: Cl_mSolicitud) => void,
    onCompletar: (sol: Cl_mSolicitud) => void,
  ): void {
    this.tblRegistros.innerHTML = "";
    solicitudes.forEach((sol, index) => {
      const tr = document.createElement("tr");

      const nombreEstudiante = resolverNombre(sol.cedulaUsuario);

      tr.innerHTML = `
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${ index + 1 }</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${sol.cedulaUsuario}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${nombreEstudiante}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${sol.tipo}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${sol.nombreDocumento}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${sol.cantCopias}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${sol.pmCedula}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${sol.pmTelefono}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${sol.pmBanco || "N/A"}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${sol.pmRef}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">$${sol.pmMonto.toFixed(2)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${sol.estado}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">
          <button class="btn-val-pago" ${sol.pagoValidado ? "disabled" : ""}>Validar Pago</button>
          <button class="btn-val-doc" ${sol.documentoRecibido ? "disabled" : ""}>Recibir Doc</button>
          <button class="btn-aprobar" ${sol.pagoValidado && sol.documentoRecibido && (sol.estado === "Verificando pago" || sol.estado === "Esperando documento") ? "" : "disabled"}>Aprobar</button>
          <button class="btn-completar" ${sol.estado === "Imprimiendo" ? "" : "disabled"}>Listo</button>
        </td>
      `;

      const btnValPago = tr.querySelector(".btn-val-pago") as HTMLButtonElement;
      const btnValDoc = tr.querySelector(".btn-val-doc") as HTMLButtonElement;
      const btnAprobar = tr.querySelector(".btn-aprobar") as HTMLButtonElement;
      const btnCompletar = tr.querySelector(
        ".btn-completar",
      ) as HTMLButtonElement;

      btnValPago.onclick = () => onValidarPago(sol);
      btnValDoc.onclick = () => onValidarDoc(sol);
      btnAprobar.onclick = () => onAprobarOrden(sol);
      btnCompletar.onclick = () => onCompletar(sol);

      this.tblRegistros.appendChild(tr);
    });
  }

  public mostrar() {
    this.ui.removeAttribute("hidden");
  }

  public ocultar() {
    this.ui.setAttribute("hidden", "true");
  }

  public mostrarEstadisticas(
    total: number,
    ingresoImpresion: number,
    pctImpresion: number,
    ingresoCopia: number,
    pctCopia: number,
  ): void {
    this.txtIngresoTotal.innerText = `$${total.toFixed(2)}`;
    this.txtIngresoImpresiones.innerText = `$${ingresoImpresion.toFixed(2)}`;
    this.pctImpresiones.innerText = `${pctImpresion.toFixed(2)}%`;
    this.txtIngresoCopias.innerText = `$${ingresoCopia.toFixed(2)}`;
    this.pctCopias.innerText = `${pctCopia.toFixed(2)}%`;
  }
}
