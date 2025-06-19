import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { associateReducer } from './Store/reducers/associate.reducer';
import { AssociateEffects } from './Store/effects/associate.effects';
import { AppEffects } from './Store/effects/App.effects';
import { UserReducer } from './Store/reducers/user.reducer';
import { UserEffects } from './Store/effects/user.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    MessageService,
    providePrimeNG({
      theme: {
        preset: {
          ...Lara,
          semantic: {
            ...Lara.semantic,
            primary: {
              50: '{blue.50}',
              100: '{blue.100}',
              200: '{blue.200}',
              300: '{blue.300}',
              400: '{blue.400}',
              500: '{blue.500}',
              600: '{blue.600}',
              700: '{blue.700}',
              800: '{blue.800}',
              900: '{blue.900}',
              950: '{blue.950}'
            }
          }
        },
        options: {
          prefix: 'p'
        }
      }
    }),
    provideStore({
      associate: associateReducer,
      user: UserReducer
    }),
    provideEffects([AssociateEffects, AppEffects, UserEffects]),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
