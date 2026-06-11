import Cl_mSolicitud from "./Cl_mSolicitud.js";
import Cl_mUsuario from "./Cl_mUsuario.js";
export default class Cl_mCentroImpresion {
    tarifaPorCopia;
    _solicitudes = [];
    _usuarios = [];
    constructor(tarifaPorCopia = 0.50) {
        this.tarifaPorCopia = tarifaPorCopia;
    }
    agregarSolicitud(solicitud) {
        this._solicitudes.push(solicitud);
    }
    obtenerSolicitudes() {
        return this._solicitudes;
    }
    contarSolicitudesPorEstado(estado) {
        return this._solicitudes.filter((sol) => sol.estado === estado).length;
    }
    setSolicitudes(array) {
        this._solicitudes = [];
        array.forEach((sol) => {
            this.agregarSolicitud(new Cl_mSolicitud({
                idSolicitud: Number(sol.idSolicitud) || Number(sol.id) || 0,
                cedulaUsuario: sol.cedulaUsuario || sol.cedula?.toString() || "",
                nombreDocumento: sol.nombreDocumento || sol.documento || "",
                cantCopias: sol.cantCopias || sol.copias || 0,
                tipo: sol.tipo || "Impresión",
                pmCedula: sol.pmCedula || sol.cedula?.toString() || "",
                pmTelefono: sol.pmTelefono || "",
                pmBanco: sol.pmBanco || "",
                pmRef: sol.pmRef || sol.referencia || "",
                pmMonto: sol.pmMonto || 0,
                estado: sol.estado || "Verificando pago",
                pagoValidado: sol.pagoValidado !== undefined ? sol.pagoValidado : false,
                documentoRecibido: sol.documentoRecibido !== undefined ? sol.documentoRecibido : false,
            }));
        });
        this._solicitudes.sort((a, b) => a.idSolicitud - b.idSolicitud);
    }
    getSolicitudes(soloDisponibles = false) {
        if (soloDisponibles) {
            return this._solicitudes.filter((sol) => sol.estado === "Disponible");
        }
        return this._solicitudes;
    }
    setUsuarios(array) {
        this._usuarios = [];
        array.forEach((usuario) => {
            this._usuarios.push(new Cl_mUsuario({
                cedula: usuario.cedula,
                nombre: usuario.nombre,
            }));
        });
    }
    getUsuarios() {
        return this._usuarios;
    }
    calcularIngresoTotal() {
        return this._solicitudes.reduce((total, sol) => total + sol.pmMonto, 0);
    }
    calcularIngresoPorTipo(tipo) {
        return this._solicitudes
            .filter((sol) => sol.tipo === tipo)
            .reduce((total, sol) => total + sol.pmMonto, 0);
    }
    calcularPorcentajeIngresoPorTipo(tipo) {
        const total = this.calcularIngresoTotal();
        if (total === 0)
            return 0;
        return (this.calcularIngresoPorTipo(tipo) / total) * 100;
    }
}
//# sourceMappingURL=Cl_mCentroImpresion.js.map