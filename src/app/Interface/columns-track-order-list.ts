export interface ColumnsTrackOrderList {
  id: number;
  CategoriaDeGastos: string;
  idCategoriaGasto: number;
  cuenta: string;
  idCuenta: number;
  Monto: number;
  Descripcion: string;
  Fecha: string | null;
}

export interface ColumnsCategoria {
  idCategoriaGasto: number;
  Nombre: string;
  Descripcion: string;
}

export interface AgregarCategoriaRequest {
  Nombre: string;
  Descripcion: string;
}

export interface columnsResumen {
  Categoria: string,
  Dinero: number,
  Gasto: number,
  DineroDisponible: number
}
