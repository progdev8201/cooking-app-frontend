import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoutineFormComponent } from 'src/app/components/routine-form/routine-form.component';
import { RoutineDTO } from 'src/app/models/routine-dto';
import { RoutineService } from 'src/app/services/routine.service';

@Component({
  selector: 'app-routine-page',
  templateUrl: './routine-page.component.html',
  styleUrls: ['./routine-page.component.css']
})
export class RoutinePageComponent implements OnInit {
  routines:RoutineDTO[];
  durationInSeconds = 5;

  constructor(private router:Router,private _snackBar: MatSnackBar,private routineService: RoutineService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initRoutines();
  }

  //DIALOG

  openDialog(routine:RoutineDTO) {
    const dialogRef = this.dialog.open(RoutineFormComponent, {
      width: '350px',
      data: routine
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'refresh') 
        this.initRoutines();
    });
  }

  //SERVICES

  initRoutines(){
    this.routineService.findAll().subscribe(data => {
      this.routines = data;
      
    },error =>{
      console.log(error);
    })
  }

  onDeleteRoutine(routineId: string){
    this.routineService.delete(routineId).subscribe(() => this.initRoutines());
  }
}
