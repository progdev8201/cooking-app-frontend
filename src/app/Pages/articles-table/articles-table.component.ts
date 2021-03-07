import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AllArticleOccurencesDialogComponent } from 'src/app/components/all-article-occurences-dialog/all-article-occurences-dialog.component';
import { ArticleCreateFormComponent } from 'src/app/components/article-create-form/article-create-form.component';
import { ArticleDTO } from 'src/app/models/article-dto';
import { ArticleService } from 'src/app/services/article.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.css']
})
export class ArticlesTableComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'price', 'edit','delete'];
  dataSource: MatTableDataSource<ArticleDTO>;
  articles: ArticleDTO[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private articleService: ArticleService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initArticles();
  }

  //ALL ABOUT THE DIALOG
 
  openDialog(article:ArticleDTO): void {
    const dialogRef = this.dialog.open(ArticleCreateFormComponent, {
      width: '450px',
      data: article
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'refresh') 
        this.initArticles();
    });
  }

  openFindAllOccurencesDialog(article:ArticleDTO): void{
    this.articleService.findAllOccurences(article.id).subscribe(occurences =>{
      if (occurences.length > 0) {
        // logique to open dialog by passing occurences
        const dialogRef = this.dialog.open(AllArticleOccurencesDialogComponent,{
          data : occurences
        });

      }else {
        // simply delete object
        this.deleteArticle(article.id);
      }
    })
  }
  
  changeCurrentArticle(article:ArticleDTO){
    this.openDialog(article);
  }

  //SERVICES

  initArticles() {
    this.articleService.findAll().subscribe(articles => { 
      this.articles = articles;
      
      this.initTable();
    });
  }

  getImage(image:string):string{
    return image == environment.baseImage ? environment.baseImage : `${environment.imageUrl}/download/${image}`;
  }
  
  //ALL ABOUT THE TABLES

  initTable(){
    this.dataSource = new MatTableDataSource(this.articles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteArticle(articleId: string){
    this.articleService.delete(articleId).subscribe(() =>{
      this.initArticles();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
