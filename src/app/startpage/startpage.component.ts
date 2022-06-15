import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ifUser } from 'src/app/shared/interfaces';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { i18n } from 'src/i18n';
import { UserService } from '../user.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {
  oFormAddUsr = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required])
  })
  oFormSignIn = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  // aUser: ifUser[] = [];
  usersKey = 'users';

  bRegistration: boolean = false;
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }
  fnSignIn() {

    let oInputUser = this.oFormSignIn.value;
    //проверяем существование localstore пользователей
    this.userService.fnSignIn(oInputUser).subscribe((bAuth: boolean) => {
      if (bAuth) {
        this.userService.fnSetLogin(oInputUser.login)
        this.router.navigateByUrl('task');
      } else this._snackBar.open(i18n.USER_NOT_EXIST);
    })
  }
  fnAddUsr() {
    let oNewUser = this.oFormAddUsr.value;
    //Проверка пароль и повторный пароль это скорее всего можно запихнуть в валидацию
    if (oNewUser.password !== oNewUser.passwordRepeat) {
      this._snackBar.open(i18n.USER_EXIST_UP_PASS);
      return
    }
    this.userService.createUser(oNewUser).subscribe((e) => {
      let sMsg = e
      this._snackBar.open(sMsg)
      //выходим с регистрации
      this.bRegistration = !this.bRegistration;
      this.oFormAddUsr.reset()
    })


  }

}
