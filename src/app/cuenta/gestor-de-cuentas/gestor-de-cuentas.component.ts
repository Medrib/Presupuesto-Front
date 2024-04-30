// gestor-de-cuentas.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-gestor-de-cuentas',
  templateUrl: './gestor-de-cuentas.component.html',
  styleUrls: ['./gestor-de-cuentas.component.css']
})
export class GestorDeCuentasComponent {
  popupVisible = false;
  selectedOption: string | undefined;

  togglePopup() {
    this.popupVisible = !this.popupVisible;
  }

  handleOptionSelected(option: string) {
    this.selectedOption = option;
    this.popupVisible = false;
  }
}
