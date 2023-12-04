import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topico, TopicoApiService } from 'src/api/topico-api/topico-api.service';

@Component({
  selector: 'app-topicos-lista',
  templateUrl: './topicos-lista.component.html',
  styleUrls: ['./topicos-lista.component.css']
})
export class TopicosListaComponent implements OnInit{
  c = 1 ;
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  topicos: Topico[] = []
  filterTopicos: Topico[] = [] 
  topicoEncontrado: Topico = {
    id: 0,
    nombre: '',
    descripcion: '',
    categoria: {
      nombre: '',
      descripcion: ''
    }
  }

  idd: number = 0;

  topicoApiService = inject(TopicoApiService)

  async ngOnInit(){
    this.activatedRoute.params.subscribe( prm => {
      console.log(`El id es: ${prm['id']}`);
      this.idd = +this.activatedRoute.snapshot.params['id'];
  })
      await this.loadData();
  }

  private async loadData(){
    await this.topicoApiService.getListTopicos();
    await this.encontrarTopico();
    console.log(this.topicoEncontrado);
    this.listarPorCategoria(this.topicoEncontrado);
  }

  private async listarPorCategoria(topico : Topico){
    this.filterTopicos = await this.topicoApiService.listarTopicoPorCategoria(topico);
  }

  private async encontrarTopico(){
    this.topicoEncontrado = await this.topicoApiService.encontrarTopico(this.idd);
  }

  link(topico:Topico){
    this.router.navigateByUrl('/intranet/comunidad/'+ topico.id);
    location.reload();
  }
}
