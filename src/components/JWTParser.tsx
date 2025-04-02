import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const JWTParser: React.FC = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    try {
      const [encodedHeader, encodedPayload] = token.split('.');
      if (!encodedHeader || !encodedPayload) throw new Error('Malformed token');

      const decodedHeader = JSON.parse(atob(encodedHeader));
      const decodedPayload = jwtDecode(token); // jwtDecode only decodes payload

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError(null);
    } catch (e) {
      setHeader(null);
      setPayload(null);
      setError('Invalid JWT Token');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Parse JWT Token</h2>
      <textarea
        className="w-full border p-2 rounded"
        rows={4}
        placeholder="Paste JWT token here..."
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleParse}>
        Parse
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {header && (
        <>
          <h3 className="mt-4 font-semibold">Header</h3>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(header, null, 2)}</pre>
        </>
      )}

      {payload && (
        <>
          <h3 className="mt-4 font-semibold">Payload</h3>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(payload, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default JWTParser;
