import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reservation',
  imports: [],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Réservation');
  }
}
