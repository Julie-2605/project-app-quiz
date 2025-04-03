import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimisation de la détection des changements dans Angular grâce à Zone.js.
    provideZoneChangeDetection({ eventCoalescing: true }), 
    // Configuration des routes de l'application.
    provideRouter(routes), 
    // Activation du client HTTP pour les requêtes API.
    provideHttpClient()
  ]
};
