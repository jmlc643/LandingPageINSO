import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topico, TopicoApiService } from 'src/api/topico-api/topico-api.service';
import { UserApiService } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-topicos-lista',
  templateUrl: './topicos-lista.component.html',
  styleUrls: ['./topicos-lista.component.css']
})
export class TopicosListaComponent implements OnInit{
  
  userLoginOn:boolean=false; //Identificador de si el usuario esta logeado
  
  //Routers
  activatedRoute = inject(ActivatedRoute); //Para recibir el id enrutado
  router = inject(Router); //Para hacer navegaciones

  //Listas
  topicos: Topico[] = [] //Lista de topicos en general
  filterTopicos: Topico[] = [] //Topicos filtrado segun la categoria a la que esta asignado 
  
  //Topico encontrado
  topicoEncontrado: Topico = {
    id: 0,
    nombre: '',
    descripcion: '',
    categoria: {
      nombre: '',
      descripcion: ''
    }
  }

  c = 1 ; //Para saber si mostrar el componente de publicar hilo

  // ID del topico a encontrar
  idd: number = 0;

  //Inyeccion de Servicios
  topicoApiService = inject(TopicoApiService)
  userApiService = inject(UserApiService)


//Metodo para inicializar
  async ngOnInit(){
    //Actualiza el valor del userLoginOn
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })

    //Recibe el parametro del id enrutado y lo guarda en una variable
    this.activatedRoute.params.subscribe( prm => {
      console.log(`El id es: ${prm['id']}`);
      this.idd = +this.activatedRoute.snapshot.params['id'];
    })

  //Carga los datos de la BD
      await this.loadData();
  }

  private async loadData(){

    await this.topicoApiService.getListTopicos(); //Todos los topicos de la BD
    await this.encontrarTopico(); //Encontrando el topico con el ID enrutado
    console.log(this.topicoEncontrado);
    this.listarPorCategoria(this.topicoEncontrado); //Devuelve los topicos de la izquierda

  }

  //Filtro de la lista de topicos
  private async listarPorCategoria(topico : Topico){
    this.filterTopicos = await this.topicoApiService.listarTopicoPorCategoria(topico);
  }

  //Encontrar el topico con el ID enrutado
  private async encontrarTopico(){
    this.topicoEncontrado = await this.topicoApiService.encontrarTopico(this.idd);
  }

  //Navegacion para el cambio de topico
  link(topico:Topico){
    this.router.navigateByUrl('/intranet/comunidad/'+ topico.id);
    location.reload();
  }
}
