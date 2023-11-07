import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'LearnSync';
}
