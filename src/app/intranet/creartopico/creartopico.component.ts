import { Component, OnInit, inject } from '@angular/core';
import { Categoria, CategoriaApiService } from 'src/api/categoria-api/categoria-api.service';
import { TopicoApiService, Topico, SaveTopicoRequest, saveTopicoResponse} from 'src/api/topico-api/topico-api.service';
import { UserApiService, Usuario } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-creartopico',
  templateUrl: './creartopico.component.html',
  styleUrls: ['./creartopico.component.css']
})
export class CrearTopicoComponent implements OnInit{
  userLoginOn:boolean=false;
  userData?:String;
  user?:Usuario;
  userApiService = inject(UserApiService);
  errorData:String="";
  topico: SaveTopicoRequest = {
    nombre : '',
    descripcion : '',
    nombreCategoria : ''
  }

  saveTopicoResponse : saveTopicoResponse = {
    mensajeCrear : '',
    mensajeNulo : ''
  }

  topicoApiService = inject(TopicoApiService)
  categoriaApiService = inject(CategoriaApiService)

  topicos : Topico[] = []
  categorias?: Categoria[] = [];

  async ngOnInit() {
      await this.loadData();

  }

  private async loadData(){
    this.topicoApiService.getListTopicos().subscribe({
      next: (topicoData)=>{
        this.topicos = topicoData;
      },
      error: (errorData) => {
        this.errorData = errorData;
      },
      complete: () =>{
        console.info("Data obtenida")
      }
    });
    this.categoriaApiService.getListCategoria().subscribe({
      next: (categoriaData)=>{
        this.categorias = categoriaData;
      },
      error: (errorData) => {
        this.errorData = errorData;
      },
      complete: () =>{
        console.info("Data obtenida")
      }
    });
  }

  saveTopico(){
    this.topicos.forEach(topicoo =>{
      if(this.topico.nombre == topicoo.nombre){
        this.saveTopicoResponse.mensajeCrear = 'Topico existente';
      }
    })
    if(this.topico.nombreCategoria == ''){
      this.saveTopicoResponse.mensajeNulo = 'Escoja una categoría'
    }else{ 
      this.topicoApiService.crearTopico(this.topico); 
      this.saveTopicoResponse.mensajeCrear = '';
      this.saveTopicoResponse.mensajeNulo = '';
    }
  }
}
