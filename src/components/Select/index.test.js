// Importation des fonctions 'fireEvent', 'render' et 'screen' depuis la bibliothèque '@testing-library/react'
import { fireEvent, render, screen } from "@testing-library/react";

// Importation du composant 'Select' depuis le répertoire courant
import Select from "./index";

// Début du block describe des tests pour le composant 'Select'
describe("When a select is created", () => {

  // Test spécifique pour vérifier qu'une liste de choix est affichée
  it("a list of choices is displayed", () => {

    // Rendu du composant 'Select' avec une sélection spécifique
    render(<Select selection={["value1", "value2"]} />);

    // Récupération de l'élément select par son testId
    const selectElement = screen.getByTestId("select-testid");

    // Récupération de l'élément select par son texte
    const selectDefault = screen.getByText("Toutes");

    // Vérification que l'élément select est présent dans le document
    expect(selectElement).toBeInTheDocument();

    // Vérification que l'élément select par défaut est présent dans le document
    expect(selectDefault).toBeInTheDocument();
  });

  // Test spécifique pour vérifier qu'un bouton d'action de repliement est affiché
  it("a collapse action button is displayed", () => {

    // Rendu du composant 'Select' avec une sélection spécifique
    render(<Select selection={["value1", "value2"]} />);

    // Récupération du bouton d'action de repliement par son testId
    const collapseButtonElement = screen.getByTestId("collapse-button-testid");

    // Vérification que le bouton d'action de repliement est présent dans le document
    expect(collapseButtonElement).toBeInTheDocument();
  });

  // Sous-groupe de tests pour le cas où une étiquette est définie
  describe("with a label", () => {

    // Test spécifique pour vérifier qu'une étiquette est affichée
    it("a label is displayed", () => {

      // Rendu du composant 'Select' avec une étiquette et une sélection spécifiques
      render(<Select label="label" selection={["value1", "value2"]} />);

      // Récupération de l'élément étiquette par son texte
      const labelDefault = screen.getByText("label");

      // Vérification que l'élément étiquette est présent dans le document
      expect(labelDefault).toBeInTheDocument();
    });
  });

  // Sous-groupe de tests pour le cas où un clic est déclenché sur le bouton de repliement
  describe("and a click is trigger on collapse button", () => {

    // Test spécifique pour vérifier qu'une liste de valeurs est affichée
    it("a list of values is displayed", () => {

      // Rendu du composant 'Select' avec une sélection spécifique
      render(<Select selection={["value1", "value2"]} />);

      // Récupération du bouton de repliement par son testId
      const collapseButtonElement = screen.getByTestId(
        "collapse-button-testid"
      );

      // Déclenchement d'un événement de clic sur le bouton de repliement
      fireEvent(
        collapseButtonElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );

      // Récupération des éléments de choix par leur texte
      const choice1 = screen.getByText("value1");
      const choice2 = screen.getByText("value2");

      // Vérification que les éléments de choix sont présents dans le document
      expect(choice1).toBeInTheDocument();
      expect(choice2).toBeInTheDocument();
    });

    // Sous-groupe de tests pour le cas où un clic est déclenché sur un élément de choix
    describe("and a click is triggered on a choice item", () => {

      // Test spécifique pour vérifier qu'un rappel onChange est appelé
      it("a onChange callback is called", () => {

        // Création d'une fonction mock pour l'événement onChange
        const onChange = jest.fn();

        // Rendu du composant 'Select' avec une sélection et un événement onChange spécifiques
        render(<Select selection={["value1", "value2"]} onChange={onChange} />);

        // Récupération du bouton de repliement par son testId
        const collapseButtonElement = screen.getByTestId(
          "collapse-button-testid"
        );

        // Déclenchement d'un événement de clic sur le bouton de repliement
        fireEvent(
          collapseButtonElement,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );

        // Récupération de l'élément de choix par son texte
        const choice1 = screen.getByText("value1");

        // Déclenchement d'un événement de clic sur l'élément de choix
        fireEvent(
          choice1,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );

        // Vérification que l'événement onChange a été appelé au moins une fois
        expect(onChange.mock.calls.length).toBeGreaterThan(0);

        // Déclenchement d'un deuxième événement de clic sur le bouton de repliement
        fireEvent(
          collapseButtonElement,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );

        // Récupération de l'élément de choix "Toutes" par son texte
        const choiceAll = screen.getByText("Toutes");

        // Déclenchement d'un événement de clic sur l'élément de choix "Toutes"
        fireEvent(
          choiceAll,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );

        // Vérification que l'événement onChange a été appelé plus d'une fois
        expect(onChange.mock.calls.length).toBeGreaterThan(1);
      });
    });
  });
});
