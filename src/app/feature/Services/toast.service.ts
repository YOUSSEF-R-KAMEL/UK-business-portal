import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messageService = inject(MessageService);

  showSuccess(message: string, title: string = 'Success') {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: message,
      life: 3000
    });
  }

  showError(message: string, title: string = 'Error') {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: message,
      life: 5000
    });
  }

  showInfo(message: string, title: string = 'Info') {
    this.messageService.add({
      severity: 'info',
      summary: title,
      detail: message,
      life: 3000
    });
  }

  showWarning(message: string, title: string = 'Warning') {
    this.messageService.add({
      severity: 'warn',
      summary: title,
      detail: message,
      life: 4000
    });
  }

  // Specific toast methods for common operations
  showAssociateAdded() {
    this.showSuccess('Associate added successfully!', 'Associate Added');
  }

  showAssociateUpdated() {
    this.showSuccess('Associate updated successfully!', 'Associate Updated');
  }

  showAssociateDeleted() {
    this.showSuccess('Associate deleted successfully!', 'Associate Deleted');
  }

  showAssociateLoadError() {
    this.showError('Failed to load associates. Please try again.', 'Load Error');
  }

  showFormError() {
    this.showError('Please fill all required fields correctly.', 'Form Error');
  }

  showNetworkError() {
    this.showError('Network error. Please check your connection.', 'Network Error');
  }
}
