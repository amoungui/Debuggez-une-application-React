import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

// Définition des données de test pour le slider
const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

// Début de la description des tests pour le composant 'Slider'
describe("When slider is created", () => {

  // Test spécifique pour vérifier qu'une liste de cartes est affichée
  it("a list card is displayed", async () => {

    // Création d'une fonction mock pour console.error pour éviter les erreurs non gérées
    window.console.error = jest.fn();

    // Création d'une fonction mock pour l'API de chargement des données qui renvoie les données de test
    api.loadData = jest.fn().mockReturnValue(data);

    // Rendu du composant 'Slider' à l'intérieur du fournisseur de données
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Attente de l'affichage du texte "World economic forum"
    await screen.findByText("World economic forum");

    // Recherche de tous les éléments avec le texte "janvier"
    const janvierElements = await screen.findAllByText("janvier");

    // Vérification qu'au moins un élément avec le texte "janvier" a été trouvé
    expect(janvierElements.length).toBeGreaterThan(0);

    // Attente de l'affichage du texte "Oeuvre à la coopération entre le secteur public et le privé."
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
});
