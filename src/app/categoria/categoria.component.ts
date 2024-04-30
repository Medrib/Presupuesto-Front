import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  router: any;
  constructor(public dialogRef: MatDialogRef<CategoriaComponent>) { }

  cerrarPopup(): void {
    this.dialogRef.close();
  }
  
  cerrarYIr(): void {
    this.cerrarPopup(); 
    this.router.navigate(['/categoriaDeGastos']);
  }
}

