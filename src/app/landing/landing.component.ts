import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeaderComponent,
    FontAwesomeModule,
    FooterComponent,
    RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  faChevronDown= faChevronDown;
  opened:boolean = false;

}
