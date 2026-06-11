export default class Cl_mPedido {
    tabla = "pedido";
    _idPedido = ""; // e.g. R001
    _nombreCliente = "";
    _fecha = "";
    _items = [];
    _totalDolar = 0;
    _tasaBCV = 30;
    _totalBs = 0;
    _metodoPago = "Pago Móvil";
    _pmCedula = "";
    _pmTelefono = "";
    _pmBanco = "";
    _pmRef = "";
    _estado = "Pendiente";
    _id = ""; // MockAPI unique ID
    constructor({ idPedido = "", nombreCliente = "", fecha = "", items = [], totalDolar = 0, tasaBCV = 30, totalBs = 0, metodoPago = "Pago Móvil", pmCedula = "", pmTelefono = "", pmBanco = "", pmRef = "", estado = "Pendiente", id = "", }) {
        this.idPedido = idPedido;
        this.nombreCliente = nombreCliente;
        this.fecha = fecha || this.obtenerHoraActual();
        this.items = items;
        this.totalDolar = totalDolar;
        this.tasaBCV = tasaBCV;
        this.totalBs = totalBs;
        this.metodoPago = metodoPago;
        this.pmCedula = pmCedula;
        this.pmTelefono = pmTelefono;
        this.pmBanco = pmBanco;
        this.pmRef = pmRef;
        this.estado = estado;
        this.id = id;
    }
    obtenerHoraActual() {
        const ahora = new Date();
        let horas = ahora.getHours();
        const minutos = ahora.getMinutes();
        const ampm = horas >= 12 ? "PM" : "AM";
        horas = horas % 12;
        horas = horas ? horas : 12; // el cero debe ser 12
        const minutosStr = minutos < 10 ? "0" + minutos : minutos;
        return `${horas}:${minutosStr} ${ampm}`;
    }
    get idPedido() {
        return this._idPedido;
    }
    set idPedido(value) {
        this._idPedido = value.trim();
    }
    get nombreCliente() {
        return this._nombreCliente;
    }
    set nombreCliente(value) {
        this._nombreCliente = value.trim();
    }
    get fecha() {
        return this._fecha;
    }
    set fecha(value) {
        this._fecha = value;
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
    }
    get totalDolar() {
        return this._totalDolar;
    }
    set totalDolar(value) {
        this._totalDolar = +value || 0;
    }
    get tasaBCV() {
        return this._tasaBCV;
    }
    set tasaBCV(value) {
        this._tasaBCV = +value || 30.00;
    }
    get totalBs() {
        return this._totalBs;
    }
    set totalBs(value) {
        this._totalBs = +value || 0;
    }
    get metodoPago() {
        return this._metodoPago;
    }
    set metodoPago(value) {
        this._metodoPago = value;
    }
    get pmCedula() {
        return this._pmCedula;
    }
    set pmCedula(value) {
        this._pmCedula = value;
    }
    get pmTelefono() {
        return this._pmTelefono;
    }
    set pmTelefono(value) {
        this._pmTelefono = value;
    }
    get pmBanco() {
        return this._pmBanco;
    }
    set pmBanco(value) {
        this._pmBanco = value;
    }
    get pmRef() {
        return this._pmRef;
    }
    set pmRef(value) {
        this._pmRef = value;
    }
    get estado() {
        return this._estado;
    }
    set estado(value) {
        this._estado = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    calcularTotales() {
        this._totalDolar = this._items.reduce((sum, item) => sum + item.subtotal, 0);
        this._totalBs = this._totalDolar * this._tasaBCV;
    }
    toJSON() {
        return {
            tabla: this.tabla,
            id: this.id || undefined,
            idPedido: this.idPedido,
            nombreCliente: this.nombreCliente,
            fecha: this.fecha,
            items: this.items,
            totalDolar: this.totalDolar,
            tasaBCV: this.tasaBCV,
            totalBs: this.totalBs,
            metodoPago: this.metodoPago,
            pmCedula: this.pmCedula,
            pmTelefono: this.pmTelefono,
            pmBanco: this.pmBanco,
            pmRef: this.pmRef,
            estado: this.estado,
        };
    }
}
//# sourceMappingURL=Cl_mPedido.js.map