import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) { }

  public upload(formData: FormData, imageObjectId: string, isArticle: boolean) {
    return this.http.post<any>(`${environment.imageUrl}/${localStorage.getItem('userId')}/${imageObjectId}/${isArticle}`, formData);
  }
}
