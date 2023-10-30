import { Component, OnInit, inject } from '@angular/core';
import { UserApiService, Usuario } from 'src/api/user-api.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  usuarios: Usuario[] = []

  userApiService = inject(UserApiService)

  usuario: Usuario = {
    user: '',
    password: '',
    email: ''
  }
  
  async ngOnInit(){
    await this.loadData();
  }
  private async loadData() {
    this.usuarios = await this.userApiService.getListUser();
  }

  async saveUser(){
      await this.userApiService.saveUser(this.usuario);
      await this.loadData();
  }
}
