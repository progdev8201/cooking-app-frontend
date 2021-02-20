import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private routineService: RoutineService,public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

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
    this.routineService.findAll().subscribe(data => this.routines = data);
  }

  onDeleteRoutine(routineId: string){
    this.routineService.delete(routineId).subscribe(() => this.initRoutines());
  }
}
