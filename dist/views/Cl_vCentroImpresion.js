export default class Cl_vCentroImpresion {
    ui;
    btRecargar;
    btVolver;
    chkSoloCorrectos;
    tblRegistros;
    txtIngresoTotal;
    txtIngresoImpresiones;
    pctImpresiones;
    txtIngresoCopias;
    pctCopias;
    constructor() {
        this.ui = document.getElementById("entregas");
        this.tblRegistros = document.getElementById("entregas_tblRegistros");
        this.btRecargar = document.getElementById("entregas_btRecargar");
        this.btVolver = document.getElementById("entregas_btVolver");
        this.chkSoloCorrectos = document.getElementById("entregas_chkSoloCorrectos");
        this.chkSoloCorrectos.onchange = () => this.onChangeSoloCorrectos(() => { });
        this.txtIngresoTotal = document.getElementById("stats_txtIngresoTotal");
        this.txtIngresoImpresiones = document.getElementById("stats_txtIngresoImpresiones");
        this.pctImpresiones = document.getElementById("stats_pctImpresiones");
        this.txtIngresoCopias = document.getElementById("stats_txtIngresoCopias");
        this.pctCopias = document.getElementById("stats_pctCopias");
    }
    get soloCorrectos() {
        return this.chkSoloCorrectos.checked;
    }
    onChangeSoloCorrectos(callback) {
        this.chkSoloCorrectos.onchange = callback;
    }
    onRecargar(callback) {
        this.btRecargar.onclick = callback;
    }
    onVolver(callback) {
        this.btVolver.onclick = callback;
    }
    mostrarSolicitudes(solicitudes, resolverNombre, onValidarPago, onValidarDoc, onAprobarOrden, onCompletar) {
        this.tblRegistros.innerHTML = "";
        solicitudes.forEach((sol, index) => {
            const tr = document.createElement("tr");
            const nombreEstudiante = resolverNombre(sol.cedulaUsuario);
            tr.innerHTML = `
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${index + 1}</td>
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
            const btnValPago = tr.querySelector(".btn-val-pago");
            const btnValDoc = tr.querySelector(".btn-val-doc");
            const btnAprobar = tr.querySelector(".btn-aprobar");
            const btnCompletar = tr.querySelector(".btn-completar");
            btnValPago.onclick = () => onValidarPago(sol);
            btnValDoc.onclick = () => onValidarDoc(sol);
            btnAprobar.onclick = () => onAprobarOrden(sol);
            btnCompletar.onclick = () => onCompletar(sol);
            this.tblRegistros.appendChild(tr);
        });
    }
    mostrar() {
        this.ui.removeAttribute("hidden");
    }
    ocultar() {
        this.ui.setAttribute("hidden", "true");
    }
    mostrarEstadisticas(total, ingresoImpresion, pctImpresion, ingresoCopia, pctCopia) {
        this.txtIngresoTotal.innerText = `$${total.toFixed(2)}`;
        this.txtIngresoImpresiones.innerText = `$${ingresoImpresion.toFixed(2)}`;
        this.pctImpresiones.innerText = `${pctImpresion.toFixed(2)}%`;
        this.txtIngresoCopias.innerText = `$${ingresoCopia.toFixed(2)}`;
        this.pctCopias.innerText = `${pctCopia.toFixed(2)}%`;
    }
}
//# sourceMappingURL=Cl_vCentroImpresion.js.map