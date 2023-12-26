import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppLogoComponent } from './app-logo/app-logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppLogoComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'on-repeat-frontend';
}
