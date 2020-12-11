// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const host = 'http://3.129.204.119';
const port = '';
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
  imageUrl:`${link}/image`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
