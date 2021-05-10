import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';
import '../css/app.css';

//discuss when we would want to use Context
//Context helps us avoid passing down props that are not used in a component
//can get more specific about where props are used
export const RecipeContext = React.createContext();

const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes';
//using application name for readability in console

function App() {

  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find((recipe) => {
    return recipe.id === selectedRecipeId;
  })
  console.log(selectedRecipe);

  //order of useEffects is very important -- this will not work if flipped
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON) {
      setRecipes(JSON.parse(recipeJSON))
    }

  }, []);
  //pass in empty array as second arg so this runs only when app starts

  useEffect(() => {
    console.log('Rendered');
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes]);
  //second arg determines when function runs

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  };
  //**if key and value are exactly the same, can use above shorthand

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => {
      return r.id === id;
    })
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: Date.now().toString(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: Date.now().toString(),
          name: '',
          amount: ''
        }
      ]
    }
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
		}
    setRecipes(recipes.filter((recipe) => {
      return recipe.id !== id;
    }))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList
      // handleRecipeAdd={handleRecipeAdd}
      // handleRecipeDelete={handleRecipeDelete}
      recipes={recipes}
      />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
      {/* if I have a selected recipe (evals to true) then runs next thing */}
      {/* if selectedRecipe is undefined, execution stops */}
    </RecipeContext.Provider>
  )
}



const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: '1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken',
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 lbs'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: '1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork',
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 lbs'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 tbs'
      }
    ]
  }
]


export default App;


// import React, { useState } from 'react';
// import Counter from './Counter';
// import CounterHooks from './CounterHooks';

// export const ThemeContext = React.createContext()

// function App() {
//   console.log('Render App');
//   const [theme, setTheme] = useState('red');
//   return (
//     <ThemeContext.Provider value={{ backgroundColor: theme }}>
//     Counter
//     <Counter initialCount={0}/>
//     CounterHooks
//     <CounterHooks initialCount={0}/>
//     <button onClick={() => {
//       setTheme((prevTheme) => {
//         return prevTheme === 'red' ? 'blue' : 'red';
//       })
//     }}>Toggle Theme</button>
//     </ThemeContext.Provider>

//   )
// }

// export default App;
