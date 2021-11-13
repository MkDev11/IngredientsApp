import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';

import './Create.css';
import { useTheme } from '../../hooks/useTheme';

export default function Create() {

    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const ingredientInput = useRef(null);   // focus method in handleAdd
    const navigate = useNavigate();

    // const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const doc = { title, ingredients, method, cookingTime: cookingTime + 'min' }

        try {
            await projectFirestore.collection('recipes').add(doc);
            navigate('/');
        } catch (err) {

        }
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const ing = newIngredient.trim();

        // check if ingredient input is not null and is unique
        if (ing && !ingredients.includes(ing)) {
            {/* add to array */ }
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
        setNewIngredient(' ');
        ingredientInput.current.focus();
    }

    const { mode, color } = useTheme();

    return (
        <div className="create">
            <h2 className={`page-title ${mode}`}>Add New Recipe</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <span className={`form-label ${mode}`}>Recipe Title:</span>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>
                <label>
                    <span className={`form-label ${mode}`}>Ingredients:</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                        <button
                            onClick={handleAdd}
                            className="btn"
                            style={{ background: color }}>
                            Add
                        </button>
                    </div>
                </label>
                {ingredients.length > 0 && <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>}
                <label>
                    <span className={`form-label ${mode}`}>Recipe Method:</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>
                <label>
                    <span className={`form-label ${mode}`}>Cooking Time (minutes):</span>
                    <input
                        type="number"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>

                <button style={{ background: color }} className="button">Submit</button>
            </form>
        </div>
    )
}
