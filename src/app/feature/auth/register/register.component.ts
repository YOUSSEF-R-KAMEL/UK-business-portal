import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { FormInputComponent } from '../../../shared/form-input/form-input.component';
import { IUser } from '../../../Store/Models/IUser';
import { beginRegister, duplicateUser } from '../../../Store/actions/user.action';
import { isDuplicateUser } from '../../../Store/selectors/user.selectors';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
  CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    PasswordModule,
    CardModule,
    FormInputComponent,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private store = inject(Store);

  roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' }
  ];

  genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  // Custom validator for password matching
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else if (confirmPassword && confirmPassword.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
    return null;
  };

  registerForm = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
    role: ['user', Validators.required],
    gender: ['male', Validators.required],
    status: [true],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });


  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get role() {
    return this.registerForm.get('role');
  }

  get gender() {
    return this.registerForm.get('gender');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser: IUser = this.registerForm.value as IUser;
      this.store.dispatch(beginRegister({userData: newUser}))
      // Reset form with initial values
      this.registerForm.reset();

      // ➕ Clear validation status
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsPristine();
        this.registerForm.get(key)?.markAsUntouched();
        this.registerForm.get(key)?.updateValueAndValidity();
      });

      // Force UI update
      this.cdr.detectChanges();
    } else {
      this.registerForm.markAllAsTouched();
      this.cdr.detectChanges();
    }
  }

  duplicatedUser(){
    console.log("sssssssssss")
    const email = this.registerForm.value.email as string
    if(email != ''){
      this.store.dispatch(duplicateUser({email: email}))
      this.store.select(isDuplicateUser).subscribe(item => {
        if(item){
          this.registerForm.controls['email'].reset()
        }
      })
    }
  }

}
