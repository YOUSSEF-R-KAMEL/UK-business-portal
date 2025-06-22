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
import { IUser } from '../../Store/Models/IUser';
import { getUserList } from '../../Store/selectors/user.selectors';
import { getErrorMsg } from '../../Store/selectors/article.selectors';
import { loadUser } from '../../Store/actions/user.action';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    DropdownModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    MessageModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private store = inject(Store);

  UserList$: Observable<IUser[]> = this.store.select(getUserList);
  filteredUsers: IUser[] = [];
  currentUsers: IUser[] = [];
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  globalFilter: string = '';
  errorMsg = '';

  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.store.select(getErrorMsg).subscribe(res => {
      this.errorMsg = res

    })
    this.UserList$.subscribe(Users => {
      this.currentUsers = Users;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = [...this.currentUsers];

    if (this.globalFilter.trim()) {
      const searchTerm = this.globalFilter.toLowerCase();
      filtered = filtered.filter(User =>
        User.email.toLowerCase().includes(searchTerm) ||
        User.name.toLowerCase().includes(searchTerm) ||
        User.phone.toLowerCase().includes(searchTerm)
      );
    }
    this.filteredUsers = filtered;
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

}
