import {Component, inject, OnInit} from '@angular/core';
import {Flashcard, FlashcardApiService} from "../../../api/flashcard-api/flashcard-api.service";
import {Mazo, MazoApiService} from "../../../api/mazo-api/mazo-api.service";
import {ActivatedRoute} from "@angular/router";
import {UserApiService} from "../../../api/user-api/user-api.service";

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit{

  //Identificador para saber si esta logeado
  userLoginOn : boolean = false;

  //MazoEncontrado
  idd: number = 0;

  //Listas
  flashcards : Flashcard[] = [];
  mazos: Mazo[] = [];

  //Inyecciones
  flashcardApiService = inject(FlashcardApiService);
  mazoApiService = inject(MazoApiService);
  activatedRoute = inject(ActivatedRoute);
  userApiService = inject(UserApiService);

  async ngOnInit() {
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
    this.activatedRoute.params.subscribe(prm => {
      console.log(`El id es: ${prm['id']}`);
      this.idd = +this.activatedRoute.snapshot.params['id'];
    });
    await this.loadData();
  }

  private async loadData(){
    this.mazos = await this.mazoApiService.getListMazos();
    this.flashcards = await this.flashcardApiService.getListFlashCard();
  }

  //Variables para las flashcards
  mostrarRespuesta = false;
  puntaje : number = 0;
  i = 0;
  message : string = '';


  filterFlashCards(): Flashcard[]{
    return this.flashcards.filter(flashcaard => flashcaard.idMazo == this.idd);
  }

  showAnswer() {
    this.mostrarRespuesta = true;
  }

  sumarPunto() {
    this.i++;
    this.puntaje++;
    this.mostrarRespuesta = false;
    if(this.i == this.flashcards.length){
      this.message = "Gracias por usar este mazo. Tu puntaje ha sido de "+this.puntaje;
    }
  }

  restarPunto() {
    this.i++;
    this.puntaje--;
    this.mostrarRespuesta = false;
    if(this.i == this.flashcards.length){
      this.message = "Gracias por usar este mazo. Tu puntaje ha sido de "+this.puntaje;
    }
  }

  tieneAcceso(): boolean {
    return this.userLoginOn;
  }

}
