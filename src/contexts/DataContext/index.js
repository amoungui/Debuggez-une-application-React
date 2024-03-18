// Importation des modules nécessaires
import PropTypes from "prop-types";
import {
  createContext, // Utilisé pour créer un nouveau contexte
  useCallback, // Utilisé pour mémoriser une fonction
  useContext, // Utilisé pour accéder au contexte actuel
  useEffect, // Utilisé pour exécuter des effets secondaires dans les composants fonctionnels
  useState, // Utilisé pour ajouter un état local à un composant fonctionnel
} from "react";

// Création d'un nouveau contexte
const DataContext = createContext({});

// Définition de l'API pour charger les données
export const api = {
  loadData: async () => {
    // Récupération des données depuis une URL
    const response = await fetch(`${process.env.PUBLIC_URL}/events.json`);
    // Conversion de la réponse en JSON
    const data = await response.json();
    // eslint-disable-next-line no-console
    // console.log('data load: ', data)  
    // Retour des données
    return data;
  },
};

// Création d'un fournisseur de données
export const DataProvider = ({ children }) => {
  // Initialisation de l'état pour les données et les erreurs
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Création d'une fonction pour récupérer les données
  const getData = useCallback(async () => {
    try {
      // Tentative de chargement des données
      setData(await api.loadData());
    } catch (err) {
      // En cas d'erreur, celle-ci est enregistrée
      setError(err);
    }
  }, []);

  // Utilisation de useEffect pour charger les données au montage du composant
  useEffect(() => {
    if (data) return;
    getData();
  });

  // Rendu du fournisseur de contexte avec les données et les erreurs comme valeur
  return (
    <DataContext.Provider
    // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Définition des propTypes pour le fournisseur de données
DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Création d'un hook personnalisé pour utiliser le contexte de données
export const useData = () => useContext(DataContext);

// Exportation du contexte de données
export default DataContext;
