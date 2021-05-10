import React, { useContext } from 'react';
import RecipeIngredientEdit from './RecipeIngredientEdit';
import { RecipeContext } from './App';

export default function RecipeEdit({ recipe }) {

	const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

	function handleChange(changes) {
		//changes we are passing in are an object
		handleRecipeChange(recipe.id, { ...recipe, ...changes });
	}

	function handleIngredientChange(id, ingredient) {
		const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((i) => {
      return i.id === id;
    })
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
	}

	function handleIngredientAdd() {
    const newIngredient = {
		  id: Date.now().toString(),
			name: '',
			amount: ''
		}
		handleChange({ ingredients: [ ...recipe.ingredients, newIngredient ]})
	}

	function handleIngredientDelete(id) {
		handleChange({ ingredients: recipe.ingredients.filter((ingredient) => {
      return ingredient.id !== id;
		})})
	}

  return (
		<div className='recipe-edit'>
			<div className='recipe-edit__remove-btn-container'>
				<button
				  className='btn recipe-edit__remove-btn'
          onClick={() => {
						handleRecipeSelect(undefined);
					}}
				>
					&times;
				</button>
				{/* this uses perfectly centered html 'x' instead of our text */}
			</div>
			<div className='recipe-edit__details-grid'>
				<label
				  htmlFor='name'
				  className='recipe-edit__label'>
					Name
				</label>
				<input
				  type='text'
					name='name'
					id='name'
					value={recipe.name}
					onChange={(e) => {
						handleChange({ name: e.target.value })
					}}
					className='recipe-edit__input'/>
				<label
				  htmlFor='cookTime'
					className='recipe-edit__label'>
					Cook Time
				</label>
				<input
				  type='text'
					name='cookTime'
					id='cookTime'
					value={recipe.cookTime}
					onChange={(e) => {
						handleChange({ cookTime: e.target.value })
					}}
					className='recipe-edit__input'/>
				<label
				  htmlFor='servings'
					className='recipe-edit__label'>
					Servings
				</label>
				<input
				  type='number'
					min='1'
					name='servings'
					id='servings'
					value={recipe.servings}
					onChange={(e) => {
						handleChange({ servings: Number(e.target.value) })
					}}
					className='recipe-edit__input'/>
				<label
				  htmlFor='instructions'
					className='recipe-edit__label'>
					Instructions
				</label>
				<textarea
				  name='instructions'
					id='instructions'
					value={recipe.instructions}
					onChange={(e) => {
						handleChange({ instructions: e.target.value })
					}}
					className='recipe-edit__input'/>
			</div>
			<br/>
      <label className='recipe-edit__label'>Ingredients</label>
			<div className='recipe-edit__ingredient-grid'>
				<div>Name</div>
				<div>Amount</div>
				<div></div>
				{recipe.ingredients.map((ingredient) => {
          return <RecipeIngredientEdit
					  key={ingredient.id}
						handleIngredientChange={handleIngredientChange}
						ingredient={ingredient}
						handleIngredientDelete={handleIngredientDelete}
					/>
				})}
				{/* Ingredient Components */}
			</div>
			<div className='recipe-edit__ingredient-add-btn-container'>
				<button
				  className='btn btn--primary'
					onClick={handleIngredientAdd}
				>
					Add Ingredient
				</button>
			</div>
		</div>
	)
}