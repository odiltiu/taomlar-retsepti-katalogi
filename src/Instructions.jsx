function Instructions({ recipe }) {
  return (
    <ol className="instructions-list">
      {recipe.instructions.map((instruction, index) => (
        <li key={index}>
          <span className="step-number">{index + 1}</span>
          {instruction}
        </li>
      ))}
    </ol>
  );
}

export default Instructions;
