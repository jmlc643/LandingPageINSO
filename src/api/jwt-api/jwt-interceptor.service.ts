import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiService } from '../user-api/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  userApiService = inject(UserApiService)
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:String = this.userApiService.userToken;

    if(token!=""){
      req=req.clone(
        {
          setHeaders: {
            'Content-Type' : 'application/json;charset=utf-8',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer '+token,
          },
        }
      )
    }
    return next.handle(req);
  }
}
