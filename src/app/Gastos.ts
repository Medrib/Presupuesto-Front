import { categoriaGasto } from "./Interface/categoriaGasto";
import { cuenta } from "./Interface/cuenta";
import { presupuesto } from "./presupuesto";

export interface Gastos {
  categoriaGasto : categoriaGasto,
  descripcion: string;
  fecha: Date | null;
  idCategoriaGasto: number;
  idPresupuesto: number;
  idCuenta: number;
  idGasto: number;
  monto: number;
  presupuesto : presupuesto | null,
  cuenta:cuenta;
}
