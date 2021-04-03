import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './utilities/material-module';
import { ArticlesTableComponent } from './Pages/articles-table/articles-table.component';
import { ArticleCreateFormComponent } from './components/article-create-form/article-create-form.component';
import { RoutinePageComponent } from './Pages/routine-page/routine-page.component';
import { RoutineArticlesTableComponent } from './components/routine-articles-table/routine-articles-table.component';
import { RoutineFormComponent } from './components/routine-form/routine-form.component';
import { RoutineArticleAddComponent } from './components/routine-article-add/routine-article-add.component';
import { RoutineArticleEditQtyComponent } from './components/routine-article-edit-qty/routine-article-edit-qty.component';
import { ShoppingPageComponent } from './Pages/shopping-page/shopping-page.component';
import { RecipePageComponent } from './Pages/recipe-page/recipe-page.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeArticleAddComponent } from './components/recipe-article-add/recipe-article-add.component';
import { RecipeArticleEditQtyComponent } from './components/recipe-article-edit-qty/recipe-article-edit-qty.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { ArticleCarouselComponent } from './components/article-carousel/article-carousel.component';
import { RecipeCarouselComponent } from './components/recipe-carousel/recipe-carousel.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { jwtUrls } from 'src/environments/environment';
import { AllArticleOccurencesDialogComponent } from './components/all-article-occurences-dialog/all-article-occurences-dialog.component';
import { RecipeToCookDialogComponent } from './dialogs/recipe-to-cook-dialog/recipe-to-cook-dialog.component';
import { CookingPageComponent } from './pages/cooking-page/cooking-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ArticlesTableComponent,
    ArticleCreateFormComponent,
    RoutinePageComponent,
    RoutineArticlesTableComponent,
    RoutineFormComponent,
    RoutineArticleAddComponent,
    RoutineArticleEditQtyComponent,
    ShoppingPageComponent,
    RecipePageComponent,
    RecipeFormComponent,
    RecipeArticleAddComponent,
    RecipeArticleEditQtyComponent,
    HomePageComponent,
    ArticleCarouselComponent,
    RecipeCarouselComponent,
    NotFoundComponent,
    AllArticleOccurencesDialogComponent,
    RecipeToCookDialogComponent,
    CookingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
        allowedDomains: jwtUrls.allowedDomains,
        disallowedRoutes: jwtUrls.disallowedRoutes,
      },
    }),
    BrowserAnimationsModule,
    MaterialFileInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
