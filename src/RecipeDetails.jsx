import { useState } from 'react';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

const difficultyClass = {
  Easy: 'difficulty-easy',
  Medium: 'difficulty-medium',
  Hard: 'difficulty-hard',
};

function RecipeDetails({ recipe }) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="recipe-card">
      <div className="recipe-image-wrap">
        <img src={recipe.image} alt={recipe.name} loading="lazy" />
        <div className="recipe-image-overlay" />
        <div className="recipe-rating">
          <span className="star">★</span>
          {recipe.rating?.toFixed(1)}
        </div>
        {recipe.cuisine && (
          <span className="recipe-cuisine">{recipe.cuisine}</span>
        )}
      </div>

      <div className="recipe-body">
        <h3 className="recipe-name">{recipe.name}</h3>

        {recipe.tags?.length > 0 && (
          <div className="recipe-tags">
            {recipe.mealType?.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
            {recipe.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="recipe-stats">
          <div className="stat-item">
            <span className="stat-value">{totalTime}m</span>
            <span className="stat-label">Total Time</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{recipe.caloriesPerServing}</span>
            <span className="stat-label">Calories</span>
          </div>
          <div className="stat-item">
            <span
              className={`stat-value ${difficultyClass[recipe.difficulty] || ''}`}
            >
              {recipe.difficulty}
            </span>
            <span className="stat-label">Difficulty</span>
          </div>
        </div>

        <div className="accordion-section">
          <button
            className="accordion-toggle"
            onClick={() => setShowIngredients((v) => !v)}
          >
            Ingredients ({recipe.ingredients.length})
            <span className={`accordion-icon ${showIngredients ? 'open' : ''}`}>
              +
            </span>
          </button>
          <div className={`accordion-content ${showIngredients ? 'open' : ''}`}>
            <Ingredients recipe={recipe} />
          </div>
        </div>

        <div className="accordion-section">
          <button
            className="accordion-toggle"
            onClick={() => setShowInstructions((v) => !v)}
          >
            Instructions ({recipe.instructions.length})
            <span
              className={`accordion-icon ${showInstructions ? 'open' : ''}`}
            >
              +
            </span>
          </button>
          <div
            className={`accordion-content ${showInstructions ? 'open' : ''}`}
          >
            <Instructions recipe={recipe} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
