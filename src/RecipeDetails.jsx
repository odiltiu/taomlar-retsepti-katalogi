import { useState } from 'react';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

const DIFFICULTY_LABEL = { Easy: 'Oson', Medium: "O'rtacha", Hard: 'Qiyin' };

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

        {/* Tuzatildi: mealType va tags'da bir xil so'z bo'lsa kalitlar to'qnashardi */}
        {(recipe.mealType?.length > 0 || recipe.tags?.length > 0) && (
          <div className="recipe-tags">
            {[...new Set([...(recipe.mealType || []), ...(recipe.tags || []).slice(0, 3)])].map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="recipe-stats">
          <div className="stat-item">
            <span className="stat-value">{totalTime} daq</span>
            <span className="stat-label">Umumiy vaqt</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{recipe.caloriesPerServing}</span>
            <span className="stat-label">Kaloriya</span>
          </div>
          <div className="stat-item">
            <span
              className={`stat-value ${difficultyClass[recipe.difficulty] || ''}`}
            >
              {DIFFICULTY_LABEL[recipe.difficulty] || recipe.difficulty}
            </span>
            <span className="stat-label">Qiyinligi</span>
          </div>
        </div>

        <div className="accordion-section">
          <button
            type="button"
            className="accordion-toggle"
            onClick={() => setShowIngredients((v) => !v)}
            aria-expanded={showIngredients}
            aria-controls={`ingredients-${recipe.id}`}
          >
            Masalliqlar ({recipe.ingredients.length})
            <span aria-hidden="true" className={`accordion-icon ${showIngredients ? 'open' : ''}`}>
              +
            </span>
          </button>
          <div id={`ingredients-${recipe.id}`} className={`accordion-content ${showIngredients ? 'open' : ''}`} inert={!showIngredients}>
            <div className="accordion-inner"><Ingredients recipe={recipe} /></div>
          </div>
        </div>

        <div className="accordion-section">
          <button
            type="button"
            className="accordion-toggle"
            onClick={() => setShowInstructions((v) => !v)}
            aria-expanded={showInstructions}
            aria-controls={`instructions-${recipe.id}`}
          >
            Tayyorlanishi ({recipe.instructions.length})
            <span
              aria-hidden="true"
              className={`accordion-icon ${showInstructions ? 'open' : ''}`}
            >
              +
            </span>
          </button>
          <div
            id={`instructions-${recipe.id}`}
            className={`accordion-content ${showInstructions ? 'open' : ''}`}
            inert={!showInstructions}
          >
            <div className="accordion-inner"><Instructions recipe={recipe} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
