import { Component } from '@angular/core';

@Component({
  selector: 'app-header-general',
  templateUrl: './header-general.component.html',
  styleUrls: ['./header-general.component.css']
})
export class HeaderGeneralComponent {
     userDropdownOpen = false;

    toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }
}
