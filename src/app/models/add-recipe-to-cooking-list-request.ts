import { RecipeDTO } from "./recipe-dto";

export interface AddRecipeToCookingListRequest {
    cookDate:Date;
    recipesToCook: RecipeDTO[];
}
