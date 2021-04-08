const host = 'http://10.0.0.22:';
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
  allowedDomains: ["10.0.0.22:9090"],
  disallowedRoutes:["10.0.0.22:9090/authenticate", "10.0.0.22:9090/registration"]
}