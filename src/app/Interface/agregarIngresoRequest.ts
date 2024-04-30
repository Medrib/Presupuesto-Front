import { presupuesto } from "../presupuesto";
import { categoriaGasto } from "./categoriaGasto";

export interface AgregarIngresoRequest {
    Fecha: string | null;
    Monto: number;
    Descripcion: string;
    IDPresupuesto: number;
}