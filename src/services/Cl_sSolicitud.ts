import Cl_mSolicitud from "../models/Cl_mSolicitud.js";
import mockapi from "./Cl_sMockApi.js";

export default class Cl_sSolicitud {
  static async agregar(
    nuevaSolicitud: Cl_mSolicitud,
  ): Promise<{ ok: boolean; mensaje: string }> {
    const result = await mockapi.post(nuevaSolicitud.toJSON());
    return result;
  }

  static async existe(
    cedula: string,
  ): Promise<{ ok: boolean; existe: boolean }> {
    const result = await mockapi.existeId({ tabla: "solicitud", id: cedula });
    return result;
  }

  static async actualizar(
    solicitud: Cl_mSolicitud,
  ): Promise<{ ok: boolean; mensaje: string }> {
    const result = await mockapi.put(solicitud.id, solicitud.toJSON());
    return result;
  }
}
