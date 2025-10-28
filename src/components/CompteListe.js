import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config.js';

function CompteListe() {
  // Déclaration d'un état pour stocker les comptes
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilisation de useEffect pour effectuer un appel à l'API dès le chargement
  useEffect(() => {
    fetchComptes();
  }, []); // Le tableau vide indique que l'effet s'exécute uniquement au montage du composant

  const fetchComptes = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/comptes`)
      .then(response => {
        setComptes(response.data); // Mise à jour de l'état avec les données récupérées
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError('Erreur lors du chargement des comptes');
        setLoading(false);
      });
  };

  const formatSolde = (solde) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(solde);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="compte-liste-container">
      <h2>Liste des Comptes</h2>
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: '#667eea' }}>Chargement...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: '#f44336' }}>{error}</p>
      ) : comptes.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Aucun compte disponible</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Solde</th>
                <th>Date de Création</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {comptes.map(compte => (
                <tr key={compte.id}>
                  <td>#{compte.id}</td>
                  <td>{formatSolde(compte.solde)}</td>
                  <td>{formatDate(compte.dateCreation)}</td>
                  <td>
                    <span className={`type-badge ${compte.type === 'COURANT' ? 'type-courant' : 'type-epargne'}`}>
                      {compte.type === 'COURANT' ? 'Courant' : 'Épargne'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CompteListe;