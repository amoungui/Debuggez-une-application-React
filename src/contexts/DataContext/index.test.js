// Importation des fonctions 'render' et 'screen' depuis la bibliothèque '@testing-library/react'
import { render, screen } from "@testing-library/react";

// Importation de l'API, du fournisseur de données et du hook d'utilisation des données depuis le contexte de données
import { api, DataProvider, useData } from "./index";

// Début de la description des tests pour le contexte de données
describe("When a data context is created", () => {

  // Test spécifique pour vérifier qu'un appel est exécuté sur le fichier events.json
  it("a call is executed on the events.json file", async () => {

    // Création d'une fonction mock pour l'API de chargement des données qui renvoie un résultat spécifique
    api.loadData = jest.fn().mockReturnValue({ result: "ok" });

    // Définition d'un composant qui utilise le hook d'utilisation des données et affiche le résultat
    const Component = () => {
      const { data } = useData();
      return <div>{data?.result}</div>;
    };

    // Rendu du composant à l'intérieur du fournisseur de données
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );

    // Attente de l'affichage du texte "ok"
    const dataDisplayed = await screen.findByText("ok");

    // Vérification que le texte "ok" est présent dans le document
    expect(dataDisplayed).toBeInTheDocument();
  });

  // Sous-groupe de tests pour le cas où l'appel aux événements échoue
  describe("and the events call failed", () => {

    // Test spécifique pour vérifier que l'erreur est dispatchée
    it("the error is dispatched", async () => {

      // Création d'une fonction mock pour console.error
      window.console.error = jest.fn();

      // Création d'une fonction mock pour l'API de chargement des données qui rejette la promesse
      api.loadData = jest.fn().mockRejectedValue("error on calling events");

      // Définition d'un composant qui utilise le hook d'utilisation des données et affiche l'erreur
      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };

      // Rendu du composant à l'intérieur du fournisseur de données
      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      // Attente de l'affichage du texte "error on calling events"
      const dataDisplayed = await screen.findByText("error on calling events");

      // Vérification que le texte "error on calling events" est présent dans le document
      expect(dataDisplayed).toBeInTheDocument();
    });
  });

  // Test spécifique pour vérifier que l'API de chargement des données est appelée
  it("api.loadData", () => {

    // Création d'une fonction mock pour console.error
    window.console.error = jest.fn();

    // Création d'une fonction mock pour fetch qui renvoie une promesse résolue avec un taux de change spécifique
    global.fetch = jest.fn().mockResolvedValue(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
      })
    );

    // Définition d'un composant qui utilise le hook d'utilisation des données et affiche l'erreur
    const Component = () => {
      const { error } = useData();
      return <div>{error}</div>;
    };

    // Rendu du composant à l'intérieur du fournisseur de données
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
  });
});
