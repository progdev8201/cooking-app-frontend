import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecipeFormComponent } from 'src/app/components/recipe-form/recipe-form.component';
import { RecipeArticleDTO } from 'src/app/models/recipe-article-dto';
import { RecipeDTO } from 'src/app/models/recipe-dto';
import { RecipeService } from 'src/app/services/recipe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'country', 'recipe type', 'details', 'delete'];
  dataSource = new MatTableDataSource<RecipeDTO>([]);
  recipes: RecipeDTO[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private recipeService: RecipeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initRecipes();
  }

  //DIALOG

  openDialog(recipe: RecipeDTO) {
    const dialogRef = this.dialog.open(RecipeFormComponent, {
      width: '800px',
      data: recipe
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'refresh')
        this.initRecipes();
    });
  }

  //SERVICES

  initRecipes() {
    this.recipeService.findAll().subscribe(data => {
      this.recipes = data;
      this.initTable();

    });
  }

  onDeleteRecipe(recipeId: string) {
    this.recipeService.delete(recipeId).subscribe(data => {
      this.recipes = data;
      this.initTable();
    });
  }

  getImage(image:string):string{
    return image == environment.baseImage ? environment.baseImage : `${environment.imageUrl}/download/${image}`;
  }

  //ALL ABOUT THE TABLE

  initTable() {
    this.dataSource = new MatTableDataSource(this.recipes);
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
}
