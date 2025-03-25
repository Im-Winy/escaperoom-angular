import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NotificationService } from '../../services/notification/notification.service';
import { User } from '../../models/user/user.model';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit, OnDestroy{

  public showLoading:boolean = false;
  private subscriptions : Subscription[] =[];

    constructor(
      private router:Router,
      private authenticationService : AuthenticationService,
      private notificationService: NotificationService
    ){}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    }

  }

  public onRegister(user:User):void{
    this.showLoading = true;

    this.subscriptions.push(
      this.authenticationService.register(user).subscribe({

        next:
        (data:User) =>{
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS,
            `A new account was created for ${data.prenom}.`);

        },
        error:
        (errorResponse: HttpErrorResponse) =>{
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;

        }
  })
    );

  }
  sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);

    } else {
      this.notificationService.notify(notificationType, "AN ERROR OCCURED. PLEASE TRY AGAIN");
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      sub => sub.unsubscribe()
    );
  }

}
