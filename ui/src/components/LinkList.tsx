import React, {useEffect, useState} from "react";
import { fetchLinks, type Link } from "../services/api";

const LinkList: React.FC = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchLinks()
          .then(setLinks)
          .catch(() => setError('Failed to load links'));
    }, []);

    if (error) return <div>{error}</div>;
    if (links.length === 0) return <div>No links yet.</div>

    return (
        <ul>
            {links.map(l => (
                <li key={l.id}>
                    <a
                      href={`${import.meta.env.VITE_API_URL}/${l.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                        {l.shortCode}   
                    </a>{' '}
                    - {l.originalUrl} ({new Date(l.createdAt).toLocaleString()})
                </li>
            ))}
        </ul>
    );
};

export default LinkList;