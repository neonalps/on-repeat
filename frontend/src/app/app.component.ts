import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppLogoComponent } from '@src/app/app-logo/app-logo.component';
import { Store } from '@ngrx/store';
import { selectMenuVisible } from '@src/app/ui-state/store/ui-state.selectors';
import { AppState } from '@src/app/store.index';
import { toggleMenu } from '@src/app/ui-state/store/ui-state.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppLogoComponent, 
    CommonModule, 
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'on-repeat-frontend';
  menuVisible$ = this.store.select(selectMenuVisible);

  constructor(private readonly store: Store<AppState>) {}

  toggle() {
    this.store.dispatch(toggleMenu());
  }

}
