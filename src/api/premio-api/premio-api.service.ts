import {inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";

export interface Premio{
  nombre : string,
  descripcion : string,
  precio : number,
  imagen : string
}

export interface SavePremioRequest{
  nombre : string,
  descripcion : string,
  precio : number,
  imagen : string,
  username : string
}

export class PremioApiService {

  httpClient = inject(HttpClient);

  getListPremios(){
    return lastValueFrom(this.httpClient.get<Premio[]>(environment.urlHost+ '/premio/listar/'));
  }

  savePremio(premio : Premio):Observable<any>{
    return this.httpClient.post<any>(environment.urlHost+'/premio/', premio)
  }
}
