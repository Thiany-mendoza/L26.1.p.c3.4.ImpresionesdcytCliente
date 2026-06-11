export default class Cl_mUsuario {
  private tabla: string = "usuario";
  private _cedula: string = "";
  private _nombre: string = "";
  constructor({ cedula, nombre }: { cedula: string; nombre: string }) {
    this.cedula = cedula;
    this.nombre = nombre;
  }
  set cedula(value: string) {
    this._cedula = value;
  }
  get cedula(): string {
    return this._cedula;
  }
  set nombre(value: string) {
    this._nombre = value;
  }
  get nombre(): string {
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
