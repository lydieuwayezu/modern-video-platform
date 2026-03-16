import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';

function ApiTest() {
  const [status, setStatus] = useState('Testing API...');

  useEffect(() => {
    const testAPI = async () => {
      try {
        const data = await fetchFromAPI('search?part=snippet&q=test&maxResults=1');
        if (data?.items?.length > 0) {
          setStatus('✅ API Working!');
        } else {
          setStatus('❌ API returned no data');
        }
      } catch (error) {
        setStatus(`❌ API Error: ${error.message}`);
      }
    };
    testAPI();
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '10px' }}>
      <h3>API Status: {status}</h3>
      <p>API Key: {process.env.REACT_APP_RAPID_API_KEY ? '✅ Found' : '❌ Missing'}</p>
    </div>
  );
}

export default ApiTest;