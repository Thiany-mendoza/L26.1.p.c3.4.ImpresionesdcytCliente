import Cl_mServicio from "../models/Cl_mServicio.js";
import mockapi from "./Cl_sMockApi.js";
export default class Cl_sServicios {
    static defaultServicios = [
        { codigo: "R01", nombre: "Fotocopia B/N Carta", precio: 0.12 },
        { codigo: "R02", nombre: "Fotocopia Color Carta", precio: 0.55 },
        { codigo: "R03", nombre: "Impresión B/N", precio: 0.18 },
        { codigo: "R04", nombre: "Impresión Color", precio: 0.65 },
        { codigo: "R05", nombre: "Escaneo (pág)", precio: 0.08 },
        { codigo: "R06", nombre: "Encuadernado Espiral", precio: 3.75 },
        { codigo: "R07", nombre: "Laminado (A4)", precio: 2.00 },
        { codigo: "R08", nombre: "Resma Papel Carta", precio: 7.00 },
        { codigo: "R09", nombre: "Bolígrafo Gel", precio: 1.20 },
    ];
    static async getServicios() {
        let res = await mockapi.getTabla({ tabla: "servicio" });
        if (!res.ok) {
            // Fallback a localStorage
            const local = localStorage.getItem("servicios");
            if (local) {
                const parsed = JSON.parse(local);
                return { ok: true, tabla: parsed.map((s) => new Cl_mServicio(s)) };
            }
            return { ok: false, tabla: [] };
        }
        let servicios = res.tabla
            .filter((s) => s.tabla === "servicio" || s.codigo)
            .map((s) => new Cl_mServicio({
            codigo: s.codigo,
            nombre: s.nombre,
            precio: s.precio,
            id: s.id,
        }));
        // Si está vacío, poblar con los valores por defecto
        if (servicios.length === 0) {
            for (const def of this.defaultServicios) {
                const nuevo = new Cl_mServicio(def);
                const added = await this.agregar(nuevo);
                if (added.ok) {
                    // Volver a consultar para obtener con ID asignado por MockAPI
                }
            }
            res = await mockapi.getTabla({ tabla: "servicio" });
            if (res.ok) {
                servicios = res.tabla
                    .filter((s) => s.tabla === "servicio" || s.codigo)
                    .map((s) => new Cl_mServicio({
                    codigo: s.codigo,
                    nombre: s.nombre,
                    precio: s.precio,
                    id: s.id,
                }));
            }
        }
        // Ordenar por código
        servicios.sort((a, b) => a.codigo.localeCompare(b.codigo));
        // Guardar en localStorage como copia de seguridad
        localStorage.setItem("servicios", JSON.stringify(servicios.map(s => s.toJSON())));
        return { ok: true, tabla: servicios };
    }
    static async existe(codigo) {
        const res = await this.getServicios();
        if (res.ok) {
            const existe = res.tabla.some((s) => s.codigo.toUpperCase() === codigo.toUpperCase());
            return { ok: true, existe };
        }
        return { ok: false, existe: false };
    }
    static async agregar(nuevoServicio) {
        const result = await mockapi.post(nuevoServicio.toJSON());
        if (result.ok) {
            // Actualizar localStorage
            await this.syncLocal();
        }
        return result;
    }
    static async eliminar(codigo) {
        const res = await this.getServicios();
        if (!res.ok) {
            return { ok: false, mensaje: "Error al conectar con la base de datos" };
        }
        const servicio = res.tabla.find((s) => s.codigo.toUpperCase() === codigo.toUpperCase());
        if (!servicio) {
            return { ok: false, mensaje: `Servicio con código ${codigo} no encontrado` };
        }
        if (servicio.id) {
            const deleteRes = await mockapi.delete(servicio.id);
            if (deleteRes.ok) {
                await this.syncLocal();
            }
            return deleteRes;
        }
        else {
            // Si no tiene id (caso local), lo quitamos del caché
            const filtrados = res.tabla.filter((s) => s.codigo.toUpperCase() !== codigo.toUpperCase());
            localStorage.setItem("servicios", JSON.stringify(filtrados.map(s => s.toJSON())));
            return { ok: true, mensaje: "Eliminado del almacenamiento local" };
        }
    }
    static async syncLocal() {
        const res = await mockapi.getTabla({ tabla: "servicio" });
        if (res.ok) {
            const servicios = res.tabla
                .filter((s) => s.tabla === "servicio" || s.codigo)
                .map((s) => new Cl_mServicio({
                codigo: s.codigo,
                nombre: s.nombre,
                precio: s.precio,
                id: s.id,
            }));
            servicios.sort((a, b) => a.codigo.localeCompare(b.codigo));
            localStorage.setItem("servicios", JSON.stringify(servicios.map(s => s.toJSON())));
        }
    }
    static async cantidadServicios() {
        const res = await this.getServicios();
        return res.ok ? res.tabla.length : 0;
    }
    static async buscarPorReferencia(referencia) {
        const res = await this.getServicios();
        if (res.ok) {
            return res.tabla.find((s) => s.codigo.toUpperCase() === referencia.toUpperCase()) || null;
        }
        return null;
    }
}
//# sourceMappingURL=Cl_sServicios.js.map