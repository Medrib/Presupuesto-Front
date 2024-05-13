import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gastos } from 'src/app/Gastos';
import { Filters } from 'src/app/filter';
import { Sorting } from 'src/app/sort';
import { Pagination } from 'src/app/Interface/Pagination';
import { AgregarGastoRequest } from 'src/app/Interface/agregarGastoRequest';
import { AgregarIngresoRequest } from 'src/app/Interface/agregarIngresoRequest';
import { AgregarCategoriaRequest } from 'src/app/Interface/agregarCategoriaRequest';
import { Categoria } from 'src/app/Interface/Categoria';
import { cuentaDatos } from 'src/app/Interface/obtenerCuenta';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  searchKeyword$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  envioCategoria$: Subject<Categoria> = new Subject<Categoria>();
  envioCuenta$: Subject<cuentaDatos> = new Subject<cuentaDatos>();
  

  constructor(private http: HttpClient) {}

  envioCategoria(categoria: Categoria): void {
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
}
