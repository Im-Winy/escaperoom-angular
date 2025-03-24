import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EvenementComponent } from './components/evenement/evenement.component';
import { TousLesEvenementsComponent } from './components/tous-les-evenements/tous-les-evenements.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },  // Route pour la page "Accueil"
    { path: 'about', component: AboutComponent },  // Route pour la page "À propos"
    { path: 'contact', component: ContactComponent },  // Route pour la page "Contact"
    { path: 'login', component: LoginComponent },  // Route pour la page "Connexion"
    { path: 'register', component: RegisterComponent },  // Route pour la page "Inscription"
    { path: 'evenement/:id', component: EvenementComponent }, // Route pour la page "Evenement"
    { path: 'tous-les-evenements', component: TousLesEvenementsComponent },  // Route pour la page "tous les Evenements"
];
