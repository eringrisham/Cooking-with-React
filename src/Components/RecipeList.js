import React, { useContext } from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './App';

export default function RecipeList(props) {

	const { handleRecipeAdd } = useContext(RecipeContext);
	//can destructure handleRecipeAdd out of our 'useContext'

	const {recipes,
		// handleRecipeAdd,
		// handleRecipeDelete
	} = props;

  return (
		<div className='recipe-list'>
			<div>
			{recipes.map((recipe) => {
				return <Recipe
				  // handleRecipeDelete={handleRecipeDelete}
					key={recipe.id}
					{...recipe}
				/>
			})}
			</div>
			<br></br>
		  <div className='recipe-list-add-recipe-btn-container'>
	  	  <button
				  className='btn btn--primary'
				  onClick={handleRecipeAdd}
				>
					Add Recipe
				</button>
		  </div>
		</div>
	)
}