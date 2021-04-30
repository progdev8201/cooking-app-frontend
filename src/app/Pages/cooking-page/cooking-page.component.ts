import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookingService } from 'src/app/services/cooking.service';
import { RecipeToCookDTO } from 'src/app/models/recipe-to-cook-dto';
import { environment } from 'src/environments/environment';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cooking-page',
  templateUrl: './cooking-page.component.html',
  styleUrls: ['./cooking-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CookingPageComponent implements OnInit {
  dataSource: MatTableDataSource<RecipeToCookDTO>;
  columnsToDisplay = ['image', 'name', 'country', 'recipeType', 'time', 'cook', 'delete'];
  expandedElement: RecipeToCookDTO | null;
  recipesToCook: RecipeToCookDTO[];
  mobileQuery: MediaQueryList;
  durationInSeconds:number = 5;

  private _mobileQueryListener: () => void;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _snackBar:MatSnackBar,private cookingService: CookingService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.initRecipeToCookList();
  }

  onCookRecipeToCook(id: string) {
    this.cookingService.cookRecipe(id).subscribe(() => {
      this.initRecipeToCookList();
      this.openSnackBar('Recipe cooked with success','Fermer');
    });
  }

  onDeleteRecipeToCook(id: string) {
    this.cookingService.deleteRecipes([id]).subscribe(() => this.initRecipeToCookList());
  }

  initRecipeToCookList() {
    this.cookingService.findAll().subscribe(data => {
      this.recipesToCook = data;

      this.initTable();
    })
  }

  getImage(image: string): string {
    return image == environment.baseImage ? environment.baseImage : `${environment.imageUrl}/download/${image}`;
  }

  // ALL ABOUT THE TABLE

  initTable() {
    this.dataSource = new MatTableDataSource(this.recipesToCook);
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