import { Component, OnInit, inject } from '@angular/core';
import { UserApiService, Usuario } from 'src/api/user-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LearnSync';
  usuarios: Usuario[] = []

  userApiService = inject(UserApiService)

  async ngOnInit(){
    this.usuarios = await this.userApiService.getListUser();
  }
}
