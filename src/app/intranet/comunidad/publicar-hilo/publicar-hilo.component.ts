import { Component } from '@angular/core';
import { TopicosListaComponent} from "../topicos-lista/topicos-lista.component";

@Component({
  selector: 'app-publicar-hilo',
  templateUrl: './publicar-hilo.component.html',
  styleUrls: ['./publicar-hilo.component.css']
})
export class PublicarHiloComponent {
  topico = TopicosListaComponent
  protected readonly TopicosListaComponent = TopicosListaComponent;
  protected readonly top = top;
}
