import { RecipeArticleDTO } from './recipe-article-dto';
import { RecipeType } from './recipe-type.enum';

export interface RecipeDTO {
    id:string;
    name:string;
    recipeArticles: RecipeArticleDTO[];
    image:string;
    country:string;
    description:string;
    recipeType:RecipeType;
    instructions:string[];
    boughtDate:Date[];
    panelOpenState?:boolean;
}
