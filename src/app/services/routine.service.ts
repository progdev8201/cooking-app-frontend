import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoutineDTO } from '../models/routine-dto';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  constructor(private http:HttpClient) { }

  create(routineDTO:RoutineDTO){
    return this.http.post(`${environment.routineUrl}/${localStorage.getItem('userId')}`,routineDTO);
  }

  find(routineId:string):Observable<RoutineDTO>{
    return this.http.get<RoutineDTO>(`${environment.routineUrl}/${routineId}/${localStorage.getItem('userId')}`);
  }

  findAll():Observable<RoutineDTO[]>{
    return this.http.get<RoutineDTO[]>(`${environment.routineUrl}/${localStorage.getItem('userId')}`);
  }

  update(routineDTO:RoutineDTO):Observable<RoutineDTO>{
    return this.http.put<RoutineDTO>(`${environment.routineUrl}/${localStorage.getItem('userId')}`,routineDTO);
  }

  delete(routineId: string){
    return this.http.delete(`${environment.routineUrl}/${localStorage.getItem('userId')}/${routineId}`);
  }
}
