import React, { useState } from 'react';
import Navbar from './components/Navbar'
import AppRoutes from './routes/routes'

function App() {
  const [paddingTop, setPaddingTop] = useState(0);

  // Callback function to receive the height of the navbar
  const handleNavbarHeightChange = (height) => {
    setPaddingTop(height);
  };

  return (
    <div className="App">
      <Navbar onHeightChange={handleNavbarHeightChange} />
      <AppRoutes paddingTop={paddingTop} />
    </div>
  );
}

export default App;
