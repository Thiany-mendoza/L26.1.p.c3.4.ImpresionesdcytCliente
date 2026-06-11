export default class Cl_mSolicitud {
    tabla = "solicitud";
    _idSolicitud = 0;
    _cedulaUsuario = "";
    _nombreDocumento = "";
    _cantCopias = 0;
    _tipo = "Impresión";
    _pmCedula = "";
    _pmTelefono = "";
    _pmBanco = "";
    _pmRef = "";
    _pmMonto = 0;
    _estado = "Verificando pago";
    _pagoValidado = false;
    _documentoRecibido = false;
    constructor({ idSolicitud = 0, cedulaUsuario, nombreDocumento, cantCopias, tipo = "Impresión", pmCedula = "", pmTelefono = "", pmBanco = "", pmRef = "", pmMonto = 0, estado = "Verificando pago", pagoValidado = false, documentoRecibido = false, }) {
        this._idSolicitud = idSolicitud;
        this.cedulaUsuario = cedulaUsuario;
        this.nombreDocumento = nombreDocumento;
        this.cantCopias = cantCopias;
        this.tipo = tipo;
        this.pmCedula = pmCedula;
        this.pmTelefono = pmTelefono;
        this.pmBanco = pmBanco;
        this.pmRef = pmRef;
        this.pmMonto = pmMonto;
        this.estado = estado;
        this.pagoValidado = pagoValidado;
        this.documentoRecibido = documentoRecibido;
    }
    get idSolicitud() {
        return this._idSolicitud;
    }
    set idSolicitud(value) {
        this._idSolicitud = +value;
    }
    // Map to the "id" property of MockAPI
    get id() {
        return this._idSolicitud.toString();
    }
    set id(value) {
        this._idSolicitud = parseInt(value) || 0;
    }
    get cedulaUsuario() {
        return this._cedulaUsuario;
    }
    set cedulaUsuario(value) {
        this._cedulaUsuario = value;
    }
    get nombreDocumento() {
        return this._nombreDocumento;
    }
    set nombreDocumento(value) {
        this._nombreDocumento = value;
    }
    get cantCopias() {
        return this._cantCopias;
    }
    set cantCopias(value) {
        this._cantCopias = +value;
    }
    get tipo() {
        return this._tipo;
    }
    set tipo(value) {
        this._tipo = value;
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
    get pmMonto() {
        return this._pmMonto;
    }
    set pmMonto(value) {
        this._pmMonto = +value;
    }
    get estado() {
        return this._estado;
    }
    set estado(value) {
        this._estado = value;
    }
    get pagoValidado() {
        return this._pagoValidado;
    }
    set pagoValidado(value) {
        this._pagoValidado = value;
    }
    get documentoRecibido() {
        return this._documentoRecibido;
    }
    set documentoRecibido(value) {
        this._documentoRecibido = value;
    }
    // UML Methods
    calcularMontoRequerido(tarifa) {
        return this.cantCopias * tarifa;
    }
    esPagoValido(tarifa) {
        return this.pmMonto >= this.calcularMontoRequerido(tarifa);
    }
    toJSON() {
        return {
            tabla: this.tabla,
            id: this.idSolicitud || undefined,
            idSolicitud: this.idSolicitud,
            cedulaUsuario: this.cedulaUsuario,
            nombreDocumento: this.nombreDocumento,
            cantCopias: this.cantCopias,
            tipo: this.tipo,
            pmCedula: this.pmCedula,
            pmTelefono: this.pmTelefono,
            pmBanco: this.pmBanco,
            pmRef: this.pmRef,
            pmMonto: this.pmMonto,
            estado: this.estado,
            pagoValidado: this.pagoValidado,
            documentoRecibido: this.documentoRecibido,
        };
    }
}
//# sourceMappingURL=Cl_mSolicitud.js.map