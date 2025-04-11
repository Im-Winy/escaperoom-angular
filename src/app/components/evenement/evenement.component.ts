// evenement.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from '../../services/evenement/evenement.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Title } from '@angular/platform-browser';
import { TimeSlot } from '../../models/time-slot/time-slot.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evenement',
  imports: [CommonModule, FormsModule],
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  evenement: any;
  evenementId!: number;
  selectedDate: string = '';
  timeSlots: TimeSlot[] = [];  // Correctement défini comme un tableau de TimeSlot[]
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private reservationService: ReservationService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error("ID invalide");
      return;
    }

    this.evenementId = id;
    this.loadEventDetails(id);
  }

  loadEventDetails(id: number): void {
    this.evenementService.getEvenement(id).subscribe({
      next: (evenement) => {
        this.evenement = evenement;
        this.titleService.setTitle(evenement.nom);
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'événement", err);
        this.isLoading = false;
      }
    });
  }

  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
    if (this.selectedDate) {
      this.loadAvailableTimeSlots();
    } else {
      this.timeSlots = []; // On vide les créneaux si la date est vide
    }
  }
  
  
  loadAvailableTimeSlots(): void {
    if (this.selectedDate) {
      this.reservationService.getAvailableTimeSlotsForEvent(this.evenementId, this.selectedDate)
        .subscribe({
          next: (slots: TimeSlot[]) => {
            this.timeSlots = slots;
            console.log("Créneaux horaires : ", this.timeSlots);
          },
          error: (err) => {
            console.error('Erreur de chargement des créneaux :', err);
          }
        });
    }
  }
  
}
