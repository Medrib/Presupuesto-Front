import { categoriaGasto } from "./Interface/categoriaGasto";
import { presupuesto } from "./presupuesto";

export interface Gastos {
  categoriaGasto : categoriaGasto,
  descripcion: string;
  fecha: Date | null;
  idCategoriaGasto: number;
  idPresupuesto: number;
  idGasto: number;
  monto: number;
  presupuesto : presupuesto | null,
}
