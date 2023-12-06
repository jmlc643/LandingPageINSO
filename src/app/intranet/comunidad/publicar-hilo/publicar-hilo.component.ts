import { Component, Input, OnInit, inject } from '@angular/core';
import { TopicosListaComponent} from "../topicos-lista/topicos-lista.component";
import { Hilo, HiloApiService, SaveHiloRequest } from 'src/api/hilo-api/hilo-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/api/user-api/user-api.service';
import { Topico } from 'src/api/topico-api/topico-api.service';
import { JwtInterceptorService } from 'src/api/jwt-api/jwt-interceptor.service';

@Component({
  selector: 'app-publicar-hilo',
  templateUrl: './publicar-hilo.component.html',
  styleUrls: ['./publicar-hilo.component.css']
})
export class PublicarHiloComponent implements OnInit {
  //Devuelve el topico encontrado
  @Input() topicoEncontrado?: Topico;
  topico = TopicosListaComponent
  protected readonly TopicosListaComponent = TopicosListaComponent;
  protected readonly top = top;

  //Mapear el hilo que se va a crear
  hilo : SaveHiloRequest = {
    titulo: '',
    mensaje: '',
    username: '',
    topicname: '' 
  }

  //Por si hay errores en el formulario
  formError : String = "";
  errorData: String="";

  //Devolver los datos del usuario logeado
  usuarioLogeado :any = {};
  //Identificador de si esta logeado el usuario
  userLoginOn : boolean = false;
  //Lista
  hilos: Hilo[] = [];
  
  //Inyecciones de los servicios
  userApiService = inject(UserApiService);
  hiloApiService = inject(HiloApiService);
  router = inject(Router) //Navegar
  formBuilder = inject(FormBuilder)
  
  //Validaciones
  createHiloForm = this.formBuilder.group({
      titulo: ['',[Validators.required, Validators.maxLength(30)]],
      mensaje: ['', Validators.maxLength(200)]
  })


  //Para observar o escuchar
  private loadData(){
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  }

  //Decodificar el JWT
  public decodificarjwt(token:String):any{

    //Lo pasa a base 64
    console.log("Este es el token que he recibido "+ token);
    var base64Url = token.split('.')[1];
    console.log("Token base64url: "+ base64Url);
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    console.log("Token base64: "+base64);
    //Convertir a JSON
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log("JSON: "+jsonPayload);
    return JSON.parse(jsonPayload); //Devuelve JSON
  }
  
  get name(){
    return this.createHiloForm.controls.titulo;
  }

  get message(){
    return this.createHiloForm.controls.mensaje;
  }

  ngOnInit(): void {
    //Recibe el valor del token
    let token = this.userApiService.userToken;
    //Desencripta y da el valor del JSON a una variable
    this.usuarioLogeado = this.decodificarjwt(token);
    console.log(this.usuarioLogeado);
    //Carga de hilos de la BD
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
    this.loadData();
  }

  regresarHilo(){
    this.router.navigateByUrl('/intranet/comunidad/'+ this.topicoEncontrado?.id);
    window.location.reload(); 
  }

  //Formulario para crear hilo
  saveHilo(){
    //Valida lo que se ingresa
    if(this.createHiloForm.valid){
      this.formError = "";
      this.hilo.username = this.usuarioLogeado.sub as string;
      this.hilo.topicname = this.topicoEncontrado?.nombre as string;
        this.hiloApiService.publicarHilo(this.hilo).subscribe({
          next: (hiloData) => {
            console.log(hiloData)
          },
          error : (errorData: any) => {
            console.error(errorData);
            this.formError="Error al crear";
          },
          complete: () => {
            console.info("Creacion completada")
            this.router.navigateByUrl('/intranet/comunidad/'+ this.topicoEncontrado?.id);
            this.createHiloForm.reset();
            window.location.reload();
          }
        });
    }else{
      this.createHiloForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    } 
  }
}
