import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { OrderService } from '../trackorder/order-service/order-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateUsuarioRequest } from '../Interface/CreateUsuarioRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registar-usuario',
  templateUrl: './registar-usuario.component.html',
  styleUrls: ['./registar-usuario.component.css']
})
export class RegistarUsuarioComponent implements OnInit {
  envioMessage = '';
  errorMessage = '';
  registerUser!: FormGroup;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<RegistarUsuarioComponent>,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm(): void {
    this.registerUser = this.fb.group({
      Nombre: ['', Validators.required],
      CorreoElectronico: ['', Validators.required],
      Contraseña: ['',Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerUser.invalid) {
      this.errorMessage = 'Complete los campos correctamente.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return
      
    }
    
    this.registrarUsuario();
  }

  registrarUsuario(): void {
    const usuario: CreateUsuarioRequest = {
      Nombre: this.registerUser.value.Nombre,
      CorreoElectronico: this.registerUser.value.CorreoElectronico,
      Contraseña: this.registerUser.value.Contraseña,
    };

    this.orderService.CreateUsuario(usuario).subscribe(
      (response: { data: string }) => {
        this.envioMessage = "Usuario creado exitosamente";

        this.registerUser.reset({
          Nombre: '',
          CorreoElectronico: '',
          Contraseña: '',
        });

        setTimeout(() => {
          this.dialogRef.close(true);
        },2000);
      },
      (error) => {
        this.errorMessage = 'Hubo un error al crear el usuario!';
        console.error('Error al crear el usuario!', error);

        this.registerUser.reset({
          Nombre: '',
          CorreoElectronico: '',
          Contraseña: '',
        });
      }
    );
  }

  crearUsuarioPopUp(element: CreateUsuarioRequest): void {    
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      height: '500px',
      data: {
      }
    });
  }

  afterClosed(): void {
      this.dialogRef.close(false);
  }
}
