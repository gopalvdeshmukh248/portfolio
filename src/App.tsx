import MainLayout from './components/layout/MainLayout';
import { createGlobalStyle } from 'styled-components';
import React from 'react';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #0a192f;
    overflow-x: hidden;
  }
`;

const App: React.FC = () => {
  return (
    <div className="app-container">
      <GlobalStyle />
      <MainLayout />
    </div>
  );
};

export default App;
