import { Component, OnInit, inject } from '@angular/core';
import { CategoriaApiService, Categoria} from 'src/api/categoria-api/categoria-api.service';
import { TopicoApiService, Topico} from 'src/api/topico-api/topico-api.service';
import { UserApiService, Usuario } from 'src/api/user-api/user-api.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  
  //Identificador del iniciar sesion
  userLoginOn:boolean=false;

  public usuarioLogeado:any = {}; //Identificador del usuario logeado
  
  errorData:String="";

  //Listas
  categorias?: Categoria[] = [];
  topicos: Topico[] = [];
  filteredTopicos: Topico[] = [];

  //Inyeccion de los servicios
  categoriaApiService = inject(CategoriaApiService)
  topicoApiService = inject(TopicoApiService)
  userApiService = inject(UserApiService);

  ngOnInit(){

    //Identificar si el usuario esta logeado
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
    
    //Asigna el token a una variable
    let token = this.userApiService.userToken;
    //Devuelve un JSON con el token desencriptado
    this.usuarioLogeado = this.decodificarjwt(token);
    console.log(this.usuarioLogeado);
    //Carga de datos
    this.loadData();
    console.log(this.topicos);
  }

  filterTopicos(categoria: Categoria): Topico[] {
    return this.topicos.filter(topicoo => categoria.nombre === topicoo.categoria.nombre);
  }
  
  private async loadData() {
    //Carga de la lista de las categorias
    this.categoriaApiService.getListCategoria().subscribe({
      next: (categoriaData)=>{
        this.categorias = categoriaData; //Asigna las categorias a una lista
      },
      error: (errorData) => {
        this.errorData = errorData;
      },
      complete: () =>{
        console.info("Data obtenida")
      }
    })

    //Carga de la lista de los topicos
    this.topicoApiService.getListTopicos().subscribe({
      next: (topicoData)=>{
        this.topicos = topicoData; //Asigna los topicos a una lista
      },
      error: (errorData) => {
        this.errorData = errorData;
      },
      complete: () =>{
        console.info("Data obtenida")
      }
    });

    this.userApiService.getListUser();
  }

  //Metodo para desencriptar token
  private decodificarjwt(token:String):any{
    //Pasarlo a base64
    console.log("Este es el token que he recibido "+ token);
    var base64Url = token.split('.')[1];
    console.log("Token base64url: "+ base64Url);
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    console.log("Token base64: "+base64);
    //Convertirlo a JSON
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log("JSON: "+jsonPayload);
    return JSON.parse(jsonPayload); //Devolver JSON
  }
  
}