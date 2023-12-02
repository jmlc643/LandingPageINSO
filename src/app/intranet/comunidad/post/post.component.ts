import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario, ComentarioApiService } from 'src/api/comentario-api/comentario-api.service';
import { Hilo, HiloApiService } from 'src/api/hilo-api/hilo-api.service';
import { UserApiService, Usuario } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

  constructor(private activatedRoute : ActivatedRoute){
    activatedRoute.params.subscribe( prm => {
      console.log(`El id es: ${prm['id']}`);
  })
  }

  hilos : Hilo[] = []
  usuarios : Usuario[] = []
  comentarios : Comentario[] = []

  hiloApiService = inject(HiloApiService)
  userApiService = inject(UserApiService)
  comentarioApiService = inject(ComentarioApiService)

  hiloEncontrado? : Hilo; 


  idd: number = 0;
  async ngOnInit() {
      this.idd = +this.activatedRoute.snapshot.params['id'];
      await this.loadData();
  }

  private async loadData() {
    await this.hiloApiService.getListHilos();
    this.usuarios = await this.userApiService.getListUser();
    this.comentarios = await this.comentarioApiService.getListComentarios();
    console.log(this.comentarios);
    await this.encontrarHilo();
  }

  private async encontrarHilo(){
    this.hiloEncontrado = await this.hiloApiService.encontrarHilo(this.idd);
  }

  filterComentarios(): Comentario[] {
    return this.comentarios.filter(comentarioo => this.hiloEncontrado?.id === comentarioo.hilo?.id);
  }
}
