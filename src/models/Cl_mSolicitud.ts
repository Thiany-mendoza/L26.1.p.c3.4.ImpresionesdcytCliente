export default class Cl_mSolicitud {
  private tabla: string = "solicitud";
  private _idSolicitud: number = 0;
  private _cedulaUsuario: string = "";
  private _nombreDocumento: string = "";
  private _cantCopias: number = 0;
  private _tipo: string = "Impresión";
  private _pmCedula: string = "";
  private _pmTelefono: string = "";
  private _pmBanco: string = "";
  private _pmRef: string = "";
  private _pmMonto: number = 0;
  private _estado: string = "Verificando pago";

  
  private _pagoValidado: boolean = false;
  private _documentoRecibido: boolean = false;

  constructor({
    idSolicitud = 0,
    cedulaUsuario,
    nombreDocumento,
    cantCopias,
    tipo = "Impresión",
    pmCedula = "",
    pmTelefono = "",
    pmBanco = "",
    pmRef = "",
    pmMonto = 0,
    estado = "Verificando pago",
    pagoValidado = false,
    documentoRecibido = false,
  }: {
    idSolicitud?: number;
    cedulaUsuario: string;
    nombreDocumento: string;
    cantCopias: number;
    tipo?: string;
    pmCedula?: string;
    pmTelefono?: string;
    pmBanco?: string;
    pmRef?: string;
    pmMonto?: number;
    estado?: string;
    pagoValidado?: boolean;
    documentoRecibido?: boolean;
  }) {
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

  public get idSolicitud(): number {
    return this._idSolicitud;
  }

  public set idSolicitud(value: number) {
    this._idSolicitud = +value;
  }

  // Map to the "id" property of MockAPI
  public get id(): string {
    return this._idSolicitud.toString();
  }

  public set id(value: string) {
    this._idSolicitud = parseInt(value) || 0;
  }

  public get cedulaUsuario(): string {
    return this._cedulaUsuario;
  }

  public set cedulaUsuario(value: string) {
    this._cedulaUsuario = value;
  }

  public get nombreDocumento(): string {
    return this._nombreDocumento;
  }

  public set nombreDocumento(value: string) {
    this._nombreDocumento = value;
  }

  public get cantCopias(): number {
    return this._cantCopias;
  }

  public set cantCopias(value: number) {
    this._cantCopias = +value;
  }

  public get tipo(): string {
    return this._tipo;
  }

  public set tipo(value: string) {
    this._tipo = value;
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

  public get pmMonto(): number {
    return this._pmMonto;
  }

  public set pmMonto(value: number) {
    this._pmMonto = +value;
  }

  public get estado(): string {
    return this._estado;
  }

  public set estado(value: string) {
    this._estado = value;
  }

  public get pagoValidado(): boolean {
    return this._pagoValidado;
  }

  public set pagoValidado(value: boolean) {
    this._pagoValidado = value;
  }

  public get documentoRecibido(): boolean {
    return this._documentoRecibido;
  }

  public set documentoRecibido(value: boolean) {
    this._documentoRecibido = value;
  }

  // UML Methods
  public calcularMontoRequerido(tarifa: number): number {
    return this.cantCopias * tarifa;
  }

  public esPagoValido(tarifa: number): boolean {
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
