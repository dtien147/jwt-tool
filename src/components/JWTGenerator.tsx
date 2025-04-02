import React, { useState } from 'react';
import jwtEncode from 'jwt-encode';

const JWTGenerator: React.FC = () => {
  const [payload, setPayload] = useState('{\n  "user": "john_doe",\n  "role": "admin"\n}');
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    try {
      const parsedHeader = JSON.parse(header);
      const parsedPayload = JSON.parse(payload);
      const token = jwtEncode(parsedPayload, secret, parsedHeader);
      setToken(token);
      setError(null);
    } catch (e) {
      setToken('');
      setError('Invalid JSON in header or payload');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Generate JWT Token</h2>

      <label className="block font-semibold mt-2 mb-1">Header (JSON)</label>
      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        value={header}
        onChange={(e) => setHeader(e.target.value)}
      />

      <label className="block font-semibold mt-4 mb-1">Payload (JSON)</label>
      <textarea
        className="w-full border p-2 rounded"
        rows={5}
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
      />

      <label className="block font-semibold mt-4 mb-1">Secret</label>
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Your secret..."
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />

      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded" onClick={handleGenerate}>
        Generate Token
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {token && (
        <>
          <h3 className="mt-6 font-semibold">Generated Token</h3>
          <textarea className="w-full border p-2 rounded bg-gray-100" readOnly>{token}</textarea>
        </>
      )}
    </div>
  );
};

export default JWTGenerator;
