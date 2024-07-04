import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { OrderService } from 'src/app/trackorder/order-service/order-service.service';
import { UsuarioRequest } from 'src/app/Interface/UsuarioRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialog,MatDialogRef } from '@angular/material/dialog';
import { RegistarUsuarioComponent } from '../registar-usuario/registar-usuario.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  envioMessage :string = '';
  errorMessage :string = '';
  agregar : boolean=false;
  constructor(
    private appComponent: AppComponent, 
    public  orderService: OrderService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.appComponent.showHeader = false;
    this.iniciarForm();
  }

  ngOnDestroy(): void {
    this.appComponent.showHeader = true;
  }
  iniciarForm(): void {
    this.loginForm = this.fb.group({
      CorreoElectronico: ['', Validators.required,],
      Contraseña: ['',Validators.required,],
    });
  }

  onSubmit(): void {
    var usuario : UsuarioRequest = {
      CorreoElectronico: this.loginForm.value.CorreoElectronico,
      Contraseña:this.loginForm.value.Contraseña}
    this.orderService.UsuarioRequest(usuario).subscribe(
      (response: { data: string }) => { 
        this.router.navigate(['/OrderTrackingList']);
      },
        (error) => {
          this.errorMessage = 'No se encontro al usuario!';
          console.error('No se encontro al usuario!:', error);

          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
        )
    } 

  crearUsuario(): void {    
    const dialogRef = this.dialog.open(RegistarUsuarioComponent, {
      width: '500px',
      height: '500px',
      data: {
      }
    });
  }
}
