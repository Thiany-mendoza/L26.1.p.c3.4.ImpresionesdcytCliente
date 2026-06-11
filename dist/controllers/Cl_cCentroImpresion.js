import solicitudesService from "../services/Cl_sCentroImpresion.js";
import solicitudService from "../services/Cl_sSolicitud.js";
import sUsuarios from "../services/Cl_sUsuarios.js";
export default class Cl_cCentroImpresion {
    modelo;
    vista;
    volverCallback;
    usuariosMap = new Map();
    constructor({ modelo, vista, volverCallback, }) {
        this.modelo = modelo;
        this.vista = vista;
        this.volverCallback = volverCallback;
        this.vista.onRecargar(() => this.btRecargarOnClick());
        this.vista.onChangeSoloCorrectos(() => this.onChangeSoloCorrectos());
        this.vista.onVolver(() => this.onVolver());
        this.vista.mostrar();
        this.btRecargarOnClick();
    }
    onChangeSoloCorrectos() {
        this.btRecargarOnClick();
    }
    onVolver() {
        this.vista.ocultar();
        this.volverCallback();
    }
    async btRecargarOnClick() {
        // 1. Fetch user list to resolve names dynamically
        let resUsuarios = await sUsuarios.getUsuarios();
        if (resUsuarios.ok) {
            this.usuariosMap.clear();
            resUsuarios.tabla.forEach((u) => {
                if (u.cedula && u.nombre) {
                    this.usuariosMap.set(u.cedula.toString(), u.nombre);
                }
            });
        }
        // 2. Fetch solicitudes
        let resultado = await solicitudesService.getSolicitudes();
        if (resultado.ok === false) {
            alert("Error: No se pudo conectar con el servidor");
            return;
        }
        this.modelo.setSolicitudes(resultado.tabla);
        this.actualizarVista();
    }
    resolverNombreUsuario(cedula) {
        return this.usuariosMap.get(cedula) || "No registrado";
    }
    actualizarVista() {
        const solicitudesFiltradas = this.modelo.getSolicitudes(this.vista.soloCorrectos);
        this.vista.mostrarSolicitudes(solicitudesFiltradas, (cedula) => this.resolverNombreUsuario(cedula), (sol) => this.validarPago(sol), (sol) => this.validarDoc(sol), (sol) => this.aprobarOrden(sol), (sol) => this.completar(sol));
        const total = this.modelo.calcularIngresoTotal();
        const ingresoImpresion = this.modelo.calcularIngresoPorTipo("Impresión");
        const pctImpresion = this.modelo.calcularPorcentajeIngresoPorTipo("Impresión");
        const ingresoCopia = this.modelo.calcularIngresoPorTipo("Copia");
        const pctCopia = this.modelo.calcularPorcentajeIngresoPorTipo("Copia");
        this.vista.mostrarEstadisticas(total, ingresoImpresion, pctImpresion, ingresoCopia, pctCopia);
    }
    async validarPago(sol) {
        sol.pagoValidado = true;
        if (!sol.documentoRecibido) {
            sol.estado = "Esperando documento";
        }
        let res = await solicitudService.actualizar(sol);
        alert(res.mensaje);
        this.btRecargarOnClick();
    }
    async validarDoc(sol) {
        sol.documentoRecibido = true;
        let res = await solicitudService.actualizar(sol);
        alert(res.mensaje);
        this.btRecargarOnClick();
    }
    async aprobarOrden(sol) {
        if (!sol.pagoValidado || !sol.documentoRecibido) {
            alert("Debe validar el pago y la recepción del documento antes de aprobar.");
            return;
        }
        sol.estado = "Imprimiendo";
        let res = await solicitudService.actualizar(sol);
        alert(res.mensaje);
        this.btRecargarOnClick();
    }
    async completar(sol) {
        if (sol.estado !== "Imprimiendo") {
            alert("La orden no está en proceso de impresión.");
            return;
        }
        sol.estado = "Disponible";
        let res = await solicitudService.actualizar(sol);
        alert(res.mensaje);
        this.btRecargarOnClick();
    }
}
//# sourceMappingURL=Cl_cCentroImpresion.js.map