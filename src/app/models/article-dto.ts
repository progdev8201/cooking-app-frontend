import { ArticleCategorie } from './article-categorie.enum';
import { ArticleType } from './article-type.enum';
import { TransactionDTO } from './transaction-dto';

export interface ArticleDTO {
    id:string;
    name:string;
    articleDetail:string;
    price: number;
    image: string;
    articleType: ArticleType;
    articleCategorie: ArticleCategorie;
    transactions:TransactionDTO[];
}
