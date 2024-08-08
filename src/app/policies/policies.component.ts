import { Component } from '@angular/core';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import {RouterModule } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [SideMenuComponent, RouterModule, FooterComponent],
  templateUrl: './policies.component.html',
})
export class PoliciesComponent {

}
