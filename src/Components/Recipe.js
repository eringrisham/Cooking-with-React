import React, { useContext, useEffect } from 'react';
import IngredientList from './IngredientList';
import { RecipeContext } from './App';

export default function Recipe(props) {

	const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);

	const {
		id,
		name,
		servings,
		cookTime,
		instructions,
	  ingredients,
	} = props;

	useEffect(() => {
		console.log('Render');
		return () => {
			console.log('unmount');
		}
	}, []);

	return (
		<div className='recipe'>
      <div className='recipe__header'>
				<h3 className='recipe__title'>{name}</h3>
				<button
				className='btn btn--primary mr-1'
				onClick={() => {
					handleRecipeSelect(id);
				}}
				>
					Edit
				</button>
				<button
				  onClick={() => {
						handleRecipeDelete(id);
					}}
				  className='btn btn--danger'

				>
					Delete
				</button>
			</div>
			<div className='recipe__row'>
				<span className='recipe__label'>Cook Time:</span>
				<span className='recipe__value'>{cookTime}</span>
			</div>
			<div className='recipe__row'>
				<span className='recipe__label'>Servings:</span>
				<span className='recipe__value'>{servings}</span>
			</div>
			<div className='recipe__row'>
				<span className='recipe__label'>Instructions:</span>
				<div className='recipe__value recipe__instructions recipe__value--indented'>{instructions}</div>
			</div>
			<div className='recipe__row'>
				<span className='recipe__label'>Ingredients:</span>
				<div className='recipe__value recipe__value--indented'>
					<IngredientList ingredients={ingredients} />
				</div>
			</div>
		</div>
	)
}