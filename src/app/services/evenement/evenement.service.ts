import { Injectable } from '@angular/core';
import { Evenement } from '../../models/evenement/evenement.model';
import { difficulte } from '../../models/evenement/difficulte';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  private evenements: Evenement[] = [
    new Evenement(1, 'Maison hantée', 'Osez franchir les portes de cette demeure hantée où chaque couloir cache un secret terrifiant.', '/maison-hantee.jpg', 50, 4, 40, difficulte.normal),
    new Evenement(2, 'Le Château maudit', 'Affrontez les mystères et les malédictions d’un château hanté.', '/chateau-maudit.jpg', 60, 5, 50, difficulte.difficile),
    new Evenement(3, 'Forêt Enchantée', 'Une aventure féerique au cœur d’une forêt remplie de magie et de créatures mystérieuses.', '/foret-enchantee.jpg', 45, 3, 35, difficulte.intermédiaire),
    new Evenement(4, "Le Casino", 'Plongez dans une ambiance palpitante où chance et stratégie se rencontrent.', '/casino.jpg', 45, 3, 35, difficulte.intermédiaire)
  ];

  constructor() { }

  getEvenements(): Observable<Evenement[]> {
    return of(this.evenements);
  }

  getEvenement(id: number): Observable<Evenement | undefined> {
    const evenement = this.evenements.find(e => e.idEvenement === id);
    return of(evenement);
  }
}
