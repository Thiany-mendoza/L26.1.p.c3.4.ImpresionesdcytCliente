export default class Cl_vSolicitud {
    inNombre;
    btVerProductos;
    panelProductos;
    tblProductos;
    inCodigo;
    inCantidad;
    btAgregarItem;
    btEliminarItem;
    lstAgregados;
    txtTotalUsd;
    txtTasaBcv;
    txtTotalBs;
    txtTotalBsDup;
    inMetodo;
    panelPagoMovil;
    inPmCedula;
    inPmTelefono;
    inPmBanco;
    inPmRef;
    btHacerPedido;
    constructor() {
        this.inNombre = document.getElementById("cliente_inNombre");
        this.btVerProductos = document.getElementById("cliente_btVerProductos");
        this.panelProductos = document.getElementById("cliente_panelProductos");
        this.tblProductos = document.getElementById("cliente_tblProductos");
        this.inCodigo = document.getElementById("cliente_inCodigo");
        this.inCantidad = document.getElementById("cliente_inCantidad");
        this.btAgregarItem = document.getElementById("cliente_btAgregarItem");
        this.btEliminarItem = document.getElementById("cliente_btEliminarItem");
        this.lstAgregados = document.getElementById("cliente_lstAgregados");
        this.txtTotalUsd = document.getElementById("cliente_txtTotalUsd");
        this.txtTasaBcv = document.getElementById("cliente_txtTasaBcv");
        this.txtTotalBs = document.getElementById("cliente_txtTotalBs");
        this.txtTotalBsDup = document.getElementById("cliente_txtTotalBsDup");
        this.inMetodo = document.getElementById("cliente_inMetodo");
        this.panelPagoMovil = document.getElementById("cliente_panelPagoMovil");
        this.inPmCedula = document.getElementById("cliente_inPmCedula");
        this.inPmTelefono = document.getElementById("cliente_inPmTelefono");
        this.inPmBanco = document.getElementById("cliente_inPmBanco");
        this.inPmRef = document.getElementById("cliente_inPmRef");
        this.btHacerPedido = document.getElementById("cliente_btHacerPedido");
        // Controlar visibilidad del panel de Pago Móvil según método de pago
        this.inMetodo.onchange = () => {
            if (this.inMetodo.value === "Efectivo") {
                this.panelPagoMovil.style.display = "none";
            }
            else {
                this.panelPagoMovil.style.display = "block";
            }
        };
    }
    get nombreCliente() {
        return this.inNombre.value.trim();
    }
    get codigo() {
        return this.inCodigo.value.trim().toUpperCase();
    }
    get cantidad() {
        return parseInt(this.inCantidad.value) || 0;
    }
    get metodoPago() {
        return this.inMetodo.value;
    }
    get pmCedula() {
        return this.inPmCedula.value.trim();
    }
    get pmTelefono() {
        return this.inPmTelefono.value.trim();
    }
    get pmBanco() {
        return this.inPmBanco.value.trim();
    }
    get pmRef() {
        return this.inPmRef.value.trim();
    }
    onVerProductos(callback) {
        this.btVerProductos.onclick = callback;
    }
    onAgregarItem(callback) {
        this.btAgregarItem.onclick = callback;
    }
    onEliminarItem(callback) {
        this.btEliminarItem.onclick = callback;
    }
    onHacerPedido(callback) {
        this.btHacerPedido.onclick = callback;
    }
    mostrarProductos(servicios) {
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
    mostrarAgregados(items) {
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
    mostrarTotales(totalUsd, tasaBcv, totalBs) {
        this.txtTotalUsd.innerText = totalUsd.toFixed(2);
        this.txtTasaBcv.innerText = tasaBcv.toFixed(2);
        this.txtTotalBs.innerText = totalBs.toFixed(2);
        this.txtTotalBsDup.innerText = totalBs.toFixed(2);
    }
    toggleProductos() {
        if (this.panelProductos.hasAttribute("hidden")) {
            this.panelProductos.removeAttribute("hidden");
        }
        else {
            this.panelProductos.setAttribute("hidden", "true");
        }
    }
    limpiarFormulario() {
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
//# sourceMappingURL=Cl_vSolicitud.js.map