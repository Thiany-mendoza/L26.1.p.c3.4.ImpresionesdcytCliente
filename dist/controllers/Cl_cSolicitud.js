import Cl_mPedido from "../models/Cl_mPedido.js";
import sServicios from "../services/Cl_sServicios.js";
import sPedidos from "../services/Cl_sPedidos.js";
export default class Cl_cSolicitud {
    vista;
    servicios = [];
    itemsCarrito = [];
    tasaBCV = 30.00;
    constructor(vista) {
        this.vista = vista;
        this.vista.onVerProductos(() => this.onVerProductos());
        this.vista.onAgregarItem(() => this.onAgregarItem());
        this.vista.onEliminarItem(() => this.onEliminarItem());
        this.vista.onHacerPedido(() => this.onHacerPedido());
        this.cargarServicios();
        this.cargarTasa();
    }
    cargarTasa() {
        const tasaStr = localStorage.getItem("tasaBCV");
        if (tasaStr) {
            this.tasaBCV = parseFloat(tasaStr) || 30.00;
        }
        else {
            this.tasaBCV = 30.00;
            localStorage.setItem("tasaBCV", "30.00");
        }
        this.actualizarTotales();
    }
    async cargarServicios() {
        const res = await sServicios.getServicios();
        if (res.ok) {
            this.servicios = res.tabla;
            this.vista.mostrarProductos(this.servicios);
        }
        else {
            alert("Error al cargar los servicios disponibles");
        }
    }
    onVerProductos() {
        this.vista.toggleProductos();
    }
    onAgregarItem() {
        const codigo = this.vista.codigo;
        const cantidad = this.vista.cantidad;
        if (!codigo) {
            alert("Por favor, introduzca el código del servicio.");
            return;
        }
        if (cantidad <= 0) {
            alert("La cantidad debe ser mayor a 0.");
            return;
        }
        const servicio = this.servicios.find((s) => s.codigo.toUpperCase() === codigo.toUpperCase());
        if (!servicio) {
            alert(`Servicio con código "${codigo}" no encontrado.`);
            return;
        }
        // Buscar si ya está en el carrito
        const itemExistente = this.itemsCarrito.find((item) => item.codigo.toUpperCase() === codigo.toUpperCase());
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
            itemExistente.subtotal = itemExistente.cantidad * itemExistente.precio;
        }
        else {
            this.itemsCarrito.push({
                codigo: servicio.codigo,
                nombre: servicio.nombre,
                cantidad: cantidad,
                precio: servicio.precio,
                subtotal: cantidad * servicio.precio,
            });
        }
        this.vista.mostrarAgregados(this.itemsCarrito);
        this.actualizarTotales();
    }
    onEliminarItem() {
        const codigo = this.vista.codigo;
        const cantidad = this.vista.cantidad;
        if (!codigo) {
            alert("Por favor, introduzca el código del servicio.");
            return;
        }
        if (cantidad <= 0) {
            alert("La cantidad debe ser mayor a 0.");
            return;
        }
        const itemIdx = this.itemsCarrito.findIndex((item) => item.codigo.toUpperCase() === codigo.toUpperCase());
        if (itemIdx === -1) {
            alert(`El servicio con código "${codigo}" no está en el carrito.`);
            return;
        }
        const item = this.itemsCarrito[itemIdx];
        item.cantidad -= cantidad;
        if (item.cantidad <= 0) {
            this.itemsCarrito.splice(itemIdx, 1);
        }
        else {
            item.subtotal = item.cantidad * item.precio;
        }
        this.vista.mostrarAgregados(this.itemsCarrito);
        this.actualizarTotales();
    }
    actualizarTotales() {
        const totalUsd = this.itemsCarrito.reduce((sum, item) => sum + item.subtotal, 0);
        const totalBs = totalUsd * this.tasaBCV;
        this.vista.mostrarTotales(totalUsd, this.tasaBCV, totalBs);
    }
    async onHacerPedido() {
        const nombreCliente = this.vista.nombreCliente;
        if (!nombreCliente) {
            alert("Por favor, ingrese el nombre del cliente.");
            return;
        }
        if (this.itemsCarrito.length === 0) {
            alert("Por favor, agregue al menos un producto al pedido.");
            return;
        }
        const metodoPago = this.vista.metodoPago;
        let pmCedula = "";
        let pmTelefono = "";
        let pmBanco = "";
        let pmRef = "";
        if (metodoPago !== "Efectivo") {
            pmCedula = this.vista.pmCedula;
            pmTelefono = this.vista.pmTelefono;
            pmBanco = this.vista.pmBanco;
            pmRef = this.vista.pmRef;
            if (!pmCedula || !pmTelefono || !pmBanco || !pmRef) {
                alert("Por favor, complete todos los campos de pago móvil/transferencia.");
                return;
            }
        }
        const totalUsd = this.itemsCarrito.reduce((sum, item) => sum + item.subtotal, 0);
        const totalBs = totalUsd * this.tasaBCV;
        const nuevoPedido = new Cl_mPedido({
            nombreCliente: nombreCliente,
            items: this.itemsCarrito,
            totalDolar: totalUsd,
            tasaBCV: this.tasaBCV,
            totalBs: totalBs,
            metodoPago: metodoPago,
            pmCedula: pmCedula,
            pmTelefono: pmTelefono,
            pmBanco: pmBanco,
            pmRef: pmRef,
            estado: "Pendiente",
        });
        const res = await sPedidos.agregar(nuevoPedido);
        alert(res.mensaje);
        if (res.ok) {
            this.itemsCarrito = [];
            this.vista.limpiarFormulario();
            // Recargar tasa por si acaso
            this.cargarTasa();
        }
    }
}
//# sourceMappingURL=Cl_cSolicitud.js.map