export default class Cl_mServicio {
  private tabla: string = "servicio";
  private _codigo: string = "";
  private _nombre: string = "";
  private _precio: number = 0;
  private _id: string = "";

  constructor({
    codigo = "",
    nombre = "",
    precio = 0,
    id = "",
  }: {
    codigo?: string;
    nombre?: string;
    precio?: number;
    id?: string;
  }) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
  }

  public get codigo(): string {
    return this._codigo;
  }

  public set codigo(value: string) {
    this._codigo = value.trim();
  }

  public get nombre(): string {
    return this._nombre;
  }

  public set nombre(value: string) {
    this._nombre = value.trim();
  }

  public get precio(): number {
    return this._precio;
  }

  public set precio(value: number) {
    this._precio = +value || 0;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
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
