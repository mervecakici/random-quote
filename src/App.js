import React from 'react';
import MainComponent from "./Components/MainComponent"
import useScript from './hooks/useScript';

function App() {
  useScript('https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js')
  return (
   
      <MainComponent />
    
    
  );
}

export default App;
