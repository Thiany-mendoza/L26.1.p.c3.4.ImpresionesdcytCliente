export default class Cl_sMockApi {
    static apiUrl = "https://6a1dfb49bcc4f20d5ca53fe4.mockapi.io/api/Impresiones/pedidos";
    static async getTabla({ tabla }) {
        try {
            const respuesta = await fetch(`${this.apiUrl}?tabla=${tabla}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (respuesta.status === 404) {
                return { ok: true, tabla: [] };
            }
            if (!respuesta.ok) {
                return { ok: false, tabla: [] };
            }
            const data = await respuesta.json();
            return { ok: true, tabla: data };
        }
        catch (error) {
            return { ok: false, tabla: [] };
        }
    }
    static async post(registro) {
        try {
            const respuesta = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registro),
            });
            if (!respuesta.ok) {
                return { ok: false, mensaje: "Error al guardar el registro" };
            }
            const data = await respuesta.json();
            return { ok: true, mensaje: "Registro guardado con ID: " + data.id };
        }
        catch (error) {
            return {
                ok: false,
                mensaje: "Error al guardar el registro: " + error.message,
            };
        }
    }
    static async existeId({ tabla, id, }) {
        try {
            const paramName = tabla === "usuario" ? "cedula" : "cedulaUsuario";
            const respuesta = await fetch(`${this.apiUrl}?tabla=${tabla}&${paramName}=${id}`);
            // ¡El truco para domar a MockAPI!
            // Si el servidor responde 404, la conexión fue exitosa, pero no hay resultados.
            if (respuesta.status === 404) {
                return { ok: true, existe: false };
            }
            // Si falla por un error real del servidor (ej. 500)
            if (!respuesta.ok) {
                return { ok: false, existe: false };
            }
            // Si responde 200 (OK), parseamos el JSON y verificamos si hay registros
            const data = await respuesta.json();
            return { ok: true, existe: data.length > 0 };
        }
        catch (error) {
            // Solo caemos aquí si hay un error real de red (sin internet, etc.)
            return { ok: false, existe: false };
        }
    }
    static async put(id, registro) {
        try {
            const respuesta = await fetch(`${this.apiUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registro),
            });
            if (!respuesta.ok) {
                return { ok: false, mensaje: "Error al actualizar el registro" };
            }
            return { ok: true, mensaje: "Registro actualizado con éxito" };
        }
        catch (error) {
            return {
                ok: false,
                mensaje: "Error al actualizar el registro: " + error.message,
            };
        }
    }
    static async delete(id) {
        try {
            const respuesta = await fetch(`${this.apiUrl}/${id}`, {
                method: "DELETE",
            });
            if (!respuesta.ok) {
                return { ok: false, mensaje: "Error al eliminar el registro" };
            }
            return { ok: true, mensaje: "Registro eliminado con éxito" };
        }
        catch (error) {
            return {
                ok: false,
                mensaje: "Error al eliminar el registro: " + error.message,
            };
        }
    }
}
//# sourceMappingURL=Cl_sMockApi.js.map