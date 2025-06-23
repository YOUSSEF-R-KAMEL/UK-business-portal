import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { FormInputComponent } from '../../../shared/form-input/form-input.component';
import { ToastService } from '../../Services/toast.service';
import { IUserCred } from '../../../Store/Models/IUser';
import { beginLogin } from '../../../Store/actions/auth.action';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ToastModule,
    FormInputComponent,
    ButtonModule,
    RouterLink,
    CardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private builder = inject(FormBuilder);
  private toast = inject(ToastService);
  private store = inject(Store);

  loginForm!: FormGroup;

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const _userCred: IUserCred = {
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string,
      };
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
