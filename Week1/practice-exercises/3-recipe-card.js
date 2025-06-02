/**
 * Ever wondered how to make a certain meal? Let's create a recipe list with JavaScript!
 *   
 *   Declare a variable that holds an empty object literal (your meal recipe).
 *   Give the object 3 properties: a title (string), a servings (number) and an ingredients (array of strings) property.
 *   Log each property out separately, using a loop (for, while or do/while)
 */


const recipe = {
  title: 'Omelette',
  servings: 2,
  ingredients: ['4 eggs', '2 strips of bacon', '1 tsp salt/pepper'],
};

// Log title and servings
console.log(`Meal name: ${recipe.title}`);
console.log(`Serves: ${recipe.servings}`);

// Log ingredients using a loop
console.log('Ingredients:');
for (let i = 0; i < recipe.ingredients.length; i++) {
  console.log(`- ${recipe.ingredients[i]}`);
}
