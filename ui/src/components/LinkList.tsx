import React, { useEffect, useState } from 'react';
import { fetchLinks, type Link } from '../services/api';

interface Props {
  refreshCounter: number;
}

const LinkList: React.FC<Props> = ({ refreshCounter }) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    fetchLinks()
      .then(setLinks)
      .catch(() => setError('Could not load links'));
  }, [refreshCounter]);

  const copyToClipboard = async (code: string) => {
    await navigator.clipboard.writeText(
      `${import.meta.env.VITE_API_URL}/${code}`
    );
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (links.length === 0) return <p>No links yet.</p>;

  return (
    <table className="min-w-full bg-white divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
          <th className="px-4 py-2" />
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {links.map(l => (
          <tr key={l.id}>
            <td className="px-4 py-2 font-mono text-blue-600">
              <a
                href={`${import.meta.env.VITE_API_URL}/${l.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {l.shortCode}
              </a>
            </td>
            <td className="px-4 py-2 break-all">{l.originalUrl}</td>
            <td className="px-4 py-2 text-sm text-gray-500">
              {new Date(l.createdAt).toLocaleString()}
            </td>
            <td className="px-4 py-2">
              <button
                onClick={() => copyToClipboard(l.shortCode)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Copy
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinkList;
