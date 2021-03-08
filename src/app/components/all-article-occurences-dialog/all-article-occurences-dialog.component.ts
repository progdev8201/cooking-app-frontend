import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleDTO } from 'src/app/models/article-dto';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleCreateFormComponent } from '../article-create-form/article-create-form.component';

@Component({
  selector: 'app-all-article-occurences-dialog',
  templateUrl: './all-article-occurences-dialog.component.html',
  styleUrls: ['./all-article-occurences-dialog.component.css']
})
export class AllArticleOccurencesDialogComponent implements OnInit {
  allOccurencesList: string[];
  article: ArticleDTO;

  constructor(private articleService: ArticleService,public dialogRef: MatDialogRef<ArticleCreateFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initValues();
  }

  initValues(){
    this.allOccurencesList = this.data.occurences;
    this.article = this.data.articleDto;
  }

  onDelete(){
    this.articleService.delete(this.article.id).subscribe(() => this.dialogRef.close('refresh'));
  }

}
