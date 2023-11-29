import { Component, Input, OnInit, inject } from '@angular/core';
import { Hilo, HiloApiService } from 'src/api/hilo-api/hilo-api.service';
import { Topico, TopicoApiService } from 'src/api/topico-api/topico-api.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {
  @Input() topicoEncontrado?: Topico;

  hilos: Hilo[] = []
  topicos: Topico[] = []

  hiloApiService = inject(HiloApiService)
  topicoApiService = inject(TopicoApiService)

  async ngOnInit(){
      this.loadData();
  }

  private async loadData(){
    this.topicos = await this.topicoApiService.getListTopicos();
    this.hilos = await this.hiloApiService.getListHilos();
  }

  filterHilos(): Hilo[] {
    return this.hilos.filter(hilo => this.topicoEncontrado?.nombre === hilo.topico.nombre);
  }
}
