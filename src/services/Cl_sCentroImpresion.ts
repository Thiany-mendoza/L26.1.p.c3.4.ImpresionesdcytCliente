import mockapi from "../services/Cl_sMockApi.js";
import Cl_mSolicitud from "../models/Cl_mSolicitud.js";

export default class Cl_sCentroImpresion {
  static async getSolicitudes(): Promise<{
    ok: boolean;
    tabla: Cl_mSolicitud[];
  }> {
    let solicitudes = mockapi.getTabla({ tabla: "solicitud" });
    return solicitudes;
  }
}
