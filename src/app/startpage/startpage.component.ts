import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { i18n } from 'src/i18n';
import { UserService } from '../user.service';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartpageComponent {
  formUser = new FormGroup({
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordRepeat: new FormControl(null, [Validators.required])
  })
  formSignIn = new FormGroup({
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),

  })
  auth: boolean = false;
  usersKey = 'users';
  isRegistration: boolean = false;
  destroy$ = new Subject<void>()
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) { }

  signIn(): void {
    const inputUser = this.formSignIn.value;
    this.userService.signIn(inputUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth: boolean) => {
        if (auth) {
          this.userService.fnSetLogin(inputUser.login);
          this.router.navigateByUrl('task');
          this.auth = auth
        } else this.snackBar.open(i18n.USER_NOT_EXIST);
      })
  }
  addUser(): void {
    const newUser = this.formUser.value;

    this.userService.createUser(newUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (msg) => {
          this.snackBar.open(msg);
          //выходим с регистрации
          this.isRegistration = !this.isRegistration;
          this.formUser.reset();
        },
        error: (err) =>  {
          this.snackBar.open(err)
        }
      })
  }
  toggleRegistration() {
    this.isRegistration = !this.isRegistration
  }

  ngOnDestroy(): void {
    this.destroy$.next()
  }
}
