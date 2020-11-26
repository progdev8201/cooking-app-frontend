import { ArticleDTO } from './article-dto';
import { UnitMeasurement } from './unit-measurement.enum';

export interface RecipeArticleDTO {
    id:string;
    article:ArticleDTO;
    amount:string;
    measurement:UnitMeasurement;
}