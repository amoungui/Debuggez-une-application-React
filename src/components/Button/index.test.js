// Importation des fonctions 'fireEvent', 'render' et 'screen' depuis la bibliothèque '@testing-library/react'
import { fireEvent, render, screen } from "@testing-library/react";

// Importation du composant 'Button' et de l'objet 'BUTTON_TYPES' depuis le répertoire courant
import Button, { BUTTON_TYPES } from "./index";

// Début de la description des tests pour le composant 'Button'
describe("When a button is created", () => {

  // Test spécifique pour vérifier que le bouton inclut un titre
  it("the button must include a title", () => {

    // Rendu du bouton avec un titre et un type spécifiques
    render(<Button title="my-button" type={BUTTON_TYPES.DEFAULT} />);

    // Récupération de l'élément bouton par son titre
    const buttonElement = screen.getByTitle("my-button");

    // Vérification que l'élément bouton est présent dans le document
    expect(buttonElement).toBeInTheDocument();
  });

  // Test spécifique pour vérifier que le bouton affiche une étiquette
  it("the button must display a label", () => {

    // Rendu du bouton avec une étiquette spécifique
    render(<Button>label</Button>);

    // Récupération de l'élément bouton par son texte
    const buttonElement = screen.getByText(/label/);

    // Vérification que l'élément bouton est présent dans le document
    expect(buttonElement).toBeInTheDocument();
  });

  // Sous-groupe de tests pour le cas où le bouton est cliqué
  describe("and it's clicked", () => {

    // Test spécifique pour vérifier qu'un événement onClick est exécuté
    it("an event onClick it executed", () => {

      // Création d'une fonction mock pour l'événement onClick
      const onClick = jest.fn();

      // Rendu du bouton avec l'événement onClick spécifique
      render(<Button onClick={onClick} />);

      // Récupération de l'élément bouton par son testId
      const buttonElement = screen.getByTestId("button-test-id");

      // Déclenchement d'un événement de clic sur l'élément bouton
      fireEvent(
        buttonElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );

      // Vérification que l'événement onClick a été appelé au moins une fois
      expect(onClick.mock.calls.length).toBeGreaterThan(0);
    });
  });

  // Sous-groupe de tests pour le cas où le type sélectionné est 'submit'
  describe("and selected type is submit", () => {

    // Test spécifique pour vérifier qu'un input de type 'submit' est créé
    it("an input submit is created", () => {

      // Rendu du bouton avec un type et une étiquette spécifiques
      render(<Button type={BUTTON_TYPES.SUBMIT}>label</Button>);

      // Récupération de l'élément bouton par son testId
      const buttonElement = screen.getByTestId("button-test-id");

      // Vérification que le type de l'élément bouton est égal à 'submit'
      expect(buttonElement.type).toEqual("submit");
    });
  });
});
