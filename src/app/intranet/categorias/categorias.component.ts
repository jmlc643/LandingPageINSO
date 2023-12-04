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
  userLoginOn:boolean=false;
  userData?:String;
  user?:Usuario;
  public usuarioLogeado:any = {};
  userApiService = inject(UserApiService);
  errorData:String="";
  constructor(){
    
  }

  categorias?: Categoria[] = [];
  topicos: Topico[] = [];
  filteredTopicos: Topico[] = [];

  categoriaApiService = inject(CategoriaApiService)
  topicoApiService = inject(TopicoApiService)

  ngOnInit(){
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  
    let token = this.userApiService.userToken;
    this.usuarioLogeado = this.decodificarjwt(token);
    console.log(this.usuarioLogeado);
    
  
    this.userApiService.currentUserData.subscribe({
      next:(userData) => {
        this.userData = userData;
        console.log("Este es el token que estoy enviando: "+userData);
      }
    })
    this.loadData();
    console.log(this.topicos);
  }

  filterTopicos(categoria: Categoria): Topico[] {
    return this.topicos.filter(topicoo => categoria.nombre === topicoo.categoria.nombre);
  }
  
  private async loadData() {
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
    })
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
    this.userApiService.getListUser();
  }

  private decodificarjwt(token:String):any{
    console.log("Este es el token que he recibido "+ token);
    var base64Url = token.split('.')[1];
    console.log("Token base64url: "+ base64Url);
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    console.log("Token base64: "+base64);
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log("JSON: "+jsonPayload);
    return JSON.parse(jsonPayload);
  }
  
}