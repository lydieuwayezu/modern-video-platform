import React, { useState } from 'react';

function ApiKeyTest() {
  const [result, setResult] = useState('Click to test API');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    const apiKey = process.env.REACT_APP_RAPID_API_KEY;
    
    if (!apiKey) {
      setResult('❌ No API key found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://youtube-v31.p.rapidapi.com/search?part=snippet&q=test&maxResults=1', {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setResult(`✅ API Works! Found ${data.items?.length || 0} items`);
      } else {
        setResult(`❌ API Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      setResult(`❌ Network Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      background: '#333', 
      color: 'white', 
      padding: '15px', 
      margin: '10px',
      borderRadius: '5px'
    }}>
      <h3>🧪 API Test</h3>
      <button 
        onClick={testAPI} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          background: '#ff0000', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Test API Key'}
      </button>
      <p style={{ marginTop: '10px' }}><strong>Result:</strong> {result}</p>
    </div>
  );
}

export default ApiKeyTest;