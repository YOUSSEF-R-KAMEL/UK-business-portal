import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { ConfirmationService } from 'primeng/api';
import { ArticleDialogComponent } from '../article-dialog/article-dialog.component';
import { IArticle } from '../../Store/Models/IArticle';
import { getArticleList } from '../../Store/selectors/article.selectors';
import { deleteArticle, loadArticle } from '../../Store/actions/article.action';
import { getErrorMsg } from '../../Store/selectors/associate.selectors';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { WordSlicePipe } from './word-slice.pipe';
import { RippleModule } from 'primeng/ripple';
import { showAlert } from '../../Store/actions/App.actions';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-article-list',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    DropdownModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    MessageModule,
    WordSlicePipe,
    RippleModule,
    ArticleDialogComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit {
  @ViewChild(ArticleDialogComponent) addArticleComponent!: ArticleDialogComponent;

  private store = inject(Store);
  private confirmationService = inject(ConfirmationService);
  _authService = inject(AuthService);
  showAll: boolean = false;
  num: number = 8
  isUser = true
  isLogged: boolean = false;
  articleList$: Observable<IArticle[]> = this.store.select(getArticleList);
  filteredArticles: IArticle[] = [];
  currentArticles: IArticle[] = [];
  globalFilter: string = '';
  errorMsg = '';

  showDialog() {
    this.addArticleComponent.showDialog();
  }

  ngOnInit(): void {
    this.store.dispatch(loadArticle());
    this.store.select(getErrorMsg).subscribe(res => {
      this.errorMsg = res

    })
    this.articleList$.subscribe(articles => {
      this.currentArticles = articles;
      this.applyFilters();
    });
    this._authService.user$.subscribe(loginData => {
      this.isLogged = !!(loginData && loginData.user?.email);
      this.isUser = loginData?.role === 'user';
    });
  }


  applyFilters(): void {
    let filtered = [...this.currentArticles];

    if (this.globalFilter.trim()) {
      const searchTerm = this.globalFilter.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.author.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm)
      );
    }

    this.filteredArticles = filtered;
  }

  editArticle(article: IArticle) {
    this.addArticleComponent.showEditDialog(article);
  }

  deleteArticle(article: IArticle) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${article.title}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteArticle({ id: article.id }));
        this.store.dispatch(showAlert({ message: 'Article deleted successfully!', resultType: 'success' }));
      },
      reject: () => {
        this.store.dispatch(showAlert({ message: 'Delete operation cancelled.', resultType: 'info' }));
      }
    });
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.num = this.showAll ? 100 : 8
  }
}
