function Recipe({recipe}) {
    return (
        <div className="cards">
            <img src={recipe.image} alt={recipe.label} />
            <h2>{recipe.label}</h2>
            <p>{recipe.cuisineType}</p>
            <ul>
                <li>{recipe.healthLabels[0]}</li>
                <li>{recipe.healthLabels[1]}</li>
                <li>{recipe.healthLabels[2]}</li>
                <li>{recipe.healthLabels[3]}</li>
            </ul>
        </div>
    );
}

export default Recipe; 