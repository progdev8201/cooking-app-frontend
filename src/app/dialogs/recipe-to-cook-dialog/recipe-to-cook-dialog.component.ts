import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddRecipeToCookingListRequest } from 'src/app/models/add-recipe-to-cooking-list-request';
import { RecipeDTO } from 'src/app/models/recipe-dto';
import { CookingService } from 'src/app/services/cooking.service';

@Component({
  selector: 'app-recipe-to-cook-dialog',
  templateUrl: './recipe-to-cook-dialog.component.html',
  styleUrls: ['./recipe-to-cook-dialog.component.css']
})
export class RecipeToCookDialogComponent implements OnInit {
  recipeToCookForm: FormGroup;
  minDate: Date;
  mobileQuery: MediaQueryList;
  durationInSeconds = 5;

  private _mobileQueryListener: () => void;

  constructor(private router:Router,private _snackBar: MatSnackBar, private formBuilder:FormBuilder,private cookingService: CookingService, public dialogRef: MatDialogRef<RecipeToCookDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: RecipeDTO, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.initDate();
    this.initFormGroup();
  }

  // ALL ABOUT THE FORM
  
  initFormGroup(){
    this.recipeToCookForm = this.formBuilder.group({
      cookingDate: ['',Validators.required]
    });
  }

  initDate(){
    this.minDate = new Date();
  }

  getF(){
    return this.recipeToCookForm.controls;
  }

  onSubmitForm(){
    if (this.recipeToCookForm.valid) {
      const formValue = this.recipeToCookForm.value;

      const addRecipeToCookingListRequest: AddRecipeToCookingListRequest = {
        cookDate: new Date(formValue['cookingDate']),
        recipesToCook: [this.data]
      }

      this.cookingService.addRecipesToList(addRecipeToCookingListRequest).subscribe(() =>{
        this.openSnackBar('Recipe added to cooking list with success','See Cooking List');
        this.dialogRef.close();
      });
      
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });

    this._snackBar._openedSnackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/cooking']);
    });
  }

}