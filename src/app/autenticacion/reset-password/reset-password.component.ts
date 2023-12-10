import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  //Se muestra si hay algun error
  formError:String="";

  //Inyeccion Servicios
  userApiService = inject(UserApiService);

  //Validaciones del formulario
  formBuilder = inject(FormBuilder)

  //Inyeccion routers
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute);

  //Validaciones de angular
  resetPassForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordR: ['', [Validators.required, Validators.minLength(8)]]
  }, { validators: this.passwordMatchValidator });

  //Validacion de contraseñas iguales
  passwordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const password = control.get('password')?.value;
    const repeat_password = control.get('passwordR')?.value;

    if (password !== repeat_password) {
      control.get('passwordR')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      control.get('passwordR')?.setErrors(null);
    }

    if (password && password.length < 8) {
      control.get('password')?.setErrors({ minlength: true });
      return { minlength: true };
    } else {
      control.get('password')?.setErrors(null);
    }

    return null;
  }

  //Variable donde se guardara el token
  tokenn : String = ""

  //Variable donde se guardara el password
  password : String = ""

  ngOnInit(): void {
    //Recibe el parametro del id enrutado y lo guarda en una variable
    this.activatedRoute.params.subscribe( prm => {
      console.log(`El token es: ${prm['token']}`);
      this.tokenn = this.activatedRoute.snapshot.params['token'];
    })
  }


  //Para acceder mas facil a los control name
  get pass() {
    return this.resetPassForm.get('password');
  }

  get passR() {
    return this.resetPassForm.get('passwordR');
  }

  resetPass(){
    if(this.resetPassForm.valid){
      this.userApiService.resetPass(this.password, this.tokenn).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error : (errorData: any) => {
          console.error(errorData);
          if (errorData && errorData.error && errorData.error.message) {
            // Si el error tiene un mensaje, puedes mostrarlo
            this.formError = errorData.error.message;
          } else {
            // Si no hay un mensaje específico, muestra un mensaje genérico
            this.formError = 'Error al procesar la solicitud';
          }
        },
        complete: () => {
          console.info("Register completo")
          this.router.navigateByUrl('/login');
          this.resetPassForm.reset();
        }
      });
    }else{
      this.resetPassForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    }
  }
}
