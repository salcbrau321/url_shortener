import React, { useState } from 'react';
import { shortenurl } from '../services/api';

interface Props {
    onCreated: (code: string) => void;
}

const LinkForm: React.FC<Props> = ({ onCreated }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const code = await shortenurl(url);
            onCreated(code);
            setUrl('');
        } catch {
            setError('Failed to shorten URL');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Shortenning...' : 'Shorten'}
            </button>
            { error && <div>{error}</div>}
        </form>
    );
};

export default LinkForm;