import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleDTO } from 'src/app/models/article-dto';
import { RecipeArticleDTO } from 'src/app/models/recipe-article-dto';
import { RecipeDTO } from 'src/app/models/recipe-dto';
import { UnitMeasurement } from 'src/app/models/unit-measurement.enum';
import { ArticleService } from 'src/app/services/article.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-article-add',
  templateUrl: './recipe-article-add.component.html',
  styleUrls: ['./recipe-article-add.component.css']
})
export class RecipeArticleAddComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'quantity', 'measurment', 'select'];
  articles: ArticleDTO[] = [];
  dataSource = new MatTableDataSource<ArticleDTO>(this.articles);
  selection = new SelectionModel<ArticleDTO>(true, []);
  myQuantities: any = {};
  myMeasurment: any = {};
  measurmentValues: string[] = Object.keys(UnitMeasurement);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private articleService: ArticleService, public dialogRef: MatDialogRef<RecipeArticleAddComponent>, @Inject(MAT_DIALOG_DATA) public data: RecipeArticleDTO[]) { }

  ngOnInit(): void {
    this.initArticles();
  }

  //SERVICES

  initArticles() {
    this.initDataIfEmpty();
    this.articleService.findAll().subscribe(data => {
      this.articles = this.filterArticles(data);
      this.initTable();
    })
  }

  getImage(image:string):string{
    return image == environment.baseImage ? environment.baseImage : `${environment.imageUrl}/download/${image}`;
  }

  initDataIfEmpty(){
    if (this.data) 
      return;
  }

   //map articles to only have articles that are not in my recipe
   filterArticles(articles: ArticleDTO[]): ArticleDTO[] {
    const newArticles: ArticleDTO[] = articles.filter(article => !this.isInRecipe(article));

    return newArticles;
  }
 
  isInRecipe(articleDTO: ArticleDTO): boolean {
    return this.data.some(article =>  article.article.id === articleDTO.id);
  }

  addAllArticlesToRecipe() {
    //get all articles that has been selected
    const articlesToMap = this.selection.selected;

    if (articlesToMap.length > 0) {

      //map them into routine article + attribute them their quantity
      articlesToMap.forEach((article) => {
        const recipeArticle: RecipeArticleDTO = {
          id:null,
          article,
          measurement: this.myMeasurment[article.id] ? this.myMeasurment[article.id] : 0,
          amount: this.myQuantities[article.id] ? this.myQuantities[article.id] : 0
        }

        this.data.push(recipeArticle);
      })
      
      this.dialogRef.close("refresh");
      
    }
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
