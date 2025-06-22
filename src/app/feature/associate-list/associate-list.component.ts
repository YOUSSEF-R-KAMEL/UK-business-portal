import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { ConfirmationService } from 'primeng/api';
import { IAssociate } from '../../Store/Models/IAssociate';
import { getAssociateList, getErrorMsg } from '../../Store/selectors/associate.selectors';
import { loadAssociate, deleteAssociate } from '../../Store/actions/associate.actions';
import { showAlert } from '../../Store/actions/App.actions';
import { AssociateDialogComponent } from '../associate-dialog/associate-dialog.component';

@Component({
  selector: 'app-associate-list',
  imports: [
    FormsModule,
    ButtonModule,
    AssociateDialogComponent,
    TableModule,
    PaginatorModule,
    InputTextModule,
    DropdownModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    MessageModule
  ],
  providers: [ConfirmationService],
  templateUrl: './associate-list.component.html',
  styleUrl: './associate-list.component.scss'
})
export class AssociateListComponent implements OnInit {
  @ViewChild(AssociateDialogComponent) AssociateDialogComponent!: AssociateDialogComponent;

  private store = inject(Store);
  private confirmationService = inject(ConfirmationService);

  associateList$: Observable<IAssociate[]> = this.store.select(getAssociateList);
  filteredAssociates: IAssociate[] = [];
  currentAssociates: IAssociate[] = [];
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  globalFilter: string = '';
  statusOptions = [
    { label: 'All', value: null },
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];
  selectedStatus: boolean | null = null;
  errorMsg = '';
  showDialog() {
    this.AssociateDialogComponent.showDialog();
  }

  ngOnInit(): void {
    this.store.dispatch(loadAssociate());
    this.store.select(getErrorMsg).subscribe(res => {
      this.errorMsg = res
    })
    this.associateList$.subscribe(associates => {
      this.currentAssociates = associates;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = [...this.currentAssociates];

    if (this.globalFilter.trim()) {
      const searchTerm = this.globalFilter.toLowerCase();
      filtered = filtered.filter(associate =>
        associate.name.toLowerCase().includes(searchTerm) ||
        associate.email.toLowerCase().includes(searchTerm) ||
        associate.phone.toLowerCase().includes(searchTerm) ||
        this.getTypeLabel(associate.type).toLowerCase().includes(searchTerm) ||
        this.getGroupLabel(associate.associateGroup).toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (this.selectedStatus !== null) {
      filtered = filtered.filter(associate => associate.status === this.selectedStatus);
    }

    this.filteredAssociates = filtered;
    this.totalRecords = this.filteredAssociates.length;
    this.first = 0;
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  getStatusSeverity(status: boolean): string {
    return status ? 'success' : 'danger';
  }

  getStatusLabel(status: boolean): string {
    return status ? 'Active' : 'Inactive';
  }

  getTypeLabel(type: string): string {
    const typeMap: { [key: string]: string } = {
      'full-time': 'Full Time',
      'part-time': 'Part Time',
      'contract': 'Contract',
      'intern': 'Intern'
    };
    return typeMap[type] || type;
  }

  getGroupLabel(group: string): string {
    const groupMap: { [key: string]: string } = {
      'the-washington-post': 'The Washington Post',
      'fortune': 'Fortune',
      'thestreet': 'TheStreet',
      'wired': 'Wired',
      'toms-guide': "Tom's Guide",
      'hollywood-reporter': 'Hollywood Reporter',
      'ambcrypto': 'AMBCrypto',
      'financial-times': 'Financial Times',
      'zdnet': 'ZDNet',
      'motley-fool': 'Motley Fool',
      'ksl-com': 'KSL.com',
      'bloomberg': 'Bloomberg',
      'stat': 'STAT',
      'new-york-post': 'New York Post',
      'cnn': 'CNN',
      'bbc-news': 'BBC News',
      'the-guardian': 'The Guardian'
    };
    return groupMap[group] || group;
  }


  editAssociate(associate: IAssociate) {
    this.AssociateDialogComponent.showEditDialog(associate);
  }

  deleteAssociate(associate: IAssociate) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${associate.name}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteAssociate({ id: associate.id }));
        this.store.dispatch(showAlert({ message: 'Associate deleted successfully!', resultType: 'success' }));
      },
      reject: () => {
        this.store.dispatch(showAlert({ message: 'Delete operation cancelled.', resultType: 'info' }));
      }
    });
  }
}
