import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, map, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gastos } from 'src/app/Gastos';
import { Filters } from 'src/app/filter';
import { Sorting } from 'src/app/sort';
import { Pagination } from 'src/app/Interface/Pagination';
import { ColumnsTrackOrderList } from 'src/app/Interface/columns-track-order-list';
import { categoriaGasto } from 'src/app/Interface/categoriaGasto';
import { AgregarGastoRequest } from 'src/app/Interface/agregarGastoRequest';
import { AgregarIngresoRequest } from 'src/app/Interface/agregarIngresoRequest';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  searchKeyword$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
  ){}

    ngOnInit(){}

    exportAsExcelFile(filters: Filters, sorting: Sorting,pagination : Pagination, search :boolean) : Observable<[Gastos]> {
      const params = new HttpParams({
        fromObject: {
          ...filters,
          ...sorting,
          ...pagination
        }
      });
     
      return this.http.get<[Gastos]>('https://localhost:7026/gastos/search', { params }).pipe(
        catchError(error => {
          throw 'Error en la petición al servidor: ' + error;
        })
      );
    }

   
    getDataFromServer(filters: Filters, sorting: Sorting,pagination : Pagination): Observable<{data:Gastos[], totalItems: number}> {
      const params = new HttpParams({
        fromObject: {
          ...filters,
          ...sorting,
          ...pagination
        }
      });
      return this.http.get<{data:Gastos[], totalItems: number}>('https://localhost:7026/gastos/search', { params }).pipe(
        map(response => {
          return {
            data: response.data,
            totalItems:response.totalItems
          };
         
        }),
        
        catchError(error => {
          throw 'Error en la petición al servidor: ' + error;
        })
      );
      
    }

    getCountOrders(filters: Filters): Observable<{ data: number }> {
      const params = new HttpParams({
        fromObject: {
          ...filters
        }
      });
  
      return this.http.get<{data: number}>('https://localhost:7026/gastos/orderCount', { params }).pipe(
        map(response => ({
          data: response.data,
        })),
        catchError(error => {
          throw 'Error en la petición al servidor: ' + error;
        })
      );
    }

    sendDataToServer(nuevoGasto: AgregarGastoRequest): Observable<{data:string}> {
      return this.http.post<{data:string}>('https://localhost:7026/gastos/agregarGasto', nuevoGasto).pipe(
        map(response => ({
          data: response.data,
        })),
        catchError(error => {
          console.error('Error al enviar la solicitud:', error);
          return throwError('Ocurrió un error al enviar la solicitud al servidor.');
        })
      );
    }

    postIngreso(nuevoIngreso: AgregarIngresoRequest): Observable<{data:string}> {
      return this.http.post<{data:string}>('https://localhost:7026/gastos/agregarIngreso', nuevoIngreso).pipe(
        map(response => ({
          data: response.data,
        })),
        catchError(error => {
          console.error('Error al enviar la solicitud:', error);
          return throwError('Ocurrió un error al enviar la solicitud al servidor.');
        })
      );
    }
    
    
}
