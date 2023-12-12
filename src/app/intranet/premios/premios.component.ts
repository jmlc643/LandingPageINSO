import {Component, inject, OnInit} from '@angular/core';
import {Premio, PremioApiService} from "../../../api/premio-api/premio-api.service";
import {PuntuarRequest, UserApiService, UsuarioDTO} from "../../../api/user-api/user-api.service";

@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})
export class PremiosComponent implements OnInit{
  //Identificador del iniciar sesion
  userLoginOn:boolean=false;

  //En caso haya un error
  errorData : string = "";

  //Identificador del usuario logeado
  public usuarioLogeado:any = {};

  //Listas
  premios: Premio[] = [];

  //Inyeccion de los servicios
  userApiService = inject(UserApiService);
  premioApiService = inject(PremioApiService);

  base64Array: string[] = [];
  images : string[] = []

  //Temporal
  usuarios: UsuarioDTO[] = []
  usuarioEncontrado?: UsuarioDTO;

  async ngOnInit() {
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
    await this.loadData();
    this.premios.forEach(premio =>{
      this.images.push(premio.imagen);
    })
    this.base64Array = this.generarBase64Array(this.images);
    this.usuarioEncontrado = this.usuarios.find(usuario => usuario.user == this.usuarioLogeado.sub)
  }

  private async loadData() {
    //Carga de la lista de los premios
    this.premios = await this.premioApiService.getListPremios();
    this.usuarios = await this.userApiService.getListUser();
  }

  //Metodo para desencriptar token
  private decodificarjwt(token:String):any{
    //Pasarlo a base64
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //Convertirlo a JSON
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log("JSON: "+jsonPayload);
    return JSON.parse(jsonPayload); //Devolver JSON
  }

  //Funcion para pasar de base64 a imagen

  private generarBase64Array(datos: string[]): string[] {
    // Aquí, para cada elemento en el array, puedes convertirlo a Base64 y almacenarlo en un nuevo array
    return datos.map((dato) => this.convertirABase64(dato));
  }

  private convertirABase64(dato: string): string {
    // Aquí deberías tener la lógica para convertir el dato a Base64
    // Puedes usar alguna librería o implementar tu propia lógica
    // Por ejemplo, aquí se usa btoa() para convertir una cadena a Base64
    console.log("Mi dato" +dato);
    return btoa(dato);
  }

  tieneAcceso(){
    return this.userLoginOn;
  }

  canjeo(premio : Premio){
    const canjeo: PuntuarRequest = {
      username: this.usuarioLogeado.sub,
      nombre: premio.nombre,
      puntos: premio.precio
    }
    // @ts-ignore
    if(this.usuarioEncontrado?.nroPuntos - canjeo.puntos >= 0){
      this.userApiService.canjear(canjeo).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error : (errorData: any) => {
          console.error(errorData);
        },
        complete: () => {
          console.info("Canjeo completado");
          location.reload();
        }
      });
    }else{ console.error("Saldo insuficiente")}

  }

}

