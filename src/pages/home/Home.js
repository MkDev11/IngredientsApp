import { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList';
// import { useFetch } from '../../hooks/useFetch';
import { projectFirestore } from '../../firebase/config';

import './Home.css';

export default function Home() {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);

    // const { data, isPending, error } = useFetch('http://localhost:3000/recipes');

    useEffect(() => {
        // start fetching of data
        setIsPending(true);

        const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
            // is collection empty?
            if (snapshot.empty) {
                setError('No recipes to load');
                setIsPending(false);
            } else {
                let results = [];
                snapshot.docs.forEach((doc) => {
                    // create new object with data and id
                    results.push({ id: doc.id, ...doc.data() });
                })
                // set results to new array
                setData(results);
                setIsPending(false);
            }
        }, (err) => {
            setError(err.message);
            setIsPending(false);
        })

        return () => unsub();

    }, []);

    return (
        <div className="home">
            {error && <p className="error">
                {error}
            </p>}
            {isPending && <p className="loading">
                Loading...
            </p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}
