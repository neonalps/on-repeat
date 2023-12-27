import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMenuVisible } from '@src/app/ui-state/store/ui-state.selectors';
import { AppState } from '@src/app/store.index';
import { toggleMenu } from '@src/app/ui-state/store/ui-state.actions';
import { AppLogoComponent } from '@src/app/app-logo/app-logo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    AppLogoComponent,
    CommonModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  menuVisible$ = this.store.select(selectMenuVisible);

  constructor(private readonly store: Store<AppState>) {}

  toggle() {
    this.store.dispatch(toggleMenu());
  }

}
