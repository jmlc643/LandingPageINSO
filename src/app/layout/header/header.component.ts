import { Component, OnInit} from '@angular/core';
import { AuthenticationUserResponse} from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  async ngOnInit() {
      
  }

}
