import { Component, OnInit, inject} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService, Usuario, ComprobarPassword, AuthenticationUserResponse } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})

export class RegistrarseComponent implements OnInit {

  formError:String="";
  formBuilder = inject(FormBuilder)
  router = inject(Router)

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


  userApiService = inject(UserApiService)

  usuario: Usuario = {
    user: '',
    password: '',
    email: ''
  }

  authenticationUserResponse : AuthenticationUserResponse = {
    mensaje : ''
  }

  registerForm = this.formBuilder.group({
    usuario: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordR: ['', [Validators.required, Validators.minLength(8)]]
  }, { validators: this.passwordMatchValidator });

  ngOnInit(){
    
  }
  get user() {
    return this.registerForm.get('usuario');
  }
  
  get email() {
    return this.registerForm.get('email');
  }
  
  get pass() {
    return this.registerForm.get('password');
  }
  
  get passR() {
    return this.registerForm.get('passwordR');
  }
  

  saveUser(){
    if(this.registerForm.valid){
        this.userApiService.saveUser(this.usuario).subscribe({
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
            this.router.navigateByUrl('/porconfirmar');
            this.registerForm.reset();
          }
        }); 
    }else{
      this.registerForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    }   
  }
}
