import { Component, OnInit, inject} from '@angular/core';
import { UserApiService, Usuario, ComprobarPassword, AuthenticationUserResponse } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})

export class RegistrarseComponent implements OnInit {

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
  async saveUser(){
    if(this.usuario.password == this.verifyPassword.passw){
      await this.userApiService.saveUser(this.usuario);
      this.authenticationUserResponse.mensaje = 'Logeado!'
    }else{
      this.authenticationUserResponse.mensaje = 'Contraseñas diferentes';
    }     
  }
}
