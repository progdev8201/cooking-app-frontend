import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeToCookDialogComponent } from 'src/app/dialogs/recipe-to-cook-dialog/recipe-to-cook-dialog.component';
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
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private fridgeService: FridgeService, public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.navId = '#' + this.carouselId;
  }

  //SERVICES

  onButtonClicked(recipe: RecipeDTO) {
    if (this.type == 'availableRecipes')
      this.removeRecipe(recipe.id);
    else
      this.openRecipeDtoFormDialog(recipe);
  }

  removeRecipe(recipeId: string) {
    //remove recipe from available recipe in fridge then update fridge
    this.fridge.availableRecipes = this.fridge.availableRecipes.filter(recipe => recipe.id != recipeId);
    this.fridgeService.updateFridge(this.fridge).subscribe(() => this.refreshFridge.emit());
  }


  openRecipeDtoFormDialog(recipe: RecipeDTO) {
    this.dialog.open(RecipeToCookDialogComponent, {
      width: this.mobileQuery.matches ? '100%' : '45%',
      maxWidth: '100%',
      data: recipe
    })
  }

  getImage(image: string): string {
    return image == environment.baseImage ? environment.baseImage : `${environment.imageUrl}/download/${image}`;
  }

  //CLASS STYLE

  getClass(index: number): string {
    return index == 0 ? 'carousel-item active' : 'carousel-item';
  }

}