import { Component, DestroyRef, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMenuVisible } from '@src/app/ui-state/store/ui-state.selectors';
import { AppState } from '@src/app/store.index';
import { toggleMenu } from '@src/app/ui-state/store/ui-state.actions';
import { AppLogoComponent } from '@src/app/app-logo/app-logo.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { selectAuthUser } from '@src/app/auth/store/auth.selectors';
import { AuthUser } from '@src/app/models';
import { logout } from '@src/app/auth/store/auth.actions';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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

  destroyRef = inject(DestroyRef);
  menuVisible$ = this.store.select(selectMenuVisible);
  user: AuthUser | null = null;

  constructor(private readonly router: Router, private readonly store: Store<AppState>) {
    this.store.select(selectAuthUser)
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.user = value;
      });
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.store.dispatch(logout());
    this.toggle();
    this.goToHome();
  }

  toggle() {
    this.store.dispatch(toggleMenu());
  }

}
