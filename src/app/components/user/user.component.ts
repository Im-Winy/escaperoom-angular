import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user.model';
import { Title } from '@angular/platform-browser';
import { Reservation } from '../../models/reservation/reservation.model';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Paiement, PaiementService } from '../../services/paiement/paiement.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user!: User;
  paiement!: Paiement;
  formUpdate!: FormGroup;
  errorMessage = '';
  successMessage = '';

  reservations: Reservation[] = [];
  groupedReservations: Reservation[][] = [];
  userId!: number;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private userService: UserService,
    private reservationService: ReservationService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Profil');

    this.formUpdate = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]]
    });

    this.getUser(); // ✅ Pas de groupReservations ici
  }

  getUser(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    console.log('Utilisateur récupéré du cache:', this.user);

    if (this.user) {
      this.userId = this.user.idUser;
      this.patchForm();
      this.loadReservations();
    } else {
      console.warn('Aucun utilisateur trouvé dans le cache local');
    }
  }

  loadReservations(): void {
    console.log('Chargement des réservations pour userId:', this.userId);
    this.reservationService.getReservationsByUserId(this.userId).subscribe({
      next: (data) => {
        console.log('Données des réservations :', data);
        this.reservations = data;
        this.groupReservations(); // ✅ regroupement après chargement
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réservations :', err);
      }
    });
  }

  groupReservations(): void {
    this.groupedReservations = [];
    for (let i = 0; i < this.reservations.length; i += 2) {
      this.groupedReservations.push(this.reservations.slice(i, i + 2));
    }
  }

  patchForm(): void {
    this.formUpdate.patchValue({
      prenom: this.user.prenom,
      nom: this.user.nom,
      username: this.user.username,
      email: this.user.email,
      password: this.user.password
    });
  }

  updateUser(): void {
    if (this.formUpdate.invalid || !this.user.idUser) {
      console.warn("Formulaire invalide ou utilisateur non sélectionné.");
      return;
    }

    const formData = new FormData();
    formData.append('prenom', this.formUpdate.value.prenom);
    formData.append('nom', this.formUpdate.value.nom);
    formData.append('username', this.formUpdate.value.username);
    formData.append('email', this.formUpdate.value.email);
    formData.append('password', this.formUpdate.value.password);

    this.userService.updateMyProfile(formData, this.user.idUser).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.successMessage = 'Utilisateur mis à jour avec succès.';
        this.errorMessage = '';
        this.formUpdate.reset();
        this.patchForm();
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la mise à jour de l\'utilisateur.';
        this.successMessage = '';
        console.error(error);
      }
    });
  }
}
