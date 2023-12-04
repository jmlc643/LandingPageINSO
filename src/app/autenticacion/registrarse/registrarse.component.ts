import { Component, OnInit, inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  registerForm = this.formBuilder.group({
      usuario: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
      passwordR: ['', [Validators.required, Validators.min(8)]]
  })

  verifyPassword: ComprobarPassword = {
    passw : ''
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

  async ngOnInit(){

  }
  get user(){
    return this.registerForm.controls.usuario;
  }

  get email(){
    return this.registerForm.controls.email;
  }

  get pass(){
    return this.registerForm.controls.password;
  }

  get passR(){
    return this.registerForm.controls.passwordR;
  }

  saveUser(){
    if(this.registerForm.valid){
      if(this.usuario.password == this.verifyPassword.passw){
        this.userApiService.saveUser(this.usuario).subscribe({
          next: (userData) => {
            console.log(userData)
          },
          error : (errorData: any) => {
            console.error(errorData);
            this.formError="No se pudo crear cuenta";
          },
          complete: () => {
            console.info("Register completo")
            this.router.navigateByUrl('/porconfirmar');
            this.registerForm.reset();
          }
        });
      }else{
        this.authenticationUserResponse.mensaje = 'Contraseñas diferentes';
      }    
    }else{
      this.registerForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    }   
  }
}
