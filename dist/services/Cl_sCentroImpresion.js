import mockapi from "../services/Cl_sMockApi.js";
export default class Cl_sCentroImpresion {
    static async getSolicitudes() {
        let solicitudes = mockapi.getTabla({ tabla: "solicitud" });
        return solicitudes;
    }
}
//# sourceMappingURL=Cl_sCentroImpresion.js.map