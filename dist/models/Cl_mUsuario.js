export default class Cl_mUsuario {
    tabla = "usuario";
    _cedula = "";
    _nombre = "";
    constructor({ cedula, nombre }) {
        this.cedula = cedula;
        this.nombre = nombre;
    }
    set cedula(value) {
        this._cedula = value;
    }
    get cedula() {
        return this._cedula;
    }
    set nombre(value) {
        this._nombre = value;
    }
    get nombre() {
        return this._nombre;
    }
    toJSON() {
        return {
            tabla: this.tabla,
            cedula: this.cedula,
            nombre: this.nombre,
        };
    }
}
//# sourceMappingURL=Cl_mUsuario.js.map