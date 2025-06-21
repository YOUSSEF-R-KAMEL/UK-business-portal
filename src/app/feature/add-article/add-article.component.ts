import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { IArticle } from '../../Store/Models/IArticle';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-add-article',
  imports: [
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    FormInputComponent,
  ],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss',
})
export class AddArticleComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private store = inject(Store);

  articleForm!: FormGroup;
  isEditMode: boolean = false;
  editingArticle: IArticle | null = null;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.articleForm = this.fb.group({
      source: this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
      }),
      author: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      urlToImage: ['', Validators.required],
      publishedAt: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.articleForm.valid) {
      if (this.isEditMode && this.editingArticle) {
        // const updatedData = { ...this.articleForm.value, id: this.editingArticle.id };
        // this.store.dispatch(editArticle({ inputData: updatedData, id: this.editingArticle.id }));
        // this.store.dispatch(showAlert({ message: 'Article updated successfully!', resultType: 'success' }));
      } else {
        // this.store.dispatch(addArticle({ inputData: this.articleForm.value }));
        // this.store.dispatch(showAlert({ message: 'Article added successfully!', resultType: 'success' }));
      }
      this.closeDialog();
    } else {
      // this.store.dispatch(showAlert({ message: 'Please fill all required fields correctly.', resultType: 'error' }));
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.articleForm.controls).forEach((key) => {
      const control = this.articleForm.get(key);
      control?.markAsTouched();
    });
  }

  showDialog() {
    this.isEditMode = false;
    this.editingArticle = null;
    this.visible = true;
    this.initForm();
  }

  showEditDialog(article: IArticle) {
    this.isEditMode = true;
    this.editingArticle = article;
    this.visible = true;
    this.loadArticleData(article);
  }

  loadArticleData(article: IArticle) {
    this.articleForm.patchValue(article);
  }

  closeDialog() {
    this.visible = false;
    this.isEditMode = false;
    this.editingArticle = null;
    this.resetForm();
  }

  resetForm() {
    this.articleForm.reset();
  }

  get source(): FormGroup {
    return this.articleForm.get('source') as FormGroup;
  }
  get author(): FormControl {
    return this.articleForm.get('author') as FormControl;
  }
  get title(): FormControl {
    return this.articleForm.get('title') as FormControl;
  }
  get description(): FormControl {
    return this.articleForm.get('description') as FormControl;
  }
  get url(): FormControl {
    return this.articleForm.get('url') as FormControl;
  }
  get urlToImage(): FormControl {
    return this.articleForm.get('urlToImage') as FormControl;
  }
  get publishedAt(): FormControl {
    return this.articleForm.get('publishedAt') as FormControl;
  }
  get content(): FormControl {
    return this.articleForm.get('content') as FormControl;
  }

}
