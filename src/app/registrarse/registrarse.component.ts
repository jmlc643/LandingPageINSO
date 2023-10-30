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

  async ngOnInit(){
    this.usuarios = await this.userApiService.getListUser();
  }
}
