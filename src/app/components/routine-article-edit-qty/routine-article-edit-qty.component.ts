import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoutineArticleDTO } from 'src/app/models/routine-article-dto';
import { RoutineDTO } from 'src/app/models/routine-dto';
import { RoutineService } from 'src/app/services/routine.service';

@Component({
  selector: 'app-routine-article-edit-qty',
  templateUrl: './routine-article-edit-qty.component.html',
  styleUrls: ['./routine-article-edit-qty.component.css']
})
export class RoutineArticleEditQtyComponent implements OnInit {
  quantityFormControl: FormControl;

  constructor(public dialogRef: MatDialogRef<RoutineArticleEditQtyComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private routineService:RoutineService) { }

  ngOnInit(): void {
    this.quantityFormControl = new FormControl(this.data.currentRoutineArticle.quantity, Validators.required);
  }

  updateRoutineQuantity() {
    if (this.quantityFormControl.valid) {

      //modify the quantity of the routine article
      const routineArticle: RoutineArticleDTO = this.data.currentRoutineArticle;
      const routine: RoutineDTO = this.data.routine;

      routineArticle.quantity = this.quantityFormControl.value;

      for (let index = 0; index < routine.routineArticles.length; index++) {
        const element = routine.routineArticles[index];

        if (element.id == routineArticle.id) {
          routine.routineArticles[index] = routineArticle;
          break;
        }
      }

      this.onUpdate(routine);
    }
  }

  onUpdate(routine:RoutineDTO) {
    this.routineService.update(routine).subscribe(() => this.dialogRef.close('refresh'));
  }

  onNoClick() {
    this.dialogRef.close('close');
  }

}
