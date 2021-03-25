import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RoutineArticleDTO } from 'src/app/models/routine-article-dto';
import { ShoppingService } from 'src/app/services/shopping.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {

  displayedColumns: string[] = ['image','name', 'qty', 'price', 'delete'];
  shoppingList:RoutineArticleDTO[] = [];
  dataSource = new MatTableDataSource<RoutineArticleDTO>([]);
  durationInSeconds = 5;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private router:Router,private _snackBar: MatSnackBar,private shoppingService:ShoppingService) { }

  
  ngOnInit(): void {
    this.initShoppingList();
  }
  
  //SERVICES
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });

    this._snackBar._openedSnackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  initShoppingList(){
    this.shoppingService.findAll().subscribe(data =>{
      this.shoppingList = data;
      this.initTable();
    });
  }

  getImage(image:string):string{
    return image == environment.baseImage ? environment.baseImage : `${environment.imageUrl}/download/${image}`;
  }

  onDelete(routineArticleId:string){
    const articlesToDelete = [this.shoppingList.find(routineArticle => routineArticle.id == routineArticleId)];

    this.shoppingService.deleteArticlesToShoppingList(articlesToDelete).subscribe((data) =>{
      this.shoppingList = data;
      this.initTable();
    });
  }

  onShop(){
    this.shoppingService.shop().subscribe(() => {
      this.initShoppingList();
      this.openSnackBar('Shopping Success','Go to Home Page');
    });
  }

  //ALL ABOUT THE TABLE
  initTable(){
    this.dataSource = new MatTableDataSource(this.shoppingList);
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
