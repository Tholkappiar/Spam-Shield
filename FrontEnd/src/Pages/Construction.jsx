import React from 'react';

function Construction() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // This sets the container to fill the viewport height
    textAlign: 'center',
  };

  const messageStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div>
        <p style={messageStyle}>Form has been Submitted!</p>
      </div>
    </div>
  );
}

export default Construction;
