import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, Subject, elementAt, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gastos } from 'src/app/Gastos';
import { Filters } from 'src/app/filter';
import { Sorting } from 'src/app/sort';
import { Pagination } from 'src/app/Interface/Pagination';
import { AgregarGastoRequest, gastosRequest } from 'src/app/Interface/agregarGastoRequest';
import { AgregarIngresoRequest } from 'src/app/Interface/agregarIngresoRequest';
import { AgregarCategoriaRequest } from 'src/app/Interface/agregarCategoriaRequest';
import { Categoria } from 'src/app/Interface/Categoria';
import { cuentaDatos } from 'src/app/Interface/obtenerCuenta';
import { ColumnsTrackOrderList } from 'src/app/Interface/columns-track-order-list';
import { GastoComponent } from '../Gasto/nuevo-gasto/gasto/gasto.component';
import { categoriaGasto } from 'src/app/Interface/categoriaGasto';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  searchKeyword$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  envioCategoria$: Subject<Categoria> = new Subject<Categoria>();
  envioCuenta$: Subject<cuentaDatos> = new Subject<cuentaDatos>();

  constructor(private http: HttpClient) {}

  envioCategoria(categoria: Categoria): void {
    console.log(categoria,'categoria')
    this.envioCategoria$.next(categoria);
  }

  envioCuenta(cuenta: cuentaDatos): void {
    console.log("llego envio");
    this.envioCuenta$.next(cuenta);
  }
  

  exportAsExcelFile(
    filters: Filters,
    sorting: Sorting,
    pagination: Pagination,
    search: boolean
  ): Observable<[Gastos]> {
    const params = new HttpParams({
      fromObject: {
        ...filters,
        ...sorting,
        ...pagination,
      },
    });

    return this.http.get<[Gastos]>('https://localhost:7026/gastos/search', {
      params,
    });
  }

  getDataFromServer(
    filters: Filters,
    sorting: Sorting,
    pagination: Pagination
  ): Observable<{ data: Gastos[]; totalItems: number }> {
    const params = new HttpParams({
      fromObject: {
        ...filters,
        ...sorting,
        ...pagination,
      },
    });

    return this.http.get<{ data: Gastos[]; totalItems: number }>(
      'https://localhost:7026/gastos/search',
      { params }
    );
  }
  
  getDataFromCategoria(
    filters: Filters,
    sorting: Sorting,
    pagination: Pagination
  ): Observable<{ data: categoriaGasto[]; totalItems: number }> {
    const params = new HttpParams({
      fromObject: {
        ...filters,
        ...sorting,
        ...pagination,
      },
    });
  
    console.log('Request Params:', params.toString());
  
    return this.http.get<{ data: Categoria[], totalItems: number }>(
      'https://localhost:7026/gastos/getCategory',
      { params }
    ).pipe(
      tap((response: any) => console.log('Response from service:', response))
    );
    
  }
  

  getCountOrders(filters: Filters): Observable<{ data: number }> {
    const params = new HttpParams({
      fromObject: {
        ...filters,
      },
    });

    return this.http.get<{ data: number }>(
      'https://localhost:7026/gastos/orderCount',
      { params }
    );
  }

  sendDataToServer(
    nuevoGasto: AgregarGastoRequest
  ): Observable<{ data: string }> {
    return this.http.post<{ data: string }>(
      'https://localhost:7026/gastos/agregarGasto',
      nuevoGasto
    );
  }

  postIngreso(
    nuevoIngreso: AgregarIngresoRequest
  ): Observable<{ data: string }> {
    return this.http.post<{ data: string }>(
      'https://localhost:7026/gastos/agregarIngreso',
      nuevoIngreso
    );
  }

  insertCategory(
    categoria: AgregarCategoriaRequest
  ): Observable<{ data: string }> {
    return this.http.post<{ data: string }>(
      'https://localhost:7026/gastos/agregarCategoria',
      categoria
    );
  }
  
  getCategories(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      'https://localhost:7026/gastos/getCategory'
    );
  }

  insertCuenta(cuentas: cuentaDatos): Observable<{ data: string }> {
    return this.http.post<{ data: string }>(
      'https://localhost:7026/gastos/agregarCuenta',
      cuentas
    );
  }

  getCuenta(): Observable<cuentaDatos[]> {
    return this.http.get<cuentaDatos[]>(
      'https://localhost:7026/gastos/getCuenta'
    );
  }
  
  eliminarGasto(idGasto: number): Observable<{ data: string }> {
    return this.http.delete<{ data: string }>(
      `https://localhost:7026/gastos/delete/${idGasto}`
    );

  }
  editarGasto(datos: Gastos): Observable<string> {
    return this.http.put<string>(
      `https://localhost:7026/gastos/editarGasto`,
      datos
    );
  }

  obtenerGasto(): Observable<gastosRequest[]> {
    return this.http.get<gastosRequest[]>('https://localhost:7026/gastos');
  }  
} 
