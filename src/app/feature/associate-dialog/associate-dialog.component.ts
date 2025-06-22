import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { IAssociate } from '../../Store/Models/IAssociate';
import { Store } from '@ngrx/store';
import { addAssociate, editAssociate } from '../../Store/actions/associate.actions';
import { showAlert } from '../../Store/actions/App.actions';
import { FormInputComponent } from '../../shared/form-input/form-input.component';

@Component({
  selector: 'app-add-associate',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    FormInputComponent,
  ],
  templateUrl: './associate-dialog.component.html',
  styleUrl: './associate-dialog.component.scss',
})
export class AssociateDialogComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private store = inject(Store);

  associateForm!: FormGroup;
  isEditMode: boolean = false;
  editingAssociate: IAssociate | null = null;

  associateTypes = [
    { label: 'Full Time', value: 'full-time' },
    { label: 'Part Time', value: 'part-time' },
    { label: 'Contract', value: 'contract' },
    { label: 'Intern', value: 'intern' },
  ];

  associateGroups = [
    { label: 'The Washington Post', value: 'the-washington-post' },
    { label: 'Fortune', value: 'fortune' },
    { label: 'TheStreet', value: 'thestreet' },
    { label: 'Wired', value: 'wired' },
    { label: "Tom's Guide", value: 'toms-guide' },
    { label: 'Hollywood Reporter', value: 'hollywood-reporter' },
    { label: 'AMBCrypto', value: 'ambcrypto' },
    { label: 'Financial Times', value: 'financial-times' },
    { label: 'ZDNet', value: 'zdnet' },
    { label: 'Motley Fool', value: 'motley-fool' },
    { label: 'KSL.com', value: 'ksl-com' },
    { label: 'Bloomberg', value: 'bloomberg' },
    { label: 'STAT', value: 'stat' },
    { label: 'New York Post', value: 'new-york-post' },
    { label: 'CNN', value: 'cnn' },
    { label: 'BBC News', value: 'bbc-news' },
    { label: 'The Guardian', value: 'the-guardian' }
  ];

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.associateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      type: [''],
      associateGroup: [''],
      status: [true],
    });
  }

  onSubmit() {
    if (this.associateForm.valid) {
      if (this.isEditMode && this.editingAssociate) {
        const updatedData = { ...this.associateForm.value, id: this.editingAssociate.id };
        this.store.dispatch(editAssociate({ inputData: updatedData, id: this.editingAssociate.id }));
        this.store.dispatch(showAlert({ message: 'Associate updated successfully!', resultType: 'success' }));
      } else {
        this.store.dispatch(addAssociate({ inputData: this.associateForm.value }));
        this.store.dispatch(showAlert({ message: 'Associate added successfully!', resultType: 'success' }));
      }
      this.closeDialog();
    } else {
      this.store.dispatch(showAlert({ message: 'Please fill all required fields correctly.', resultType: 'error' }));
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.associateForm.controls).forEach((key) => {
      const control = this.associateForm.get(key);
      control?.markAsTouched();
    });
  }

  showDialog() {
    this.isEditMode = false;
    this.editingAssociate = null;
    this.visible = true;
    this.initForm();
  }

  showEditDialog(associate: IAssociate) {
    this.isEditMode = true;
    this.editingAssociate = associate;
    this.visible = true;
    this.loadAssociateData(associate);
  }

  loadAssociateData(associate: IAssociate) {
    this.associateForm.patchValue({
      name: associate.name,
      email: associate.email,
      phone: associate.phone,
      address: associate.address,
      type: associate.type,
      associateGroup: associate.associateGroup,
      status: associate.status,
    });
  }

  closeDialog() {
    this.visible = false;
    this.isEditMode = false;
    this.editingAssociate = null;
    this.resetForm();
  }

  resetForm() {
    this.associateForm.reset({
      status: true,
    });
  }

  // Getter methods for easy template access
  get name() {
    return this.associateForm.get('name');
  }
  get email() {
    return this.associateForm.get('email');
  }
  get phone() {
    return this.associateForm.get('phone');
  }
  get type() {
    return this.associateForm.get('type');
  }
  get address() {
    return this.associateForm.get('address');
  }
  get associateGroup() {
    return this.associateForm.get('associateGroup');
  }
  get status() {
    return this.associateForm.get('status');
  }

  get dialogTitle() {
    return this.isEditMode ? 'Edit Associate' : 'Add New Associate';
  }

  get submitButtonLabel() {
    return this.isEditMode ? 'Update' : 'Save';
  }
}
