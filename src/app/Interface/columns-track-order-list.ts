export interface ColumnsTrackOrderList {
    id: number,
    CategoriaDeGastos: string;
    cuenta: string;
    Monto: number;
    Descripcion: string;
    Fecha: string | null;
}

export interface ColumnsCategoria {
    idCategoriaGasto: number,
    Nombre: string;
    Descripcion: string;
}

export interface AgregarCategoriaRequest {
    Nombre: string;
    Descripcion: string;
  }