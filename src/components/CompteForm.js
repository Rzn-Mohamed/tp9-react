import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config.js';

function CompteForm() {
  // Initialisation de l'état pour stocker les données du formulaire
  const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: 'COURANT' });

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    console.log('Envoi des données:', compte);
    console.log('URL API:', `${API_BASE_URL}/comptes`);
    
    axios.post(`${API_BASE_URL}/comptes`, compte) // Envoie une requête POST avec les données
      .then(response => {
        console.log('Réponse du serveur:', response.data);
        alert('Compte ajouté avec succès!');
        // Réinitialise le formulaire
        setCompte({ solde: '', dateCreation: '', type: 'COURANT' });
        // Recharge la page pour afficher le nouveau compte
        window.location.reload();
      })
      .catch(error => {
        console.error('Erreur complète:', error);
        console.error('Réponse du serveur:', error.response?.data);
        console.error('Status:', error.response?.status);
        console.error('Message:', error.message);
        
        let errorMessage = 'Erreur lors de l\'ajout du compte';
        if (error.response) {
          // Le serveur a répondu avec un code d'erreur
          errorMessage += `\nStatus: ${error.response.status}`;
          if (error.response.data?.message) {
            errorMessage += `\nMessage: ${error.response.data.message}`;
          }
        } else if (error.request) {
          // La requête a été envoyée mais pas de réponse
          errorMessage += '\nLe serveur ne répond pas. Vérifiez que le backend est démarré.';
        } else {
          // Erreur lors de la configuration de la requête
          errorMessage += `\n${error.message}`;
        }
        alert(errorMessage);
      });
  };

  return (
    <div className="compte-form-container">
      <h2>Ajouter un Compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Solde (€)</label>
          <input 
            type="number" 
            name="solde" 
            className="form-control" 
            onChange={handleChange}
            value={compte.solde}
            placeholder="Entrez le solde initial"
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Date de Création</label>
          <input 
            type="date" 
            name="dateCreation" 
            className="form-control" 
            onChange={handleChange}
            value={compte.dateCreation}
            required
          />
        </div>
        <div className="form-group">
          <label>Type de Compte</label>
          <select 
            name="type" 
            className="form-select" 
            onChange={handleChange}
            value={compte.type}
          >
            <option value="COURANT">Compte Courant</option>
            <option value="EPARGNE">Compte Épargne</option>
          </select>
        </div>
        <button type="submit" className="btn-primary">Ajouter le Compte</button>
      </form>
    </div>
  );
}

export default CompteForm;