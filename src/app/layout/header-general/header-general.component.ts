import { Component, OnInit, inject } from '@angular/core';
import { UserApiService } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-header-general',
  templateUrl: './header-general.component.html',
  styleUrls: ['./header-general.component.css']
})
export class HeaderGeneralComponent implements OnInit{
  userLoginOn:boolean=false;   
  userDropdownOpen = false;
  userApiService = inject(UserApiService);

    toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  ngOnInit(): void {
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  }
}
