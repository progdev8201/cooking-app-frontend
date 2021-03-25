import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarouselArticle } from 'src/app/models/carousel-article';
import { FridgeDTO } from 'src/app/models/fridge-dto';
import { RoutineArticleDTO } from 'src/app/models/routine-article-dto';
import { FridgeService } from 'src/app/services/frigo.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { environment } from 'src/environments/environment';
import { RoutineArticleAddComponent } from '../routine-article-add/routine-article-add.component';

@Component({
  selector: 'app-article-carousel',
  templateUrl: './article-carousel.component.html',
  styleUrls: ['./article-carousel.component.css']
})
export class ArticleCarouselComponent implements OnInit {

  @Input() articles: CarouselArticle[];
  @Input() fridge: FridgeDTO;
  @Input() title: string;
  @Input() carouselId: string;
  @Input() buttonMessage: string;
  @Input() type:string;
  @Output() refreshFridge = new EventEmitter();
  navId: string;
  
  constructor(private fridgeService:FridgeService,private shoppingService:ShoppingService) { }
  
  ngOnInit(): void {
    this.navId = '#'+this.carouselId;
  }

  //SERVICES

  onButtonClicked(routineId:string){
    if (this.type == "availableArticles") 
      this.addToMissing(routineId);
    else
      this.addToShop(routineId);
  }

  addToMissing(routineId:string){
    //remove from fridge available articles
    const routineArticleToDismiss : RoutineArticleDTO = this.fridge.availableArticles.find( routineArticle => routineArticle.id == routineId);
    this.fridge.availableArticles = this.fridge.availableArticles.filter(routineArticle => routineArticle.id != routineId);
   
    //then add it to fridge missing
    this.fridge.missingArticles.push(routineArticleToDismiss);

    // then update fridge and refresh parent fridge
    this.fridgeService.updateFridge(this.fridge).subscribe(()=>this.refreshFridge.emit());
  }

  addToShop(routineId:string){
    //remove from missing articles then update fridge
    let routineArticleToShop : RoutineArticleDTO = this.fridge.missingArticles.find(routineArticle => routineArticle.id == routineId);
    routineArticleToShop.quantity = 1;
    this.fridge.missingArticles = this.fridge.missingArticles.filter(routineArticle => routineArticle.id != routineId);

    this.fridgeService.updateFridge(this.fridge).subscribe(()=>{

      const routineArticles = [routineArticleToShop];
      
      this.shoppingService.addArticlesToShoppingList(routineArticles).subscribe(() => this.refreshFridge.emit());
    });
  }

  getImage(image:string):string{
    return image == environment.baseImage ? environment.baseImage : `${environment.imageUrl}/download/${image}`;
  }

  //CLASS STYLE

  getClass(index:number):string{
    return index == 0 ? 'carousel-item active' : 'carousel-item';
  }

}
