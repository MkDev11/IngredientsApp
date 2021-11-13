import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config';

import './Recipe.css';

export default function Recipe() {

    const { id } = useParams();
    // const url = 'http://localhost:3000/recipes/' + id;
    // const { error, isPending, data: recipe } = useFetch(url);
    const { fontSize, mode } = useTheme();

    const [recipe, setRecipe] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsPending(true);

        // ref to single document in recipes collection
        const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
            if (doc.exists) {
                setIsPending(false);
                setRecipe(doc.data());
            } else {
                setIsPending(false);
                setError('Could not find recipe');
            }
        })

        return () => unsub();

    }, [id])

    const handleClick = () => {
        projectFirestore.collection('recipes').doc(id).update({
            title: 'Greek Salad'
        })
    }

    return (
        <div className={`recipe ${mode}`}>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {recipe && (
                <>
                    <h2 className={`page-title ${mode}`}>{recipe.title}</h2>
                    <p className="cooking-time">Takes {recipe.cookingTime} to cook</p>
                    <ul>
                        {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                    </ul>
                    <p style={{ fontSize: fontSize }} className="method">{recipe.method}</p>
                    <button onClick={() => handleClick()}>Update</button>
                </>
            )}
        </div>
    )
}
