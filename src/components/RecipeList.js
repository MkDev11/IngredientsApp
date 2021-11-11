import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

//styles
import './RecipeList.css';

export default function RecipeList({ recipes }) {

    const { color, fontSize, mode } = useTheme();

    if (recipes.length === 0) {
        return <div className="error">No results found</div>
    }

    return (

        <div className="recipe-list">
            {recipes.map((recipe) => (
                <div key={recipe.id} className={`card ${mode}`}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make.</p>
                    <div style={{ fontSize: fontSize }}>{recipe.method.substring(0, 100)}...</div>         {/* output first 100 chars of method */}
                    <Link style={{ background: color, color: '#fff' }} to={`/recipes/${recipe.id}`}>Cook this</Link>     {/* link to recipe details page with id param */}
                </div>
            ))}
        </div>
    )
}
