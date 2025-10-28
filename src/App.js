import React from 'react';
import CompteListe from './components/CompteListe';
import CompteForm from './components/CompteForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestion des Comptes Bancaires</h1>
      </header>
      <main className="main-content">
        <CompteForm />
        <CompteListe />
      </main>
    </div>
  );
}

export default App;