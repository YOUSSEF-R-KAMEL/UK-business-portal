import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../Services/toast.service';
import { ToastModule } from 'primeng/toast';
import { FormInputComponent } from '../shared/form-input/form-input.component';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { beginLogin } from '../../Store/actions/user.action';
import { IUserCred } from '../../Store/Models/IUser';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ToastModule, FormInputComponent, ButtonModule, RouterLink, CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private builder = inject(FormBuilder);
  private toast = inject(ToastService);
  private store = inject(Store);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const _userCred: IUserCred = {
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string
      }
      console.log(this.loginForm.value)
      this.store.dispatch(beginLogin({ userCred: _userCred }));
    } else {
      this.toast.showFormError();
      this.loginForm.markAllAsTouched();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
