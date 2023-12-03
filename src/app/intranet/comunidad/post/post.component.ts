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
export class PostComponent implements OnInit {
  errorData: String = "";
  activatedRoute = inject(ActivatedRoute);

  hilos: Hilo[] = [];
  usuarios: Usuario[] = [];
  comentarios: Comentario[] = [];

  hiloApiService = inject(HiloApiService);
  userApiService = inject(UserApiService);
  comentarioApiService = inject(ComentarioApiService);

  hiloEncontrado?: Hilo;
  idd: number = 0;

  ngOnInit() {
    this.activatedRoute.params.subscribe(prm => {
      console.log(`El id es: ${prm['id']}`);
      this.idd = +this.activatedRoute.snapshot.params['id'];
    });

    this.loadData();
  }

  private async loadData() {
    try {
      // Obtener hilos y usuarios
      await this.hiloApiService.getListHilos().subscribe({
        next: (hiloData) => {
          this.hilos = hiloData;
          this.encontrarHilo(); // Llama a encontrarHilo después de obtener los comentarios
        },
        error: (errorData) => {
          this.errorData = errorData;
        },
        complete: () => {
          console.info("Data obtenida");
          console.log(this.comentarios);
        }
      });;
      this.usuarios = await this.userApiService.getListUser();

      // Obtener comentarios mediante observables
      this.comentarioApiService.getListComentarios().subscribe({
        next: (comentarioData) => {
          this.comentarios = comentarioData;
          this.encontrarHilo(); // Llama a encontrarHilo después de obtener los comentarios
        },
        error: (errorData) => {
          this.errorData = errorData;
        },
        complete: () => {
          console.info("Data obtenida");
          console.log(this.comentarios);
        }
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  private encontrarHilo() {
    this.hiloEncontrado = this.hilos.find(hilo => hilo.id === this.idd);
  }

  filterComentarios(): Comentario[] {
    return this.comentarios.filter(comentarioo => this.hiloEncontrado?.id === comentarioo.hiloSerializer?.id);
  }
}
