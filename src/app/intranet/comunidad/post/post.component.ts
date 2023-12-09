import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario, ComentarioApiService, SaveComentarioRequest } from 'src/api/comentario-api/comentario-api.service';
import { Hilo, HiloApiService } from 'src/api/hilo-api/hilo-api.service';
import { JwtInterceptorService } from 'src/api/jwt-api/jwt-interceptor.service';
import { UserApiService, Usuario } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  errorData: String = "";
  activatedRoute = inject(ActivatedRoute);

  //Objeto a ser mapeado
  comentario : SaveComentarioRequest = {
    mensaje: '',
    username: '',
    idHilo : 0
  }

  //Identificador para saber que usuario esta logeado
  usuarioLogeado :any = {};

  //Identificador para saber si esta logeado
  userLoginOn : boolean = false;

  //Listas
  hilos: Hilo[] = [];
  usuarios: Usuario[] = [];
  comentarios: Comentario[] = [];

  //Inyeccion de servicios
  hiloApiService = inject(HiloApiService);
  userApiService = inject(UserApiService);
  comentarioApiService = inject(ComentarioApiService);
  router = inject(Router)
  formBuilder = inject(FormBuilder)

  hiloEncontrado?: Hilo;
  idd: number = 0;

  formError : String = "";

  createComentarioForm = this.formBuilder.group({
      mensaje: ['',[Validators.required, Validators.maxLength(200)]],
  })

  ngOnInit() {
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
    this.activatedRoute.params.subscribe(prm => {
      console.log(`El id es: ${prm['id']}`);
      this.idd = +this.activatedRoute.snapshot.params['id'];
    });
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })

    this.loadData();
  }

  get message(){
    return this.createComentarioForm.controls.mensaje;
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

  private async loadData() {
    try {
      // Obtener hilos y usuarios
      await this.hiloApiService.getListHilos().subscribe({
        next: (hiloData) => {
          this.hilos = hiloData;
          this.encontrarHilo(); // Llama a encontrarHilo después de obtener los comentarios
        },
        error: (errorData) => {
          this.errorData = errorData;
        },
        complete: () => {
          console.info("Data obtenida");
          console.log(this.comentarios);
        }
      });;
      this.usuarios = await this.userApiService.getListUser();

      // Obtener comentarios mediante observables
      this.comentarioApiService.getListComentarios().subscribe({
        next: (comentarioData) => {
          this.comentarios = comentarioData;
          this.encontrarHilo(); // Llama a encontrarHilo después de obtener los comentarios
        },
        error: (errorData) => {
          this.errorData = errorData;
        },
        complete: () => {
          console.info("Data obtenida");
          console.log(this.comentarios);
        }
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  private encontrarHilo() {
    this.hiloEncontrado = this.hilos.find(hilo => hilo.id === this.idd);
  }

  filterComentarios(): Comentario[] {
    return this.comentarios.filter(comentarioo => this.hiloEncontrado?.id === comentarioo.hiloSerializer?.id);
  }

  saveComentario(){
    if(this.createComentarioForm.valid){
      this.formError = "";
      this.comentario.username = this.usuarioLogeado.sub as string;
      this.comentario.idHilo = this.idd as number;
      this.comentarioApiService.crearComentario(this.comentario).subscribe({
        next: (comentarioData) => {
          console.log(comentarioData)
        },
        error : (errorData: any) => {
          console.error(errorData);
          this.formError="Error al crear";
        },
        complete: () => {
          console.info("Creacion completada")
          this.router.navigateByUrl('/intranet/comunidad/'+this.hiloEncontrado?.topico.id+'/post/'+this.hiloEncontrado?.id);
          this.createComentarioForm.reset();
          location.reload();
        }
      });
  }else{
    this.createComentarioForm.markAllAsTouched();
    alert("Error de ingreso de datos")
  }
  }
}
