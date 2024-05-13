import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoriaComponent } from 'src/app/categoria/categoria.component';
import { OrderService } from '../order-service/order-service.service';
import { Categoria } from 'src/app/Interface/Categoria';
import { AgregarCategoriaRequest } from 'src/app/Interface/agregarCategoriaRequest';


@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent {
  categorias: Categoria[] = [];
  categoriaNueva!: AgregarCategoriaRequest;
  constructor(
    
    public dialog: MatDialog, private orderService: OrderService) {}
 
  
  abrirCuenta(): void {
    const dialogRef = this.dialog.open(CategoriaComponent, {
      width: '400px'
    });
  }
}
