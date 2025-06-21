import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitch } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextarea,
    ReactiveFormsModule,
    DropdownModule,
    InputSwitch,
    PasswordModule,
    CalendarModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() id!: string;
  @Input() label!: string;
  @Input() type: 'text' | 'email' | 'tel' | 'textarea' | 'dropdown' | 'switch' | 'password' | 'date' =
    'text';
  @Input() placeholder: string = '';
  @Input() formControlName: string = '';
  @Input() required: boolean = false;
  @Input() rows: number = 3;
  @Input() options: any[] = [];
  @Input() patternError: string = '';
  @Input() errors: any = null;
  @Input() touched: boolean = false;
  @Input() dirty: boolean = false;
  @Output() blur = new EventEmitter<void>();

  private _value: any = '';
  private _isWritingValue = false;
  disabled: boolean = false;

  // ControlValueAccessor implementation
  onChange = (value: any) => {};
  onTouched = () => {};

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    // Only call onChange if we're not in the middle of writing a value programmatically
    if (!this._isWritingValue) {
      this.onChange(val);
    }
  }

  get isInvalid(): boolean {
    return this.errors && Object.keys(this.errors).length > 0;
  }

  get isValid(): boolean {
    return !this.isInvalid && (this.touched || this.dirty);
  }

  onValueChange(value: any): void {
    this._value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
    this.blur.emit();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this._isWritingValue = true;
    this._value = value;
    this._isWritingValue = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
