import { CookingAmountPerMonthResponse } from "./cooking-amount-per-month-response";
import { MoneySpentPerMonthResponse } from "./money-spent-per-month-response";
import { RecipeCookTimePerMonthResponse } from "./recipe-cook-time-per-month-response";

export interface AllStatisticsResponse {
    averageMoneySpentPerMonth: number;
    moneySpentThisYear: number;
    averageTimeCookPerMonth: number;
    cookingAmountPerMonthResponses: CookingAmountPerMonthResponse[];
    moneySpentPerMonthResponses: MoneySpentPerMonthResponse[];
    recipeCookTimePerMonthResponses: RecipeCookTimePerMonthResponse[];
}
