import { categoriaGasto } from './Interface/categoriaGasto';
import { cuenta } from './Interface/cuenta';
import { presupuesto } from './presupuesto';

export interface Gastos {
  categoriaGasto: categoriaGasto;
  idCategoriaGasto: number;
  descripcion: string;
  fecha: Date;  
  cuenta: cuenta;
  idCuenta: number;
  idGasto: number;
  monto: number;
  presupuesto: presupuesto | null;
  idPresupuesto: number;
}
