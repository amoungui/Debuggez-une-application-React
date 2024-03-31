// Importation des fonctions 'render' et 'screen' depuis la bibliothèque '@testing-library/react'
import { render, screen } from "@testing-library/react";

// Importation du composant 'ServiceCard' depuis le répertoire courant
import ServiceCard from "./index";

// Début du bloc describe des tests pour le composant 'ServiceCard'
describe("When a service card is created", () => {

  // Test spécifique pour vérifier qu'une image est affichée avec une valeur alt
  it("an image is display with alt value", () => {

    // Rendu de la carte de service avec une source d'image, une valeur alt et un enfant spécifiques
    render(
      <ServiceCard imageSrc="http://src-image" imageAlt="image-alt-text">{" "}</ServiceCard>
    );

    // Récupération de l'élément image par son testId
    const imageElement = screen.getByTestId("card-image-testid");

    // Vérification que l'élément image est présent dans le document
    expect(imageElement).toBeInTheDocument();

    // Vérification que l'attribut alt de l'élément image est égal à "image-alt-text"
    expect(imageElement.alt).toEqual("image-alt-text");
  });

  // Test spécifique pour vérifier qu'un contenu est affiché
  it("a content is displayed", () => {

    // Rendu de la carte de service avec une source d'image, une valeur alt et un contenu spécifiques
    render(
      <ServiceCard imageSrc="http://src-image" imageAlt="image-alt-text">
        This is the card content
      </ServiceCard>
    );

    // Récupération de l'élément de contenu par son texte
    const contentElement = screen.getByText(/This is the card content/);

    // Vérification que l'élément de contenu est présent dans le document
    expect(contentElement).toBeInTheDocument();
  });
});
