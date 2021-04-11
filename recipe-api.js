import { Recipe } from './recipe.js';

export async function retrieve(ingredients) {
    const url = api_url(ingredients);
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        const responseRecipes = await rawData.results;
        console.log(responseRecipes);
        const recipes = responseRecipes.map(
            recipe => new Recipe(recipe.title.trim(),
                                Ingredients.parse(recipe.ingredients),
                                recipe.thumbnail,
                                recipe.href)
        );
        return recipes;
    } catch(error) {
        console.log(`An error happened when trying to retrieving data from URL ${url}`);
        console.log(error);
    }
}
