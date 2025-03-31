import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../services/notification/notification.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Evenement } from '../../models/evenement/evenement.model';
import { EvenementService } from '../../services/evenement/evenement.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // -------------------------
  // Déclaration des variables
  // -------------------------
  public users: User[] = [];
  public evenements: Evenement[] = [];
  public refreshing: boolean = false;
  private subscriptions: Subscription[] = [];
  declare public selectedUser: User | null;
  declare public selectedEvenement: Evenement | null;
  roles: string[] = ['ROLE_USER', 'ROLE_HR', 'ROLE_MANAGER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']; // Liste des rôles disponibles
  userForm!: FormGroup;
  evenementForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  // ------------------
  // Appel des services
  // ------------------
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private evenementService: EvenementService
  ) { }

  // ------------------------
  // Méthode d'initialisation
  // ------------------------
  ngOnInit(): void {
    this.getUsers(true); //Charge les utilisateurs dès le démarrage du composant
    this.userForm = this.fb.group({ //Charge 
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

    this.getEvenements(); //Charge les évènements dès le démarrage du composant
    this.evenementForm = this.fb.group({ //Charge
      nom: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      nbeJoueurMax: ['', [Validators.required]],
      duree: ['', [Validators.required]],
      difficulte: ['', Validators.required],
      prix: ['', Validators.required]
    });
  }

  // -----------------------------
  // Récupération des utilisateurs
  // -----------------------------
  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe({
        next:
          (response: User[]) => {
            this.userService.addUsersToLocalCache(response);
            this.users = response;
            this.refreshing = false;
            if (showNotification) {
              this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
            }
          },
        error:
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.refreshing = false;
          }
      }));
  }

  // -------------------------
  // Envoie d'une notification
  // -------------------------
  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Une erreur est survenue. Veuillez réessayer.');
    }
  }

  // ----------------------------
  // Mise à jour d'un utilisateur
  // ----------------------------
  updateUser(): void {
    if (this.userForm.invalid || !this.selectedUser?.id) {
      console.warn("Formulaire invalide ou utilisateur non sélectionné.");
      return;
    }
    const formData = new FormData();
    formData.append('prenom', this.userForm.value.prenom);
    formData.append('nom', this.userForm.value.nom);
    formData.append('username', this.userForm.value.username);
    formData.append('email', this.userForm.value.email);
    formData.append('role', this.userForm.value.role);
    console.log('Données envoyées :', Array.from(formData.entries()));
    this.userService.updateUser(formData, this.selectedUser.idUser).subscribe({
      next: (updatedUser) => {
        console.log('Utilisateur mis à jour avec succès 🎉');
        this.selectedUser = updatedUser;
        this.userForm.reset();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      }
    });
  }

  // --------------------------
  // Sélection d'un utilisateur
  // --------------------------
  public onSelectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    this.userForm?.patchValue(selectedUser);
  }

  // ----------------------------
  // Suppression d'un utilisateur
  // ----------------------------
  deleteUser(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          console.log('Utilisateur supprimé avec succès', response);
          this.users = this.users.filter(user => user.idUser !== userId);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
      );
    }
  }

  /* .................................................................................................................................. */

  // --------------------------
  // Mise à jour d'un évènement
  // --------------------------
  updateEvenement(): void {
    if (this.evenementForm.invalid || !this.selectedEvenement?.idEvenement) {
      console.warn("Formulaire invalide ou évènement non sélectionné.");
      return;
    }
    const formData = new FormData();
    formData.append('nom', this.evenementForm.value.nom);
    formData.append('description', this.evenementForm.value.description);
    formData.append('image', this.evenementForm.value.image);
    formData.append("duree", this.evenementForm.value.duree);
    formData.append("nbeJoueurMax", this.evenementForm.value.nbeJoueurMax);
    formData.append("prix", this.evenementForm.value.prix);
    formData.append('difficulte', this.evenementForm.value.difficulte);
    console.log('Données envoyées :', Array.from(formData.entries()));
    this.evenementService.updateEvenement(formData, this.selectedEvenement.idEvenement).subscribe({
      next: (updatedEvenement) => {
        console.log('Évènement mis à jour avec succès 🎉');
        this.selectedEvenement = updatedEvenement;
        this.evenementForm.reset();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'évènement :', error);
      }
    });
  }

  // -----------------------------------
  // Récupération de tout les évènements
  // -----------------------------------
  getEvenements() {
    this.refreshing = true;
    this.subscriptions.push(
      this.evenementService.getEvenements().subscribe(evenements => {
        this.evenements = evenements;
      }));
  }

  // ------------------------
  // Sélection d'un évènement
  // ------------------------
  public onSelectEvenement(selectedEvenement: Evenement): void {
    this.selectedEvenement = selectedEvenement;
    this.evenementForm?.patchValue(selectedEvenement);
  }

  // --------------------------
  // Suppression d'un évènement
  // --------------------------
  deleteEvenement(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet évènement ?')) {
      this.evenementService.deleteEvenement(id).subscribe(
        (response) => {
          console.log('Utilisateur supprimé avec succès', response);
          this.evenements = this.evenements.filter(evenement => evenement.idEvenement !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'évènement', error);
        }
      );
    }
  }

}