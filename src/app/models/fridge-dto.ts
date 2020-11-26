import { RecipeDTO } from './recipe-dto';
import { RoutineArticleDTO } from './routine-article-dto';

export interface FridgeDTO {
    id: number;
    availableArticles: RoutineArticleDTO[];
    availableRecipes: RecipeDTO[];
    missingArticles: RoutineArticleDTO[];
}
