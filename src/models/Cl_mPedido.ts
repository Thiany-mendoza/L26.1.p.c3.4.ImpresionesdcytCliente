export interface I_PedidoItem {
  codigo: string;
  nombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

export default class Cl_mPedido {
  private tabla: string = "pedido";
  private _idPedido: string = ""; // e.g. R001
  private _nombreCliente: string = "";
  private _fecha: string = "";
  private _items: I_PedidoItem[] = [];
  private _totalDolar: number = 0;
  private _tasaBCV: number = 30;
  private _totalBs: number = 0;
  private _metodoPago: string = "Pago Móvil";
  private _pmCedula: string = "";
  private _pmTelefono: string = "";
  private _pmBanco: string = "";
  private _pmRef: string = "";
  private _estado: string = "Pendiente";
  private _id: string = ""; // MockAPI unique ID

  constructor({
    idPedido = "",
    nombreCliente = "",
    fecha = "",
    items = [],
    totalDolar = 0,
    tasaBCV = 30,
    totalBs = 0,
    metodoPago = "Pago Móvil",
    pmCedula = "",
    pmTelefono = "",
    pmBanco = "",
    pmRef = "",
    estado = "Pendiente",
    id = "",
  }: {
    idPedido?: string;
    nombreCliente: string;
    fecha?: string;
    items?: I_PedidoItem[];
    totalDolar?: number;
    tasaBCV?: number;
    totalBs?: number;
    metodoPago?: string;
    pmCedula?: string;
    pmTelefono?: string;
    pmBanco?: string;
    pmRef?: string;
    estado?: string;
    id?: string;
  }) {
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

  private obtenerHoraActual(): string {
    const ahora = new Date();
    let horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    const ampm = horas >= 12 ? "PM" : "AM";
    horas = horas % 12;
    horas = horas ? horas : 12; // el cero debe ser 12
    const minutosStr = minutos < 10 ? "0" + minutos : minutos;
    return `${horas}:${minutosStr} ${ampm}`;
  }

  public get idPedido(): string {
    return this._idPedido;
  }

  public set idPedido(value: string) {
    this._idPedido = value.trim();
  }

  public get nombreCliente(): string {
    return this._nombreCliente;
  }

  public set nombreCliente(value: string) {
    this._nombreCliente = value.trim();
  }

  public get fecha(): string {
    return this._fecha;
  }

  public set fecha(value: string) {
    this._fecha = value;
  }

  public get items(): I_PedidoItem[] {
    return this._items;
  }

  public set items(value: I_PedidoItem[]) {
    this._items = value;
  }

  public get totalDolar(): number {
    return this._totalDolar;
  }

  public set totalDolar(value: number) {
    this._totalDolar = +value || 0;
  }

  public get tasaBCV(): number {
    return this._tasaBCV;
  }

  public set tasaBCV(value: number) {
    this._tasaBCV = +value || 30.00;
  }

  public get totalBs(): number {
    return this._totalBs;
  }

  public set totalBs(value: number) {
    this._totalBs = +value || 0;
  }

  public get metodoPago(): string {
    return this._metodoPago;
  }

  public set metodoPago(value: string) {
    this._metodoPago = value;
  }

  public get pmCedula(): string {
    return this._pmCedula;
  }

  public set pmCedula(value: string) {
    this._pmCedula = value;
  }

  public get pmTelefono(): string {
    return this._pmTelefono;
  }

  public set pmTelefono(value: string) {
    this._pmTelefono = value;
  }

  public get pmBanco(): string {
    return this._pmBanco;
  }

  public set pmBanco(value: string) {
    this._pmBanco = value;
  }

  public get pmRef(): string {
    return this._pmRef;
  }

  public set pmRef(value: string) {
    this._pmRef = value;
  }

  public get estado(): string {
    return this._estado;
  }

  public set estado(value: string) {
    this._estado = value;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public calcularTotales() {
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
