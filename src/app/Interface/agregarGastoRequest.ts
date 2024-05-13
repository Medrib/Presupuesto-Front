import { presupuesto } from "../presupuesto";
import { categoriaGasto } from "./categoriaGasto";

export interface AgregarGastoRequest {
    Fecha: string | null;
    Monto: number;
    Descripcion: string;
    IDPresupuesto: number;
    IDCategoriaGasto: number;
}

export interface eliminarGastoRequest{
    IDGasto: number;
}