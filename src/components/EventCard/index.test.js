// Importation des fonctions 'render' et 'screen' depuis la bibliothèque '@testing-library/react'
import { render, screen } from "@testing-library/react";

// Importation du composant 'EventCard' depuis le répertoire courant
import EventCard from "./index";

// Début de la description des tests pour le composant 'EventCard'
describe("When a event card is created", () => {

  // Test spécifique pour vérifier qu'une image est affichée avec une valeur alt
  it("an image is display with alt value", () => {

    // Rendu de l'EventCard avec des props spécifiques
    render(<EventCard imageSrc="http://src-image" imageAlt="image-alt-text" date={new Date("2022-04-01")} 
    title="test event"
    
    label="test label"
    />);

    // Récupération de l'élément image par son testId
    const imageElement = screen.getByTestId("card-image-testid");

    // Vérification que l'élément image est présent dans le document
    expect(imageElement).toBeInTheDocument();

    // Vérification que l'attribut alt de l'élément image est égal à "image-alt-text"
    expect(imageElement.alt).toEqual("image-alt-text");
  });

  // Test spécifique pour vérifier qu'un titre, une étiquette et un mois sont affichés
  it("a title, a label and a month are displayed", () => {

    // Création d'une date spécifique
    const date = new Date("2022-02-01");

    // Rendu de l'EventCard avec des props spécifiques
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        title="test event"
        label="test label"
        date={date}
      />
    );

    // Récupération des éléments par leur texte
    const titleElement = screen.getByText(/test event/);
    const monthElement = screen.getByText(/février/); // Change this to the month you expect
    const labelElement = screen.getByText(/test label/);

    // Vérification que les éléments sont présents dans le document
    expect(titleElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(monthElement).toBeInTheDocument();
  });

  // Sous-groupe de tests pour le cas où une carte d'événement est créée avec la prop 'small'
  describe("with small props", () => {

    // Test spécifique pour vérifier qu'un modificateur 'small' est ajouté
    it("a modifier small is added", () => {

      // Rendu de l'EventCard avec des props spécifiques, y compris 'small'
      render(
        <EventCard
          imageSrc="http://src-image"
          imageAlt="image-alt-text"
          title="test event"
          label="test label"
          date={new Date("2022-04-01")}
          small
        />
      );

      // Récupération de l'élément carte par son testId
      const cardElement = screen.getByTestId("card-testid");

      // Vérification que le nom de classe de l'élément carte contient "EventCard--small"
      expect(cardElement.className.includes("EventCard--small")).toEqual(true);
    });
  });
});
