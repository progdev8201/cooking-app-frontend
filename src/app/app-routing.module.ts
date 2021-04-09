import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { ArticlesTableComponent } from './Pages/articles-table/articles-table.component';
import { CookingPageComponent } from './pages/cooking-page/cooking-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { RecipePageComponent } from './Pages/recipe-page/recipe-page.component';
import { RoutinePageComponent } from './Pages/routine-page/routine-page.component';
import { ShoppingPageComponent } from './Pages/shopping-page/shopping-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', canActivate: [LoginGuardService], component: LoginComponent },
  { path: 'signup', canActivate: [LoginGuardService], component: SignupComponent },
  { path: 'home', canActivate: [AuthGuardService], component: HomePageComponent },
  { path: 'article', canActivate: [AuthGuardService], component: ArticlesTableComponent },
  { path: 'routine', canActivate: [AuthGuardService], component: RoutinePageComponent },
  { path: 'shopping', canActivate: [AuthGuardService], component: ShoppingPageComponent },
  { path: 'recipe', canActivate: [AuthGuardService], component: RecipePageComponent },
  { path: 'cooking', canActivate: [AuthGuardService], component: CookingPageComponent },
  { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardPageComponent },
  { path: 'not-found', canActivate: [AuthGuardService], component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
