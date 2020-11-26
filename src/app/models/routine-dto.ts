import { RoutineArticleDTO } from './routine-article-dto';

export interface RoutineDTO {
    id: string;
    name: string;
    routineArticles: RoutineArticleDTO[];
    panelOpenState?:boolean;
}
