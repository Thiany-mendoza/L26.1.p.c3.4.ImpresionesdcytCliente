import Cl_mUsuario from "../models/Cl_mUsuario.js";
import mockapi from "../services/Cl_sMockApi.js";

export default class Cl_sUsuarios {
  static async existe(
    cedula: string,
  ): Promise<{ ok: boolean; existe: boolean }> {
    const result = await mockapi.existeId({ tabla: "usuario", id: cedula });
    return result;
  }

  static async agregar(
    nuevoUsuario: Cl_mUsuario,
  ): Promise<{ ok: boolean; mensaje: string }> {
    const result = await mockapi.post(nuevoUsuario.toJSON());
    return result;
  }

  static async getUsuarios(): Promise<{
    ok: boolean;
    tabla: Cl_mUsuario[];
  }> {
    let usuarios = mockapi.getTabla({ tabla: "usuario" });
    return usuarios;
  }
}
