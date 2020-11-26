import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeArticleDTO } from 'src/app/models/recipe-article-dto';

@Component({
  selector: 'app-recipe-article-edit-qty',
  templateUrl: './recipe-article-edit-qty.component.html',
  styleUrls: ['./recipe-article-edit-qty.component.css']
})
export class RecipeArticleEditQtyComponent implements OnInit {
  quantityFormControl: FormControl;

  constructor(public dialogRef: MatDialogRef<RecipeArticleEditQtyComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.quantityFormControl = new FormControl(this.data.amount, Validators.required);
  }

  updateRecipeQuantity() {
    if (this.quantityFormControl.valid) {
      //todo need to fix this code il manque le recipe
      
      //modify the quantity of the routine article
      const recipeArticle: RecipeArticleDTO = this.data.recipeArticle;
      const recipeArticles: RecipeArticleDTO[] = this.data.recipeArticles;

      recipeArticle.amount = this.quantityFormControl.value;

      for (let index = 0; index < recipeArticles.length; index++) {
        const element = recipeArticles[index];

        if (element.id == recipeArticle.id) {
          recipeArticles[index] = recipeArticle;
          break;
        }
      }

      this.dialogRef.close('close');
    }
  }

  onNoClick() {
    this.dialogRef.close('close');
  }

}
