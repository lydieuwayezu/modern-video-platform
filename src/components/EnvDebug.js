import React from 'react';

function EnvDebug() {
  const apiKey = process.env.REACT_APP_RAPID_API_KEY;
  
  return (
    <div style={{ 
      background: '#ff4444', 
      color: 'white', 
      padding: '10px', 
      margin: '10px',
      borderRadius: '5px'
    }}>
      <h3>🔧 DEBUG INFO (Remove after fixing)</h3>
      <p><strong>API Key Status:</strong> {apiKey ? '✅ Found' : '❌ Missing'}</p>
      <p><strong>Key Length:</strong> {apiKey ? apiKey.length : 0} characters</p>
      <p><strong>First 10 chars:</strong> {apiKey ? apiKey.substring(0, 10) + '...' : 'N/A'}</p>
      <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
    </div>
  );
}

export default EnvDebug;