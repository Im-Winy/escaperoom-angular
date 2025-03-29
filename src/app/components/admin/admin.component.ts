import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../services/notification/notification.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users: User[] = [];
  public refreshing: boolean = false;
  private subscriptions: Subscription[] = [];
  declare public selectedUser: User | null;
  roles: string[] = ['ROLE_USER', 'ROLE_HR', 'ROLE_MANAGER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']; // Liste des rôles disponibles
  userForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getUsers(true);
    this.userForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }


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

  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Une erreur est survenue. Veuillez réessayer.');
    }
  }

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

  public onSelectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    this.userForm?.patchValue(selectedUser);
  }

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
}
