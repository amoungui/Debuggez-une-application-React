// Importation des fonctions 'render' et 'screen' depuis la bibliothèque '@testing-library/react'
import { render, screen } from "@testing-library/react";

// Importation du composant 'PeopleCard' depuis le répertoire courant
import PeopleCard from "./index";

// Début du bloc describe des tests pour le composant 'PeopleCard'
describe("When a people card is created", () => {

  // Test spécifique pour vérifier qu'une image est affichée avec une valeur alt
  it("an image is display with alt value", () => {

    // Rendu de la carte de personnes avec des props spécifiques
    render(
      <PeopleCard imageSrc="http://src-image" imageAlt="image-alt-text" 
      name="test name"
      position="test position" />
    );

    // Récupération de l'élément image par son testId
    const imageElement = screen.getByTestId("card-image-testid");

    // Vérification que l'élément image est présent dans le document
    expect(imageElement).toBeInTheDocument();

    // Vérification que l'attribut alt de l'élément image est égal à "image-alt-text"
    expect(imageElement.alt).toEqual("image-alt-text");
  });

  // Test spécifique pour vérifier qu'un titre et un mois sont affichés
  it("a title and a month are displayed", () => {

    // Rendu de la carte de personnes avec des props spécifiques
    render(
      <PeopleCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        name="test name"
        position="test position"
      />
    );

    // Récupération des éléments par leur texte
    const nameElement = screen.getByText(/test name/);
    const titleElement = screen.getByText(/test position/);

    // Vérification que les éléments sont présents dans le document
    expect(nameElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
});
