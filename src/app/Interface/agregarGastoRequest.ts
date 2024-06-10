export interface AgregarGastoRequest {
     
    Fecha: string | null;
    Monto: number;
    Descripcion: string;
    IDCuenta: number;
    CuentaName: string;
    IDCategoriaGasto: number;
    CategoriaGastoName: string;
    IDPresupuesto: number;
    PresupuestoName: string;
}