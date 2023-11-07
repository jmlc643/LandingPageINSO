import { Component, OnInit, inject } from '@angular/core';
import { UserApiService, Usuario, AuthenticationUser } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit{
  usuario: AuthenticationUser = {
      user: '',
      password: ''
    }

    usuarios: Usuario[] = []

    userApiService = inject(UserApiService)

    async ngOnInit(){
        await this.loadData();
      }

    async autenticarUsuario(){
        await this.userApiService.iniciarSesion(this.usuario);
      }

     private async loadData() {
          this.usuarios = await this.userApiService.getListUser();
      }
}
