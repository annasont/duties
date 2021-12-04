import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'duties';

  items!: MenuItem[];

  activeItem!: MenuItem;

  ngOnInit() {
      this.items = [
          {label: 'My plan', icon: 'pi pi-fw pi-calendar', routerLink: '/my-plan'},
          {label: 'Manage duties', icon: 'pi pi-fw pi-pencil', routerLink: '/manage-duties'},
      ];
  }
}


