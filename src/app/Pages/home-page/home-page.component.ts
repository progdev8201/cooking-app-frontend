import { Component, OnInit } from '@angular/core';
import { ArticleDTO } from 'src/app/models/article-dto';
import { CarouselArticle } from 'src/app/models/carousel-article';
import { CarouselRecipe } from 'src/app/models/carousel-recipe';
import { FridgeDTO } from 'src/app/models/fridge-dto';
import { RecipeDTO } from 'src/app/models/recipe-dto';
import { RoutineArticleDTO } from 'src/app/models/routine-article-dto';
import { FridgeService } from 'src/app/services/frigo.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  cookableRecipes: CarouselRecipe[] = [];
  availableRecipes: CarouselRecipe[] = [];
  fridge: FridgeDTO;
  availableArticles: CarouselArticle[];
  missingArticles: CarouselArticle[];
  articlesPerCarousel: number = 6;


  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.initFridge();
  }

  initFridge() {
    this.fridgeService.find().subscribe(data => {
      this.fridge = data;
      this.availableArticles = this.initCarouselArticles(this.fridge.availableArticles);
      this.missingArticles = this.initCarouselArticles(this.fridge.missingArticles);
      this.availableRecipes = this.initCarouselRecipe(this.fridge.availableRecipes);
      this.fridgeService.findAllCookable().subscribe(cookableRecipes => this.cookableRecipes = this.initCarouselRecipe(cookableRecipes));
    });

  }


  initCarouselArticles(articlesArrayFridge: RoutineArticleDTO[]): CarouselArticle[] {
    //create variables
    const isThereAnotherArray: boolean = articlesArrayFridge.length % this.articlesPerCarousel != 0;

    let arrayCount: number = Math.floor(articlesArrayFridge.length / this.articlesPerCarousel);

    arrayCount = isThereAnotherArray ? arrayCount + 1 : arrayCount;

    var mainArrayCounter = 0;

    let carouselArticles: CarouselArticle[] = [];


    //logic
    for (let i = 0; i < arrayCount; i++) {
      let carouselArticle: CarouselArticle = { articles: [] };

      for (let j = 0; j < this.articlesPerCarousel && articlesArrayFridge.length > mainArrayCounter; j++) {
        const element = articlesArrayFridge[mainArrayCounter++];

        carouselArticle.articles.push(element);
      }

      carouselArticles.push(carouselArticle);
    }

    return carouselArticles;
  }

  initCarouselRecipe(recipeFridgeArray: RecipeDTO[]) {
    //create variables
    const isThereAnotherArray: boolean = recipeFridgeArray.length % this.articlesPerCarousel != 0;

    let arrayCount: number = Math.floor(recipeFridgeArray.length / this.articlesPerCarousel);

    arrayCount = isThereAnotherArray ? arrayCount + 1 : arrayCount;

    var mainArrayCounter = 0;

    let carouselRecipes: CarouselRecipe[] = [];


    //logic
    for (let i = 0; i < arrayCount; i++) {
      let carouselRecipe: CarouselRecipe = { recipes: [] };

      for (let j = 0; j < this.articlesPerCarousel && recipeFridgeArray.length > mainArrayCounter; j++) {
        const element = recipeFridgeArray[mainArrayCounter++];

        carouselRecipe.recipes.push(element);
      }

      carouselRecipes.push(carouselRecipe);
    }

    return carouselRecipes;
  }


}
