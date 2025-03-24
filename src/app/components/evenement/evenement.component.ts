import { Component, OnInit } from '@angular/core';
import { Evenement } from '../../models/evenement/evenement.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from '../../services/evenement/evenement.service';

@Component({
  selector: 'app-event',
  imports: [CommonModule],
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.css'
})
export class EvenementComponent implements OnInit {

  evenement: Evenement | undefined;

  constructor(
    private route: ActivatedRoute, // Injecte le service ActivatedRoute pour récupérer les paramètres de l'URL
    private evenementService: EvenementService // Injecte le service qui permet de récupérer les événements
  ) { }

  ngOnInit(): void {// Le composant est initialisé

    // Récupère l'ID depuis les paramètres de l'URL et le convertit en nombre
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Vérifie si l'ID est valide (c'est-à-dire un nombre)
    if (isNaN(id)) {
      console.error("ID invalide"); // Affiche une erreur si l'ID est incorrect
      return; // Stoppe l'exécution pour éviter une requête invalide
    }

    // Appelle le service pour récupérer l'événement correspondant à l'ID
    this.evenementService.getEvenement(id).subscribe({

      // Si la requête réussit, on stocke l'événement dans la variable
      next: (evenement) => this.evenement = evenement,

      // Si la requête échoue, on affiche un message d'erreur dans la console
      error: (err) => console.error("Erreur lors de la récupération de l'événement", err)
    });
  }

}
