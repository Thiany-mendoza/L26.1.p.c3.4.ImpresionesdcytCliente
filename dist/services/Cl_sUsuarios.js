import mockapi from "../services/Cl_sMockApi.js";
export default class Cl_sUsuarios {
    static async existe(cedula) {
        const result = await mockapi.existeId({ tabla: "usuario", id: cedula });
        return result;
    }
    static async agregar(nuevoUsuario) {
        const result = await mockapi.post(nuevoUsuario.toJSON());
        return result;
    }
    static async getUsuarios() {
        let usuarios = mockapi.getTabla({ tabla: "usuario" });
        return usuarios;
    }
}
//# sourceMappingURL=Cl_sUsuarios.js.map