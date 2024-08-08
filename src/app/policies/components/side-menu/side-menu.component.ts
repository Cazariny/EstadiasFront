import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'policies-side-menu',
  standalone: true,
  imports: [CommonModule ,RouterModule,],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems = routes
  .map( route => route.children ?? [] )
  .flat()
  .filter(route => route && route.path)
  .filter(route => !route.path?.includes(':'))
  .filter(route => !route.path?.includes('**'))

}
