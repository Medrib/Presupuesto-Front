import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { OrderService } from '../order-service/order-service.service';
import { LanguageService } from '../order-service/language-control-service.service';
import { Gastos } from 'src/app/Gastos';
import { Pagination } from 'src/app/Interface/Pagination';
import { Filters } from 'src/app/filter';
import { Sorting } from 'src/app/sort';
import { ColumnsTrackOrderList } from 'src/app/Interface/columns-track-order-list';
import { OrderTrackingListComponent } from '../order-tracking-list/order-tracking-list.component';
  @Component({
    selector: 'app-export',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.css']
  })
  export class ExportComponent  {
    @Output() exportData: EventEmitter<ColumnsTrackOrderList[]> = new EventEmitter<ColumnsTrackOrderList[]>();
    @Input() dataExport: ColumnsTrackOrderList[] = [];

    columnsTrackOrder!: ColumnsTrackOrderList
    fileName= 'ExcelSheet.xlsx';
    showExcelTable: boolean = false;
    public filter: Filters = {  };
    public pagination : Pagination = {pageNumber : 1,pageSize : 5};
    public sorting: Sorting = { sortBy : '', ColumnName: ''};
    mostrarFormulario: boolean | undefined;


  
    constructor(
      private  orderService : OrderService  , 
      private languageService : LanguageService,
    ){ }
   
    exportToExcel(data: ColumnsTrackOrderList[]): any {
      this.exportData.emit(data);
      this.exportOrdersToExcel(this.dataExport);
    }
    
    private exportOrdersToExcel(orderColumns: ColumnsTrackOrderList[]): void {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(orderColumns);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, this.fileName);
    }

    onLanguageChange(): void {
      this.languageService.changeLanguage();
    }
    
}
