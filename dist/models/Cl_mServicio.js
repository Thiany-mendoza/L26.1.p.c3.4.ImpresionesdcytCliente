export default class Cl_mServicio {
    tabla = "servicio";
    _codigo = "";
    _nombre = "";
    _precio = 0;
    _id = "";
    constructor({ codigo = "", nombre = "", precio = 0, id = "", }) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
    }
    get codigo() {
        return this._codigo;
    }
    set codigo(value) {
        this._codigo = value.trim();
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(value) {
        this._nombre = value.trim();
    }
    get precio() {
        return this._precio;
    }
    set precio(value) {
        this._precio = +value || 0;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    toJSON() {
        return {
            tabla: this.tabla,
            id: this.id || undefined,
            codigo: this.codigo,
            nombre: this.nombre,
            precio: this.precio,
        };
    }
}
//# sourceMappingURL=Cl_mServicio.js.map