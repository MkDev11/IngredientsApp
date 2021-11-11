import { useLocation } from 'react-router-dom';
import RecipeList from '../../components/RecipeList';
import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';
import './Search.css';

export default function Search() {

    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q');

    // query string with parameter
    const url = 'http://localhost:3000/recipes/?q=' + query;
    const { error, isPending, data } = useFetch(url);

    const { mode } = useTheme();

    return (
        <div>
            <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}
