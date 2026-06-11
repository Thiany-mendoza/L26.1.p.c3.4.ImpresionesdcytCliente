import mockapi from "./Cl_sMockApi.js";
export default class Cl_sSolicitud {
    static async agregar(nuevaSolicitud) {
        const result = await mockapi.post(nuevaSolicitud.toJSON());
        return result;
    }
    static async existe(cedula) {
        const result = await mockapi.existeId({ tabla: "solicitud", id: cedula });
        return result;
    }
    static async actualizar(solicitud) {
        const result = await mockapi.put(solicitud.id, solicitud.toJSON());
        return result;
    }
}
//# sourceMappingURL=Cl_sSolicitud.js.map