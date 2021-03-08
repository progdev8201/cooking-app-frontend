import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleCategorie } from 'src/app/models/article-categorie.enum';
import { ArticleDTO } from 'src/app/models/article-dto';
import { ArticleType } from 'src/app/models/article-type.enum';
import { ArticleService } from 'src/app/services/article.service';
import { ImageService } from 'src/app/services/image.service';
import { FileInput, FileValidator } from 'ngx-material-file-input';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article-create-form',
  templateUrl: './article-create-form.component.html',
  styleUrls: ['./article-create-form.component.css']
})
export class ArticleCreateFormComponent implements OnInit {
  articleForm: FormGroup;
  categorieValues: string[] = Object.keys(ArticleCategorie);
  typeValues: string[] = Object.keys(ArticleType);
  title: string;
  UNIQUE_NAME_CONSTRAINT: string = "Name of Article Cannot Be repeated";

  //file setup

  disabled: boolean = false;
  multiple: boolean = false;
  accept: string = "image/*";
  maxSize = 1024;

  constructor(private imageService: ImageService, public dialogRef: MatDialogRef<ArticleCreateFormComponent>, @Inject(MAT_DIALOG_DATA) public data: ArticleDTO, private articleService: ArticleService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  //INIT

  initForm() {
    this.articleForm = this.formBuilder.group({
      name: [this.data ? this.data.name : '', Validators.required],
      price: [this.data ? this.data.price : '', Validators.required],
      description: [this.data ? this.data.articleDetail : ''],
      type: [this.data ? this.data.articleType : '', Validators.required],
      file: ['', FileValidator.maxContentSize(this.maxSize * 1024)],
      categorie: [this.data ? this.data.articleCategorie : '', Validators.required]
    });

    this.title = this.data ? 'Article Update' : 'Article Creation';
  }

  onNoClick(): void {
    this.dialogRef.close('close');
  }

  //SERVICES 

  onSubmitForm() {

    if (this.articleForm.valid) {
      const formValue = this.articleForm.value;

      const articleDTO: ArticleDTO = {
        id: this.data ? this.data.id : null,
        name: formValue['name'],
        image: this.data ? this.data.image : environment.baseImage,
        articleDetail: formValue['description'],
        price: formValue['price'],
        articleType: formValue['type'],
        articleCategorie: formValue['categorie'],
        transactions: this.data ? this.data.transactions : []
      }

      if (this.data)
        this.updateArticle(articleDTO);
      else
        this.createArticle(articleDTO);
    }
  }

  getF() {
    return this.articleForm.controls;
  }

  createArticle(articleDTO: ArticleDTO) {
    this.articleService.create(articleDTO).subscribe((data) => this.uploadImage(data.id), error => this.handleNameError(error));
  }

  updateArticle(articleDTO: ArticleDTO) {
    this.articleService.update(articleDTO).subscribe((data) => this.uploadImage(data.id), error => this.handleNameError(error));
  }
  
  handleNameError(error: any){
    if (error.error.message == this.UNIQUE_NAME_CONSTRAINT) {
      this.getF().name.setErrors({uniqueNameError:true});
    }
  }

  uploadImage(imageObjectId: string) {
    const file_form: FileInput = this.articleForm.get('file').value;
    const file = file_form.files == undefined ? undefined : file_form.files[0];

    const formData: FormData = new FormData();
    formData.append('file', file);

    if (file != undefined)
      this.imageService.upload(formData, imageObjectId, true).subscribe(() => this.dialogRef.close("refresh"));
    else
      this.dialogRef.close('refresh');
  }

}
