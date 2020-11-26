import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarouselRecipe } from 'src/app/models/carousel-recipe';
import { FridgeDTO } from 'src/app/models/fridge-dto';
import { RecipeDTO } from 'src/app/models/recipe-dto';
import { FridgeService } from 'src/app/services/frigo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-carousel',
  templateUrl: './recipe-carousel.component.html',
  styleUrls: ['./recipe-carousel.component.css']
})
export class RecipeCarouselComponent implements OnInit {

  @Input() recipes: CarouselRecipe[];
  @Input() fridge: FridgeDTO;
  @Input() title: string;
  @Input() carouselId: string;
  @Input() buttonMessage: string;
  @Input() type: string;
  @Output() refreshFridge = new EventEmitter();
  navId: string;

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
  }

  //SERVICES

  onButtonClicked(recipeId: string) {
    if (this.type == 'availableRecipes')
      this.removeRecipe(recipeId);
    else
      this.addToCookingList(recipeId);

  }

  removeRecipe(recipeId: string) {
    //remove recipe from available recipe in fridge then update fridge
    this.fridge.availableRecipes = this.fridge.availableRecipes.filter(recipe => recipe.id != recipeId);
    this.fridgeService.updateFridge(this.fridge).subscribe(() => this.refreshFridge.emit());
  }

  addToCookingList(recipeId: string) {
    //find recipe then add it to cooking list then update cooking list
  }

  getImage(image: string): string {
    return image == environment.baseImage ? environment.baseImage : `${environment.imageUrl}/download/${image}`;
  }

  //CLASS STYLE

  getClass(index: number): string {
    return index == 0 ? 'carousel-item active' : 'carousel-item';
  }

}
