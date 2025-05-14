import { Component } from '@angular/core';
import { PaiementService, PaymentRequest } from '../../services/paiement/paiement.service';
import { Paiement } from '../../models/paiement/paiement';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-paiement',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent {

  reservationId: number = 0;
  paymentRequest: PaymentRequest = {
    montant: 0,
    numeroCarteBancaire: '',
    dateExppiration: '',
    cvv: ''
  };
  paiement?: Paiement;

  constructor(private paiementService: PaiementService) { }

  onSubmit(): void {
    this.paiementService.processPayment(this.reservationId, this.paymentRequest).subscribe({
      next: (data) => {
        this.paiement = data;
        alert('✅ Paiement effectué avec succès.');
      },
      error: (err) => {
        console.error(err);
        alert('❌ Échec du paiement : ' + (err.error?.message || 'Erreur inconnue'));
      }
    });
  }
}
