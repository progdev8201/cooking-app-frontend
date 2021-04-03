import { RecipeDTO } from "./recipe-dto";

export interface RecipeToCookDTO {
    id:string;
    recipe:RecipeDTO;
    cookDate:Date;
}
