import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Mazo, MazoApiService} from "../../../api/mazo-api/mazo-api.service";
import {UserApiService} from "../../../api/user-api/user-api.service";

@Component({
  selector: 'app-mazos',
  templateUrl: './mazos.component.html',
  styleUrls: ['./mazos.component.css']
})
export class MazosComponent implements OnInit{
  //Identificador para saber si esta logeado
  userLoginOn : boolean = false;

  //Inyecciones
  router = inject(Router);
  mazoApiService = inject(MazoApiService);
  userApiService = inject(UserApiService);

  //Listas
  mazos : Mazo[] = [];

  async ngOnInit() {
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
    await this.loadData();
  }

  private async loadData(){
    this.mazos = await this.mazoApiService.getListMazos();
  }

  practicar(mazo: Mazo){
    this.router.navigateByUrl("/intranet/flashcard/"+mazo.id);
  }

  tieneAcceso(): boolean {
    return this.userLoginOn;
  }
}
