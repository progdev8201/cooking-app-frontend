import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, NgModuleFactoryLoader, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleDTO } from 'src/app/models/article-dto';
import { RoutineArticleDTO } from 'src/app/models/routine-article-dto';
import { RoutineDTO } from 'src/app/models/routine-dto';
import { ArticleService } from 'src/app/services/article.service';
import { RoutineService } from 'src/app/services/routine.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-routine-article-add',
  templateUrl: './routine-article-add.component.html',
  styleUrls: ['./routine-article-add.component.css']
})
export class RoutineArticleAddComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'quantity', 'price', 'select'];
  articles: ArticleDTO[] = [];
  dataSource = new MatTableDataSource<ArticleDTO>(this.articles);
  selection = new SelectionModel<ArticleDTO>(true, []);
  myQuantities: any = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(public dialogRef: MatDialogRef<RoutineArticleAddComponent>, @Inject(MAT_DIALOG_DATA) public data: RoutineDTO, private articleService: ArticleService, private routineService: RoutineService) { }

  ngOnInit(): void {
    this.initArticles();
  }

  //SERVICES

  initArticles() {
    this.articleService.findAll().subscribe(data => {
      this.articles = this.filterArticles(data);
      this.initTable();
    })
  }

  getImage(image:string):string{
    return image == environment.baseImage ? environment.baseImage : `${environment.imageUrl}/download/${image}`;
  }

  //map articles to only have articles that are not in my routine
  filterArticles(articles: ArticleDTO[]): ArticleDTO[] {
    return articles.filter(article => !this.isInRoutine(article));
  }

  isInRoutine(articleDTO: ArticleDTO): boolean {
    return this.data.routineArticles.some(article => article.article.id === articleDTO.id);
  }


  addAllArticlesToRoutine() {
    //get all articles that has been selected
    const articlesToMap = this.selection.selected;

    if (articlesToMap.length > 0) {

      //map them into routine article + attribute them their quantity
      articlesToMap.forEach(article => {
        const routineArticle: RoutineArticleDTO = {
          id:null,
          article,
          quantity: this.myQuantities[article.id] ? this.myQuantities[article.id] : 0
        }

        this.data.routineArticles.push(routineArticle);
      })
      
      this.updateRoutine(this.data);
    }
  }


  updateRoutine(routine: RoutineDTO) {
    this.routineService.update(routine).subscribe(() => { this.dialogRef.close('refresh') });
  }

  //ALL ABOUT THE TABLE

  initTable() {
    this.dataSource = new MatTableDataSource(this.articles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //SELECT

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ArticleDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }

}