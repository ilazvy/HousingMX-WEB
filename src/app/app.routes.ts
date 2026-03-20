import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { PropiedadesComponent } from './views/propiedades/propiedades';
import { ContactoComponent } from './views/contacto/contacto';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'propiedades', component: PropiedadesComponent },
  { path: 'contacto', component: ContactoComponent },
  // Aquí luego pondremos { path: 'propiedad/:id', component: DetailComponent }
];
