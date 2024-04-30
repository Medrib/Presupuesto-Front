import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {
  router: any;
  constructor(public dialogRef: MatDialogRef<CuentaComponent>) { }

  cerrarPopup(): void {
    this.dialogRef.close();
  }
  
  cerrarYIr(): void {
    this.cerrarPopup(); 
    this.router.navigate(['/GestorDeCuentas']);
  }
}
