import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {environment} from "../../environments/environment";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})

export interface Flashcard{
  concepto: string,
  respuesta: string
}

export interface SaveFlashcardRequest{
  concepto: string,
  respuesta: string,
  id: number
}

export class FlashcardApiService {

  httpClient = inject(HttpClient);

  getListFlashCard(){
    return lastValueFrom(this.httpClient.get<Flashcard[]>(environment.urlHost+'/flashcard/listar/'))
  }

  crearFlashCard(flashcard : SaveFlashcardRequest):Observable<any>{
    return this.httpClient.post<any>(environment.urlHost+'/flashcard/', flashcard);
  }
}
