import './App.css';
import { useState, useEffect } from 'react';
import Recipe from './components/Recipes';
import Search from './components/Search';
import {motion} from 'framer-motion';

function App() {

  const [originalRecipes, setOriginalRecipes] = useState([]);

  // Fetching API

  const [recipes, setRecipes] = useState([]); 
  const [searchfield, setSearchfield] = useState(''); 
  const [filtered] = useState([]);
  const [activeGenre, setActiveGenre] = useState("");  

  useEffect(() => {
    fetchRecipes(); 
  }, []);  

  const fetchRecipes = async () => {
    const data = await fetch('https://api.edamam.com/search?q=meat+vegetable+curry&app_id=61d57f5f&app_key=4663327bcd0c5041203e4b06fafa2b46&from=10');
    const recipes = await data.json();
    console.log(recipes);
    setRecipes(recipes.hits.map(hit => hit.recipe));
  }; 

  const onSearchChange = (event) => {
    setSearchfield(event.target.value); 
  }

  const filteredReceipts = recipes.filter(recipe => {
    return recipe.label.toLowerCase().includes(searchfield.toLowerCase()); 
  })

  const filter = [...filteredReceipts, ...filtered];

  return !recipes.length ?
    <h1 id="logo">Loading...</h1> :
  (
    <div className="App">
      <h1 className='logo'>FLAVORFINDER</h1>
      <Search searchChange = {onSearchChange} recipes={recipes} originalRecipes={originalRecipes} setOriginalRecipes={setOriginalRecipes} setRecipes={setRecipes} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
      <motion.div animate={{y:20}} className='recipes'>
        {filter.map(recipe => {
          return <Recipe key={recipe.uri} recipe = {recipe}/>
        })} 
      </motion.div>
    </div>
  );
}

export default App;
