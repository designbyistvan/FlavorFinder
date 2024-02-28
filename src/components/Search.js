import React, { useEffect } from "react";

const Search = ({ searchChange, recipes, setRecipes, setActiveGenre, activeGenre, originalRecipes, setOriginalRecipes }) => {
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await fetch(
          "https://api.edamam.com/search?q=meat+vegetable+curry&app_id=61d57f5f&app_key=4663327bcd0c5041203e4b06fafa2b46&from=10"
        );
        if (!data.ok) {
          throw new Error('Network response was not ok');
        }
        const recipesData = await data.json();
        const hits = recipesData.hits.map((hit) => hit.recipe);
        console.log("Fetched recipes:", hits); // Log fetched recipes for debugging
        setRecipes(hits);
        setOriginalRecipes(hits); // Update original recipes when new data is fetched
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes(); 
  }, [setRecipes, setOriginalRecipes]); // Include setRecipes and setOriginalRecipes in the dependency array

  useEffect(() => {
    if (activeGenre === "") {
      setRecipes(originalRecipes);
    } else {
      const filtered = originalRecipes.filter((recipe) =>
        recipe.healthLabels.includes(activeGenre)
      );
      setRecipes(filtered);
    }
  }, [activeGenre, originalRecipes, setRecipes]);

  return (
    <div className="search">
      <div className="input">
        <input
          type="search"
          placeholder="🔍 Search recipes"
          onChange={searchChange}
        />
      </div>
      <div className="filterContainer">
        <button className={activeGenre === "" ? 'active' : ''} onClick={() => setActiveGenre("")}>All</button>
        <button className={activeGenre === "Dairy-Free" ? 'active' : ''} onClick={() => setActiveGenre("Dairy-Free")}>Dairy-Free</button>
        <button className={activeGenre === "Egg-Free" ? 'active' : ''} onClick={() => setActiveGenre("Egg-Free")}>Egg-Free</button>
        <button className={activeGenre === "Gluten-Free" ? 'active' : ''} onClick={() => setActiveGenre("Gluten-Free")}>Gluten-Free</button>
        <button className={activeGenre === "Sugar-Conscious" ? 'active' : ''} onClick={() => setActiveGenre("Sugar-Conscious")}>
          Sugar-Conscious
        </button>
      </div>
    </div>
  );
};

export default Search;