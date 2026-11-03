import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import RecipeDetails from './RecipeDetails';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('all');
  const controllerRef = useRef(null);

  // Yuklash holati boshlang'ich qiymatda true; qayta urinishda retry() o'rnatadi
  const fetchRecipes = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      // limit=0 — barcha retseptlar
      const response = await fetch('https://dummyjson.com/recipes?limit=0', { signal: controller.signal });
      if (!response.ok) throw new Error(`Server xatosi: ${response.status}`);
      const data = await response.json();
      setRecipes(data.recipes);
      setIsLoading(false);
    } catch (err) {
      if (err.name === 'AbortError') return;
      // Tuzatildi: oldin xatolikda isLoading true qolib, spinner abadiy aylanardi
      setError(err.message || "Retseptlarni yuklab bo'lmadi");
      setIsLoading(false);
    }
  }, []);

  const retry = () => {
    setIsLoading(true);
    setError(null);
    fetchRecipes();
  };

  useEffect(() => {
    fetchRecipes();
    return () => controllerRef.current?.abort();
  }, [fetchRecipes]);

  const cuisines = useMemo(() => [...new Set(recipes.map((r) => r.cuisine).filter(Boolean))].sort(), [recipes]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      const matchCuisine = cuisine === 'all' || r.cuisine === cuisine;
      const matchQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q)) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchCuisine && matchQuery;
    });
  }, [recipes, query, cuisine]);

  return (
    <>
      {/* Tuzatildi: sarlavhada sinov uchun qolgan onClick bor edi — bosilganda retseptlar yo'qolib spinner chiqardi */}
      <header className="app-header">
        <h1>
          Recipe<span>Book</span>
        </h1>
        <p>Dunyo oshxonalaridan mazali taomlar retseptlari</p>
      </header>

      {isLoading ? (
        <div className="loading-wrap" role="status" aria-label="Yuklanmoqda">
          <div className="loading-spinner"></div>
        </div>
      ) : error ? (
        <div className="error-box" role="alert">
          <p>Retseptlarni yuklab bo'lmadi: {error}</p>
          <button type="button" onClick={retry}>
            Qayta urinish
          </button>
        </div>
      ) : (
        <>
          <div className="filters">
            <label className="sr-only" htmlFor="recipe-search">Retsept qidirish</label>
            <input
              id="recipe-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Taom nomi yoki masalliq (masalan: chicken)..."
            />
            <label className="sr-only" htmlFor="recipe-cuisine">Oshxona</label>
            <select id="recipe-cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
              <option value="all">Barcha oshxonalar</option>
              {cuisines.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <span className="result-count" aria-live="polite">{visible.length} ta retsept</span>
          </div>

          {visible.length === 0 ? (
            <p className="empty-note">Hech narsa topilmadi. Boshqa so'z bilan qidiring.</p>
          ) : (
            <div className="recipes-grid">
              {visible.map((recipe) => (
                <RecipeDetails key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
