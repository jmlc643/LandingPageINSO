import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService, Usuario, AuthenticationUser } from 'src/api/user-api/user-api.service';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit{
  loginError:String="";
  formBuilder = inject(FormBuilder)
  router = inject(Router)
  loginForm = this.formBuilder.group({
      usuario: ['',Validators.required],
      password: ['',Validators.required]
  })
  authenticationUser:AuthenticationUser = {
    user : "",
    password : ""
  }

    userApiService = inject(UserApiService)

    async ngOnInit(){
        await this.loadData();
      }

      get user(){
        return this.loginForm.controls.usuario;
      }

      get pass(){
        return this.loginForm.controls.password;
      }

    autenticarUsuario(){
      if(this.loginForm.valid){
        this.loginError="";
        console.log("Llamando al servicio de autenticar sesion "+this.loginForm);
        this.userApiService.iniciarSesion(this.authenticationUser).subscribe({
          next: (userData) => {
            console.log(userData)
          },
          error : (errorData: any) => {
            console.error(errorData);
            this.loginError="Credenciales invalidas";
          },
          complete: () => {
            console.info("Login completo")
            this.router.navigateByUrl('/intranet');
            this.loginForm.reset;
          }
        });
      }else{
        this.loginForm.markAllAsTouched();
        alert("Error de ingreso de datos")
      } 
      }

     private async loadData() {
          await this.userApiService.getListUser();
      }
}
