import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user.model';

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user!: User;
  formUpdate!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {

    this.formUpdate = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.getUser();
  }

  getUser(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    if (this.user) {
      this.patchForm();
    }
  }

  patchForm(): void {
    this.formUpdate.patchValue({
      prenom: this.user.prenom,
      nom: this.user.nom,
      username: this.user.username,
      email: this.user.email
    });
  }

  updateUser() {
    if (this.formUpdate.invalid || !this.user.idUser) {
      console.warn("Formulaire invalide ou utilisateur non sélectionné.");
      return;
    }
    const formData = new FormData();
    formData.append('prenom', this.formUpdate.value.prenom);
    formData.append('nom', this.formUpdate.value.nom);
    formData.append('username', this.formUpdate.value.username);
    formData.append('email', this.formUpdate.value.email);

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
