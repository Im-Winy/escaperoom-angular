import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TimeSlot } from '../../models/time-slot/time-slot.model';
import { ReservationService } from '../../services/reservation/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { EvenementService } from '../../services/evenement/evenement.service';
import { User } from '../../models/user/user.model';
import { Evenement } from '../../models/evenement/evenement.model';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit {

  constructor(
    private titleService: Title,
    private reservationService: ReservationService,
    private userService: UserService,
    private evenementService: EvenementService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Réservation');
  }

}
