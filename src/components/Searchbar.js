import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Searchbar.css'

export default function Searchbar() {

    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // redirect to Search page with query parameter ?q=
        navigate(`/search/?q=${term}`);
    }

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">
                    🔍
                </label>
                <input
                    type="text"
                    id="search"
                    onChange={(e) => setTerm(e.target.value)}
                    required
                    placeholder="Search recipes..."
                />
            </form>

        </div>
    )
}
