import Cl_mPedido from "../models/Cl_mPedido.js";
import mockapi from "./Cl_sMockApi.js";
export default class Cl_sPedidos {
    static defaultPedidos = [
        {
            idPedido: "R001",
            nombreCliente: "Juan Pérez",
            fecha: "10:15 AM",
            items: [
                { codigo: "R01", nombre: "Fotocopia B/N Carta", cantidad: 10, precio: 0.12, subtotal: 1.20 }
            ],
            totalDolar: 1.20,
            tasaBCV: 30.00,
            totalBs: 36.00,
            metodoPago: "Pago Móvil",
            pmCedula: "12345678",
            pmTelefono: "04121234567",
            pmBanco: "Mercantil",
            pmRef: "987654",
            estado: "Pendiente"
        },
        {
            idPedido: "R002",
            nombreCliente: "María Rodríguez",
            fecha: "11:30 AM",
            items: [
                { codigo: "R04", nombre: "Impresión Color", cantidad: 5, precio: 0.65, subtotal: 3.25 },
                { codigo: "R06", nombre: "Encuadernado Espiral", cantidad: 1, precio: 3.75, subtotal: 3.75 }
            ],
            totalDolar: 7.00,
            tasaBCV: 30.00,
            totalBs: 210.00,
            metodoPago: "Efectivo",
            pmCedula: "",
            pmTelefono: "",
            pmBanco: "",
            pmRef: "",
            estado: "Aceptado"
        }
    ];
    static async getPedidos() {
        let res = await mockapi.getTabla({ tabla: "pedido" });
        if (!res.ok) {
            // Fallback a localStorage
            const local = localStorage.getItem("pedidos");
            if (local) {
                const parsed = JSON.parse(local);
                return { ok: true, tabla: parsed.map((p) => new Cl_mPedido(p)) };
            }
            // Si no hay local, inicializar con por defecto
            const mockPedidos = this.defaultPedidos.map((p) => new Cl_mPedido(p));
            localStorage.setItem("pedidos", JSON.stringify(mockPedidos.map(p => p.toJSON())));
            return { ok: true, tabla: mockPedidos };
        }
        let pedidos = res.tabla
            .filter((p) => p.tabla === "pedido" || p.idPedido)
            .map((p) => new Cl_mPedido({
            idPedido: p.idPedido,
            nombreCliente: p.nombreCliente,
            fecha: p.fecha,
            items: p.items,
            totalDolar: p.totalDolar,
            tasaBCV: p.tasaBCV,
            totalBs: p.totalBs,
            metodoPago: p.metodoPago,
            pmCedula: p.pmCedula,
            pmTelefono: p.pmTelefono,
            pmBanco: p.pmBanco,
            pmRef: p.pmRef,
            estado: p.estado,
            id: p.id,
        }));
        // Si está vacío en la base de datos remota, cargamos los mock pedidos por defecto localmente
        if (pedidos.length === 0) {
            const mockPedidos = this.defaultPedidos.map((p) => new Cl_mPedido(p));
            localStorage.setItem("pedidos", JSON.stringify(mockPedidos.map(p => p.toJSON())));
            return { ok: true, tabla: mockPedidos };
        }
        // Ordenar de más nuevo a más viejo o por idPedido secuencial
        pedidos.sort((a, b) => b.idPedido.localeCompare(a.idPedido));
        // Guardar copia local
        localStorage.setItem("pedidos", JSON.stringify(pedidos.map(p => p.toJSON())));
        return { ok: true, tabla: pedidos };
    }
    static async agregar(nuevoPedido) {
        // 1. Obtener la lista existente para generar el siguiente ID secuencial
        const res = await this.getPedidos();
        let nextNum = 1;
        if (res.ok && res.tabla.length > 0) {
            // Encontrar el número máximo de ID
            const nums = res.tabla
                .map((p) => parseInt(p.idPedido.replace("R", "")) || 0)
                .filter((n) => n > 0);
            if (nums.length > 0) {
                nextNum = Math.max(...nums) + 1;
            }
        }
        const nextId = "R" + nextNum.toString().padStart(3, "0"); // R001, R002...
        nuevoPedido.idPedido = nextId;
        const result = await mockapi.post(nuevoPedido.toJSON());
        if (result.ok) {
            await this.syncLocal();
        }
        return { ok: result.ok, mensaje: result.ok ? "Pedido registrado con ID " + nextId : result.mensaje, idPedido: nextId };
    }
    static async actualizarEstado(idPedido, nuevoEstado) {
        const res = await this.getPedidos();
        if (!res.ok) {
            return { ok: false, mensaje: "Error al conectar con la base de datos" };
        }
        const pedido = res.tabla.find((p) => p.idPedido.toUpperCase() === idPedido.toUpperCase());
        if (!pedido) {
            return { ok: false, mensaje: `Pedido con ID ${idPedido} no encontrado` };
        }
        pedido.estado = nuevoEstado;
        if (pedido.id) {
            const updateRes = await mockapi.put(pedido.id, pedido.toJSON());
            if (updateRes.ok) {
                await this.syncLocal();
            }
            return updateRes;
        }
        else {
            // Actualizar localmente si no tiene ID remoto
            const filtrados = res.tabla.map((p) => {
                if (p.idPedido.toUpperCase() === idPedido.toUpperCase()) {
                    p.estado = nuevoEstado;
                }
                return p;
            });
            localStorage.setItem("pedidos", JSON.stringify(filtrados.map(p => p.toJSON())));
            return { ok: true, mensaje: "Estado actualizado localmente" };
        }
    }
    static async syncLocal() {
        const res = await mockapi.getTabla({ tabla: "pedido" });
        if (res.ok) {
            const pedidos = res.tabla
                .filter((p) => p.tabla === "pedido" || p.idPedido)
                .map((p) => new Cl_mPedido({
                idPedido: p.idPedido,
                nombreCliente: p.nombreCliente,
                fecha: p.fecha,
                items: p.items,
                totalDolar: p.totalDolar,
                tasaBCV: p.tasaBCV,
                totalBs: p.totalBs,
                metodoPago: p.metodoPago,
                pmCedula: p.pmCedula,
                pmTelefono: p.pmTelefono,
                pmBanco: p.pmBanco,
                pmRef: p.pmRef,
                estado: p.estado,
                id: p.id,
            }));
            pedidos.sort((a, b) => b.idPedido.localeCompare(a.idPedido));
            localStorage.setItem("pedidos", JSON.stringify(pedidos.map(p => p.toJSON())));
        }
    }
}
//# sourceMappingURL=Cl_sPedidos.js.map