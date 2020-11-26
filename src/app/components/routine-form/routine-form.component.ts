import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoutineDTO } from 'src/app/models/routine-dto';
import { RoutineService } from 'src/app/services/routine.service';

@Component({
  selector: 'app-routine-form',
  templateUrl: './routine-form.component.html',
  styleUrls: ['./routine-form.component.css']
})
export class RoutineFormComponent implements OnInit {
  routineForm: FormControl;
  title:string;

  constructor(public dialogRef: MatDialogRef<RoutineFormComponent>, @Inject(MAT_DIALOG_DATA) public data: RoutineDTO,private routineService:RoutineService ,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  //FORMS

  initForm(){
    this.routineForm = new FormControl(this.data? this.data.name : '',Validators.required);
    this.title = this.data? 'Routine Update' : 'Routine Creation';
  }

  onSubmitForm(){
    if (this.routineForm.valid) {

      const routineDTO : RoutineDTO = {
        id: this.data? this.data.id : null,
        name: this.routineForm.value,
        routineArticles: this.data? this.data.routineArticles : []
      }

      if (this.data) 
        this.updateRoutine(routineDTO);
      else this.createRoutine(routineDTO);
      
    }
  }
  
  createRoutine(routineDTO:RoutineDTO){
    this.routineService.create(routineDTO).subscribe(() => this.dialogRef.close('refresh'));
  }

  updateRoutine(routineDTO:RoutineDTO){
    this.routineService.update(routineDTO).subscribe(() => this.dialogRef.close('refresh'));
  }


  onNoClick(): void {
    this.dialogRef.close('close');
  }

}
