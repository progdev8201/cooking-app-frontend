import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileInput, FileValidator } from 'ngx-material-file-input';
import { RecipeArticleDTO } from 'src/app/models/recipe-article-dto';
import { RecipeDTO } from 'src/app/models/recipe-dto';
import { RecipeType } from 'src/app/models/recipe-type.enum';
import { ImageService } from 'src/app/services/image.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { environment } from 'src/environments/environment';
import { RecipeArticleAddComponent } from '../recipe-article-add/recipe-article-add.component';
import { RecipeArticleEditQtyComponent } from '../recipe-article-edit-qty/recipe-article-edit-qty.component';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  recipeArticles: RecipeArticleDTO[] = [];
  displayedColumns: string[] = ['image', 'name', 'qty', 'edit', 'delete'];
  dataSource = new MatTableDataSource<RecipeArticleDTO>(this.recipeArticles);
  title: string;
  recipeTypes: string[] = Object.keys(RecipeType);
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  //file setup

  disabled: boolean = false;
  multiple: boolean = false;
  accept: string = "image/*";
  maxSize = 1024;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private imageService: ImageService, public dialog: MatDialog, private recipeService: RecipeService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<RecipeFormComponent>, @Inject(MAT_DIALOG_DATA) public data: RecipeDTO, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.initForm();
  }

  //ALL ABOUT THE FORMS

  initForm() {
    this.recipeForm = this.formBuilder.group({
      id: [this.data ? this.data.id : ''],
      name: [this.data ? this.data.name : '', Validators.required],
      country: [this.data ? this.data.country : ''],
      description: [this.data ? this.data.description : ''],
      file: ['', FileValidator.maxContentSize(this.maxSize * 1024)],
      recipeType: [this.data ? this.data.recipeType : '', Validators.required],
      instructions: new FormArray([])
    });


    if (this.data) {
      this.initInstruction();
      this.recipeArticles = this.data.recipeArticles;
      this.title = 'RECIPE UPDATE';
    } else {
      this.title = 'RECIPE CREATION';
    }

    this.initTable();
  }

  onSubmitForm() {
    if (this.recipeForm.valid) {

      const formValue = this.recipeForm.value;

      const recipe: RecipeDTO = {
        id: this.data ? this.data.id : formValue['id'],
        name: formValue['name'],
        recipeArticles: this.recipeArticles,
        image: this.data ? this.data.image : environment.baseImage,
        country: formValue['country'],
        description: formValue['description'],
        recipeType: formValue['recipeType'],
        boughtDate: this.data ? this.data.boughtDate : [],
        instructions: this.getInstructionsArray()
      }

      if (this.data)
        this.updateRecipe(recipe);
      else this.createRecipe(recipe);
    }
  }

  //ALL ABOUT THE DIALOG

  openDialog() {
    const dialogRef = this.dialog.open(RecipeArticleAddComponent, {
      width: '100%',
      maxWidth:this.mobileQuery.matches ? '100%' : '50%',
      panelClass: 'app-routine-article-add-dialog',
      data: this.recipeArticles
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'refresh')
        this.initTable();
    });
  }

  onEditAmount(recipeArticle: RecipeArticleDTO) {
    const dialogRef = this.dialog.open(RecipeArticleEditQtyComponent, {
      width: '800px',
      data: { recipeArticles: this.recipeArticles, recipeArticle: recipeArticle }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'refresh')
        this.initTable();
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close('close');
  }

  //SERVICES

  createRecipe(recipe: RecipeDTO) {
    this.recipeService.create(recipe).subscribe((data) => this.uploadImage(data.id));
  }

  updateRecipe(recipe: RecipeDTO) {
    this.recipeService.update(recipe).subscribe((data) => this.uploadImage(recipe.id));
  }

  uploadImage(imageObjectId: string) {
    const file_form: FileInput = this.recipeForm.get('file').value;
    const file = file_form.files == undefined ? undefined : file_form.files[0];

    const formData: FormData = new FormData();
    formData.append('file', file);

    if (file != undefined) {
      this.imageService.upload(formData, imageObjectId, false).subscribe(() => this.dialogRef.close("refresh"));
    } else
      this.dialogRef.close('refresh');
  }

  onDelete(id: string) {
    this.recipeArticles = this.recipeArticles.filter(recipeArticle => {
      return id != recipeArticle.id;
    })

    this.initTable();
  }

  getImage(image: string): string {
    return image == environment.baseImage ? environment.baseImage : `${environment.imageUrl}/download/${image}`;
  }


  //INSTRUCTIONS FORM ARRAY HANDLING

  initInstruction() {
    this.data.instructions.forEach((instruction) => {
      const formGroup = new FormGroup({
        instructionInput: new FormControl(instruction, Validators.required)
      });

      this.getInstructions().push(formGroup);
    })
  }

  getF() {
    return this.recipeForm.controls;
  }

  getInstructionsArray(): string[] {
    let recipeArticles: string[] = [];

    for (let index = 0; index < this.getInstructions().length; index++) {
      recipeArticles.push(this.getInstructions().at(index).get('instructionInput').value);
    }

    return recipeArticles;
  }

  onAddInstruction() {
    const instructionGroup = new FormGroup({
      instructionInput: new FormControl('', Validators.required)
    });

    this.getInstructions().push(instructionGroup);
  }

  onRemoveInstruction(index: number) {
    this.getInstructions().removeAt(index);
  }

  getInstructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }


  //ALL ABOUT THE TABLE

  initTable() {
    this.dataSource = new MatTableDataSource(this.recipeArticles);
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
