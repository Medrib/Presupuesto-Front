import { categoriaGasto } from './categoriaGasto';
import { cuentaDatos } from './obtenerCuenta';

export interface AgregarGastoRequest {
  Fecha: string | null;
  Monto: string;
  Descripcion: string;
  IDCuenta: number;
  CuentaName: string;
  IDCategoriaGasto: number;
  CategoriaGastoName: string;
  IDPresupuesto: number;
  PresupuestoName: string;
}

export interface editarGasto {
  Fecha: string | null;
  Monto: string;
  Descripcion: string;
  IDCuenta: number;
  CuentaName: string;
  IDCategoriaGasto: number;
  CategoriaGastoName: string;
  IDPresupuesto: number;
  PresupuestoName: string;
}
