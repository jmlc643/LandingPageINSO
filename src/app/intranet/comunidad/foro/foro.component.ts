import { Component, Input, OnInit, inject } from '@angular/core';
import { Hilo, HiloApiService } from 'src/api/hilo-api/hilo-api.service';
import { Topico, TopicoApiService } from 'src/api/topico-api/topico-api.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  @Input() topicoEncontrado?: Topico; //Devuelve el topico del componente padre
  errorData:String="";
  
  //Listas
  hilos: Hilo[] = []

  //Inyeccion de servicios
  hiloApiService = inject(HiloApiService)
  topicoApiService = inject(TopicoApiService)

  //Carga de datos
  async ngOnInit(){
      this.loadData();
  }

  private loadData(){
    //Carga de los topicos de la BD
    this.topicoApiService.getListTopicos();
    //Carga de los hilos
    this.hiloApiService.getListHilos().subscribe({
      next: (hiloData)=>{
        this.hilos = hiloData;
      },
      error: (errorData) => {
        this.errorData = errorData;
      },
      complete: () =>{
        console.info("Data obtenida")
      }
    })
  }

  filterHilos(): Hilo[] {
    return this.hilos.filter(hilo => this.topicoEncontrado?.nombre === hilo.topico.nombre);
  }
}
