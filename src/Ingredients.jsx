function Ingredients({ recipe }) {
  return (
    <ul className="ingredients-list">
      {recipe.ingredients.map((ingredient) => (
        <li key={ingredient}>{ingredient}</li>
      ))}
    </ul>
  );
}

export default Ingredients;
