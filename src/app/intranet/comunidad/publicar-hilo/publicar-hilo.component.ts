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
  @Input() topicoEncontrado?: Topico;
  topico = TopicosListaComponent
  protected readonly TopicosListaComponent = TopicosListaComponent;
  protected readonly top = top;
  hilo : SaveHiloRequest = {
    titulo: '',
    mensaje: '',
    username: '',
    topicname: '' 
  }
  usuarioLogeado :any = {};
  userLoginOn : boolean = false;
  userApiService = inject(UserApiService);
  hilos: Hilo[] = [];
  hiloApiService = inject(HiloApiService)
  formError : String = "";
  router = inject(Router)
  jwtApiService = inject(JwtInterceptorService);
  formBuilder = inject(FormBuilder)
  createHiloForm = this.formBuilder.group({
      titulo: ['',[Validators.required, Validators.max(30)]],
      mensaje: ['', Validators.max(200)]
  })
  errorData: String="";

  private loadData(){
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  }

  public decodificarjwt(token:String):any{
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
  
  get name(){
    return this.createHiloForm.controls.titulo;
  }

  get message(){
    return this.createHiloForm.controls.mensaje;
  }

  ngOnInit(): void {
    let token = this.userApiService.userToken;
    this.usuarioLogeado = this.decodificarjwt(token);
    console.log(this.usuarioLogeado);
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

  saveHilo(){
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
