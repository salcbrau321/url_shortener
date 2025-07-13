import React, { useState } from 'react';
import LinkForm from './components/LinkForm';
import LinkList from './components/LinkList';

const App: React.FC = () => {
  const [lastCode, setLastCode] = useState<string>('');

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h1>LinkVault</h1>
      <LinkForm onCreated={setLastCode} />
      {lastCode && (
        <p>
          Your code:{' '}
          <a
            href={`${import.meta.env.VITE_API_URL}/${lastCode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {lastCode}
          </a>
        </p>
      )}
      <hr />
      <LinkList />
    </div>
  );
};

export default App;
