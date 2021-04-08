const host = 'http://localhost:';
const port = '9090';
const link = host + port;

export const environment = {
  production: false,
  baseImage:'../../../assets/recette.jpg',
  globalUrl: `${link}`,
  loginUrl: `${link}/authenticate`,
  registrationUrl: `${link}/registration`,
  articleUrl:`${link}/article`,
  routineUrl:`${link}/routine`,
  shoppingUrl:`${link}/shop`,
  recipeUrl:`${link}/recipe`,
  fridgeUrl:`${link}/fridge`,
  imageUrl:`${link}/image`,
  cookingUrl: `${link}/cooking`,
  statisticUrl: `${link}/statistic`
};

export const jwtUrls={
  allowedDomains: ["localhost:9090"],
  disallowedRoutes:["localhost:9090/authenticate", "localhost:9090/registration"]
}