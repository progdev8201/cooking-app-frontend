import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecipeFormComponent } from 'src/app/components/recipe-form/recipe-form.component';
import { RecipeToCookDialogComponent } from 'src/app/dialogs/recipe-to-cook-dialog/recipe-to-cook-dialog.component';
import { RecipeDTO } from 'src/app/models/recipe-dto';
import { RecipeService } from 'src/app/services/recipe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'country', 'recipe type','cook' ,'details', 'delete'];
  dataSource = new MatTableDataSource<RecipeDTO>([]);
  recipes: RecipeDTO[] = [];
  mobileQuery: MediaQueryList;
  mobileQueryIphone6Plus: MediaQueryList;

  private _mobileQueryListener: () => void;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private recipeService: RecipeService, public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 380px)');
    this.mobileQueryIphone6Plus = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mobileQueryIphone6Plus.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.initRecipes();
  }

  //DIALOG

  openDialog(recipe: RecipeDTO) {
    const dialogRef = this.dialog.open(RecipeFormComponent, {
      width: this.mobileQueryIphone6Plus.matches ? '100%' : '45%',
      maxWidth: '100%',
      data: recipe
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'refresh')
        this.initRecipes();
    });
  }

  openRecipeDtoFormDialog(recipe: RecipeDTO){
    this.dialog.open(RecipeToCookDialogComponent,{
      width: this.mobileQueryIphone6Plus.matches ? '100%' : '45%',
      maxWidth: '100%',
      data: recipe
    })
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
