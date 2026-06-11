export default class Cl_vPersonal {
    panelMenu;
    panelServicios;
    panelPedidos;
    btMenuServicios;
    btMenuPedidos;
    btMenuTasaBcv;
    txtMenuTasaBcv;
    inServiciosCodigo;
    inServiciosNombre;
    inServiciosPrecio;
    btServiciosAgregar;
    btServiciosEliminar;
    btServiciosBuscar;
    tblServiciosRegistros;
    btServiciosVolver;
    txtServiciosCantidad;
    inPedidosIdPedido;
    btPedidosAceptar;
    btPedidosCancelar;
    btPedidosProcesar;
    lstPedidosRegistros;
    btPedidosVolver;
    constructor() {
        this.panelMenu = document.getElementById("panelMenu");
        this.panelServicios = document.getElementById("panelServicios");
        this.panelPedidos = document.getElementById("panelPedidos");
        this.btMenuServicios = document.getElementById("menu_btServicios");
        this.btMenuPedidos = document.getElementById("menu_btPedidos");
        this.btMenuTasaBcv = document.getElementById("menu_btTasaBcv");
        this.txtMenuTasaBcv = document.getElementById("menu_txtTasaBcv");
        this.inServiciosCodigo = document.getElementById("servicios_inCodigo");
        this.inServiciosNombre = document.getElementById("servicios_inNombre");
        this.inServiciosPrecio = document.getElementById("servicios_inPrecio");
        this.btServiciosAgregar = document.getElementById("servicios_btAgregar");
        this.btServiciosEliminar = document.getElementById("servicios_btEliminar");
        this.btServiciosBuscar = document.getElementById("servicios_btBuscar");
        this.tblServiciosRegistros = document.getElementById("servicios_tblRegistros");
        this.btServiciosVolver = document.getElementById("servicios_btVolver");
        this.txtServiciosCantidad = document.getElementById("servicios_txtCantidad");
        this.inPedidosIdPedido = document.getElementById("pedidos_inIdPedido");
        this.btPedidosAceptar = document.getElementById("pedidos_btAceptar");
        this.btPedidosCancelar = document.getElementById("pedidos_btCancelar");
        this.btPedidosProcesar = document.getElementById("pedidos_btProcesar");
        this.lstPedidosRegistros = document.getElementById("pedidos_lstRegistros");
        this.btPedidosVolver = document.getElementById("pedidos_btVolver");
    }
    get codigoServicio() {
        return this.inServiciosCodigo.value.trim().toUpperCase();
    }
    get nombreServicio() {
        return this.inServiciosNombre.value.trim();
    }
    get precioServicio() {
        return parseFloat(this.inServiciosPrecio.value.trim()) || 0;
    }
    get idPedido() {
        return this.inPedidosIdPedido.value.trim().toUpperCase();
    }
    onServiciosClick(callback) {
        this.btMenuServicios.onclick = callback;
    }
    onPedidosClick(callback) {
        this.btMenuPedidos.onclick = callback;
    }
    onTasaBcvClick(callback) {
        this.btMenuTasaBcv.onclick = callback;
    }
    onAgregarServicio(callback) {
        this.btServiciosAgregar.onclick = callback;
    }
    onEliminarServicio(callback) {
        this.btServiciosEliminar.onclick = callback;
    }
    onBuscarServicio(callback) {
        this.btServiciosBuscar.onclick = callback;
    }
    onVolverServicio(callback) {
        this.btServiciosVolver.onclick = callback;
    }
    onAceptarPedido(callback) {
        this.btPedidosAceptar.onclick = callback;
    }
    onCancelarPedido(callback) {
        this.btPedidosCancelar.onclick = callback;
    }
    onProcesarPedido(callback) {
        this.btPedidosProcesar.onclick = callback;
    }
    onVolverPedido(callback) {
        this.btPedidosVolver.onclick = callback;
    }
    mostrarPanel(panelName) {
        this.panelMenu.hidden = panelName !== "menu";
        this.panelServicios.hidden = panelName !== "servicios";
        this.panelPedidos.hidden = panelName !== "pedidos";
    }
    actualizarTasa(tasa) {
        this.txtMenuTasaBcv.innerText = tasa.toFixed(2);
    }
    mostrarServicios(servicios) {
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
    mostrarCantidadServicios(cantidad) {
        this.txtServiciosCantidad.innerText = cantidad.toString();
    }
    llenarFormularioServicio(nombre, precio) {
        this.inServiciosNombre.value = nombre;
        this.inServiciosPrecio.value = precio.toFixed(2);
    }
    mostrarPedidos(pedidos) {
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
            if (p.estado === "Aceptado")
                statusColor = "green";
            if (p.estado === "Cancelado")
                statusColor = "red";
            if (p.estado === "Procesado")
                statusColor = "blue";
            let html = `<div class="parent-item">+ ID: ${p.idPedido} - ${p.nombreCliente}, ${p.fecha} <span style="color: ${statusColor}; font-size: 11px;">(${p.estado})</span></div>`;
            p.items.forEach((item) => {
                html += `<div class="child-item">> ${item.nombre}, ${item.cantidad}, $${item.precio.toFixed(2)}, $${item.subtotal.toFixed(2)}</div>`;
            });
            html += `<div class="child-item">> Total a pagar: $${p.totalDolar.toFixed(2)} (${p.totalBs.toFixed(2)} Bs)</div>`;
            if (p.metodoPago !== "Efectivo") {
                html += `<div class="child-item">> Pago móvil - CI: ${p.pmCedula}, Tel: ${p.pmTelefono}, Banco: ${p.pmBanco}, Ref: ${p.pmRef}</div>`;
            }
            else {
                html += `<div class="child-item">> Pago en Efectivo</div>`;
            }
            li.innerHTML = html;
            this.lstPedidosRegistros.appendChild(li);
        });
    }
    limpiarInputsServicios() {
        this.inServiciosCodigo.value = "";
        this.inServiciosNombre.value = "";
        this.inServiciosPrecio.value = "";
    }
    limpiarInputsPedidos() {
        this.inPedidosIdPedido.value = "";
    }
}
//# sourceMappingURL=Cl_vPersonal.js.map