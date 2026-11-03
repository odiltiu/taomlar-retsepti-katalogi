import { useEffect, useState } from 'react';
import RecipeDetails from './RecipeDetails';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let controller = new AbortController();

    const fetchRecipes = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('https://dummyjson.com/recipes?limit=30', {
          signal: controller.signal,
        });

        const data = await response.json();

        setIsLoading(false);

        setRecipes(data.recipes);

      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');

        } else {
          console.error('Fetch error:', error);
        }
      } 
    };

    fetchRecipes();

    return () => {
      controller.abort();
    };

  }, []);

  return (
    <>
      <header className="app-header">
        <h1 onClick={() => setIsLoading(!isLoading)}>
          Recipe<span>Book</span>
        </h1>
        <p>Discover delicious meals from around the world</p>
      </header>

      {isLoading ? (
        <div className="loading-wrap">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <RecipeDetails key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
