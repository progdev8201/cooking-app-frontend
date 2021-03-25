import { SelectionModel } from '@angular/cdk/collections';
import { MediaMatcher } from '@angular/cdk/layout';
import { NONE_TYPE } from '@angular/compiler';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RoutineArticleDTO } from 'src/app/models/routine-article-dto';
import { RoutineDTO } from 'src/app/models/routine-dto';
import { RoutineService } from 'src/app/services/routine.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { environment } from 'src/environments/environment';
import { RoutineArticleAddComponent } from '../routine-article-add/routine-article-add.component';
import { RoutineArticleEditQtyComponent } from '../routine-article-edit-qty/routine-article-edit-qty.component';

@Component({
  selector: 'app-routine-articles-table',
  templateUrl: './routine-articles-table.component.html',
  styleUrls: ['./routine-articles-table.component.css']
})
export class RoutineArticlesTableComponent implements OnInit {
  displayedColumns: string[] = ['select','image', 'name', 'qty', 'edit', 'delete'];
  dataSource = new MatTableDataSource<RoutineArticleDTO>([]);
  selection = new SelectionModel<RoutineArticleDTO>(true, []);
  durationInSeconds = 5;
  mobileQuery: MediaQueryList;
  mobileQueryIphone5: MediaQueryList;

  private _mobileQueryListener: () => void;

  @Input() routine: RoutineDTO;
  @Output() refreshRoutines = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog,private shoppingService:ShoppingService, private routineService: RoutineService,private router:Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryIphone5 = media.matchMedia('(max-width: 330px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mobileQueryIphone5.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.initTable();
  }

  // ALL ABOUT THE DIALOG

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      
    });

    this._snackBar._openedSnackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/shopping']);
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(RoutineArticleAddComponent, {
      width: '100%',
      maxWidth:this.mobileQuery.matches ? '100%' : '50%',
      panelClass: 'app-routine-article-add-dialog',
      data: this.routine
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'refresh')
        this.initTable();
    });
  }

  openQtyDialog(routineArticle:RoutineArticleDTO){
    const dialogRef = this.dialog.open(RoutineArticleEditQtyComponent, {
      width: '400px',
      data: {routine: this.routine,currentRoutineArticle:routineArticle}
    });
  }

  //SERVICES

  addToShop(){
    if (this.selection.selected.length > 0) 
      this.shoppingService.addArticlesToShoppingList(this.selection.selected).subscribe(() => this.openSnackBar("Added to Shop With Success","Go to Shopping"));
  }

  getImage(image:string):string{
    return image == environment.baseImage ? environment.baseImage : `${environment.imageUrl}/download/${image}`;
  }

  refreshAllRoutines() {
    this.refreshRoutines.emit();
  }

  onDelete(articleRoutineId: string) {
    this.routine.routineArticles = this.routine.routineArticles.filter(article => article.id !== articleRoutineId);

    this.routineService.update(this.routine).subscribe((data) => {
      this.routine = data;
      this.initTable();
    })
  }

  //ALL ABOUT THE TABLE

  initTable() {
    this.dataSource = new MatTableDataSource(this.routine.routineArticles);
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
  checkboxLabel(row?: RoutineArticleDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }
}
