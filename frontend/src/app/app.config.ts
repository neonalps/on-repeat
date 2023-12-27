import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { authReducer } from './auth/store/auth.reducer';
import { uiStateReducer } from './ui-state/store/ui-state.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideStore({
      auth: authReducer,
      ui: uiStateReducer,
    }),
  ],
};
