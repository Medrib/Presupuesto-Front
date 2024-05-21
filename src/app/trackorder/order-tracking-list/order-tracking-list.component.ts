import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, Subject, combineLatest, debounceTime, finalize, forkJoin, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { PagingDataRequest } from 'src/app/paging-data-request';
import { SortOrder } from 'src/app/sort-order';
import { delay, filter } from 'rxjs/operators';
import { GridColumnName } from 'src/app/grid-column-name';
import { GridColumnsDetails } from 'src/app/grid-columns-details';
import { OrderService } from '../order-service/order-service.service';
import { Gastos } from 'src/app/Gastos';
import { Filters } from 'src/app/filter';
import { Sorting } from 'src/app/sort';
import { Pagination } from 'src/app/Interface/Pagination';
import { ColumnsTrackOrderList} from 'src/app/Interface/columns-track-order-list';
import { categoriaGasto } from 'src/app/Interface/categoriaGasto';
import { MatDialog } from '@angular/material/dialog';
import { PopupEditarComponent } from 'src/app/popup-editar/popup-editar.component';
 
@Component({
  selector: 'app-order-tracking-list',
  templateUrl: './order-tracking-list.component.html',
  styleUrls: ['./order-tracking-list.component.css'],
  
})
export class OrderTrackingListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @Output() export: ColumnsTrackOrderList[] = [];

  public orderBy$ = new BehaviorSubject<Sorting>({ sortBy: '', ColumnName: '' });
  public searchKeyword$ = new BehaviorSubject<number>(0);
  public columnInputChanges$ = new BehaviorSubject<[string, string]>(['', '']);
  public filteredElements$!: Observable<ColumnsTrackOrderList[]>;
  public startIndex = 1;
  public filter: Filters = {  };
  public sorting: Sorting = { sortBy : '', ColumnName: ''};
  public paginationRequest$! : BehaviorSubject<PagingDataRequest> ;
  public pageSize:number = 5;
  public pageIndex:number = 1;
  public paginationRequestCache$: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({
    pageNumber: this.pageIndex,
    pageSize: this.pageSize,
  });
  public focusableSortCell! : HTMLElement | undefined;
  public totalItems!:number;
  public columnsTrackOrder: ColumnsTrackOrderList[] = []; 
  public sortableColumnDetails: GridColumnsDetails[] = [
    {
        columnName: GridColumnName.code,
        label: 'ID',
        sortOrder: SortOrder.none,
    },
    {
        columnName: GridColumnName.name,
        label: 'Name',
        sortOrder: SortOrder.none,
    },
];
  defaultSearchBy = '';
  ascendingIconVisible: boolean | null = null;
  valor: any;
  searchKeywords: { [column: string]: string } = {};
  displayedColumns: string[] = ['CategoriaDeGastos', 'Monto','cuenta', 'Descripcion', 'Fecha', 'Editar o Eliminar'];
  activeColumnStates: { [key: string]: boolean } = {};
  isLoading: any;
  pagingData!: Pagination;
  dataSource = new MatTableDataSource<ColumnsTrackOrderList>();
  filters !: Filters


  constructor(
     private  orderService : OrderService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getDataFromGrid();
  }
  
  ngAfterViewInit() {
      this.dataSource.sort = this.sort;
  }
  
  onInputChanged(event: Event, column: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const value = inputElement.value;
      if (value.length > 3) {
        setTimeout(() => {
          this.columnInputChanges$.next([column, value]);
        }, 2000);
      } else {
        this.columnInputChanges$.next([column, value]);
      }
    }
  }

  getDataFromGrid(): void {
    combineLatest([
      this.searchKeyword$,
      this.orderBy$,
      this.paginationRequestCache$,
      this.columnInputChanges$,
      
    ]).pipe(
      switchMap(([searchKeyword, orderBy, paginationRequest,[column,value]]) =>
        this.getData(searchKeyword, orderBy, paginationRequest,column,value)
      )
    ).subscribe(data => {
      this.dataSource.data = data;
      this.export = data;
    });
  }
  
  onExportClicked(columnsTrackOrder : ColumnsTrackOrderList[]): ColumnsTrackOrderList[] {
    columnsTrackOrder = this.dataSource.data;
    this.export = this.dataSource.data;
    return this.export;
  }

  getData(searchKeyword: number, orderBy: Sorting, paginationRequest: Pagination, column: string, value: string): Observable<ColumnsTrackOrderList[]> {
    const filters: Filters = {
      Id: searchKeyword
    };
    const filterToUse = filters;
    
    return this.orderService.getDataFromServer(filterToUse, orderBy, paginationRequest).pipe(
      tap(orders => {
        this.totalItems = orders.totalItems;
      }),
      map(orders => this.mapOrdersToColumns(orders.data))
    );
  }

  sortGrid(columnName: string, orderBy: string, event: MouseEvent): void {
    const sorting: Sorting = {
      sortBy: orderBy.toUpperCase(),
      ColumnName: columnName
    };
   
    this.activeColumnStates = { [columnName]: orderBy === 'asc' };
 
    this.ascendingIconVisible = orderBy === 'asc';
    this.orderBy$.next(sorting);
  }
 
  isIconActive(column: string, order: 'asc' | 'desc'): boolean {
    return this.activeColumnStates[column] !== undefined &&
      (order === 'asc' ? this.activeColumnStates[column] : !this.activeColumnStates[column]);
  }
 
  applyPagination(pageNumber: number, pageSize: number): void {
    this.paginationRequestCache$.next({ pageNumber: pageNumber, pageSize: pageSize });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.applyPagination(this.pageIndex, event.pageSize);
  }

  applyFilter(searchKeyword: number): void {
    this.searchKeyword$.next(searchKeyword);
  }

  private performSecondSearch(searchKeyword: number, orderBy: Sorting, paginationRequest: Pagination): Observable<ColumnsTrackOrderList[]> {
    const filtrado: Filters = {
      NroMaterialIturri: searchKeyword
    };
  
    return this.orderService.getDataFromServer(filtrado, orderBy, paginationRequest).pipe(
      map(response => { 
        const secondSearchResult = response.data;
        const secondSearchArray: Gastos[] = Array.isArray(secondSearchResult) ? secondSearchResult : [secondSearchResult];
        this.totalItems = response.totalItems;
        return this.mapOrdersToColumns(secondSearchArray);
      })
    );
  }
  
  private mapOrdersToColumns(orders: Gastos[]): ColumnsTrackOrderList[] {
    return orders.map(order => {
      return this.mapOrderToColumnsTrackOrderList(order);
    });
  }
  
  private mapOrderToColumnsTrackOrderList(order: Gastos): ColumnsTrackOrderList {
    const formattedDate = order.fecha ? new Date(order.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

    return { 
      id :order.idGasto,
      CategoriaDeGastos: order.categoriaGasto?.nombre,
      cuenta:order.cuenta?.nombre,
      Monto: order.monto,
      Descripcion: order.descripcion,
      Fecha: formattedDate,
    };
  }

  eliminar(element: ColumnsTrackOrderList): void {
    const idGasto = element.id;
    this.orderService.eliminarGasto(idGasto).subscribe(
      () => {
        console.log('Gasto eliminado correctamente');
      },
      error => {
        console.error('Error al eliminar el gasto', error);
      }
    );
  }
  
  editarPopup(element : ColumnsTrackOrderList){
    this.dialog.open(PopupEditarComponent, {
      width: '400px',
      data: element
    });
  }
}
