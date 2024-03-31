// Importation des fonctions 'fireEvent', 'render' et 'screen' depuis la bibliothèque '@testing-library/react'
import { fireEvent, render, screen } from "@testing-library/react";

// Importation du composant 'Field' et de l'objet 'FIELD_TYPES' depuis le répertoire courant
import Field, { FIELD_TYPES } from "./index";

// Début de la description des tests pour le composant 'Field'
describe("When a field is created", () => {

  // Test spécifique pour vérifier qu'un nom est défini sur le champ
  it("a name is set on the field", () => {

    // Rendu du champ avec un nom spécifique
    render(<Field name="field-name" />);

    // Récupération de l'élément champ par son testId
    const fieldElement = screen.getByTestId("field-testid");

    // Vérification que l'élément champ est présent dans le document
    expect(fieldElement).toBeInTheDocument();

    // Vérification que le nom de l'élément champ est égal à "field-name"
    expect(fieldElement.name).toEqual("field-name");
  });

  // Test spécifique pour vérifier qu'un placeholder est défini sur le champ
  it("a placeholder is set on the field", () => {

    // Rendu du champ avec un placeholder et un nom spécifiques
    render(<Field placeholder="field-placeholder" name="test" />);

    // Récupération de l'élément champ par son testId
    const fieldElement = screen.getByTestId("field-testid");

    // Vérification que le placeholder de l'élément champ est égal à "field-placeholder"
    expect(fieldElement.placeholder).toEqual("field-placeholder");
  });

  // Test spécifique pour vérifier qu'une étiquette est définie avec le champ
  it("a label is set with field", () => {

    // Rendu du champ avec un placeholder, une étiquette et un nom spécifiques
    render(<Field placeholder="field-placeholder" label="field_label" name="test" />);

    // Récupération de l'élément étiquette par son texte
    const labelElement = screen.getByText(/field_label/);

    // Vérification que l'élément étiquette est présent dans le document
    expect(labelElement).toBeInTheDocument();
  });

  // Sous-groupe de tests pour le cas où la valeur du champ est modifiée
  describe("and its valued changed", () => {

    // Test spécifique pour vérifier qu'une valeur onChange est exécutée
    it("a onChange value is executed", () => {

      // Création d'une fonction mock pour l'événement onChange
      const onChange = jest.fn();

      // Rendu du champ avec l'événement onChange spécifique et un nom spécifique
      render(<Field onChange={onChange} name="test" />);

      // Récupération de l'élément champ par son testId
      const fieldElement = screen.getByTestId("field-testid");

      // Déclenchement d'un événement de clic sur l'élément champ
      fireEvent(
        fieldElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    });
  });

  // Sous-groupe de tests pour le cas où son type est défini sur FIELD_TYPES.INPUT_TEXT
  describe("and its type is set to FIELD_TYPES.INPUT_TEXT", () => {

    // Test spécifique pour vérifier qu'un input de type texte est rendu
    it("a text input is rendered", () => {

      // Création d'une fonction mock pour console.error pour désactiver les avertissements de propTypes
      window.console.error = jest.fn().mockImplementation(() => null);

      // Rendu du champ avec un type et un nom spécifiques
      render(<Field type={FIELD_TYPES.INPUT_TEXT} name="test" />);

      // Récupération de l'élément champ par son testId
      const fieldElement = screen.getByTestId("field-testid");

      // Vérification que le type de l'élément champ est égal à "text"
      expect(fieldElement.type).toEqual("text");
    });
  });

  // Sous-groupe de tests pour le cas où son type est défini sur FIELD_TYPES.TEXTAREA
  describe("and its type is set to FIELD_TYPES.TEXTAREA", () => {

    // Test spécifique pour vérifier qu'une textarea est rendue
    it("a textarea is rendered", () => {

      // Création d'une fonction mock pour console.error pour désactiver les avertissements de propTypes
      window.console.error = jest.fn().mockImplementation(() => null);

      // Rendu du champ avec un type et un nom spécifiques
      render(<Field type={FIELD_TYPES.TEXTAREA} name="test" />);

      // Récupération de l'élément champ par son testId
      const fieldElement = screen.getByTestId("field-testid");

      // Vérification que le type de l'élément champ est égal à "textarea"
      expect(fieldElement.type).toEqual("textarea");
    });
  });

  // Sous-groupe de tests pour le cas où son type est défini sur une valeur incorrecte
  describe("and its type is set to a wrong value", () => {

    // Test spécifique pour vérifier qu'un input de type texte est rendu
    it("a text input is rendered", () => {

      // Création d'une fonction mock pour console.error pour désactiver les avertissements de propTypes
      window.console.error = jest.fn().mockImplementation(() => null);

      // Rendu du champ avec un type incorrect et un nom spécifique
      render(<Field type="wrong-type" name="test" />);

      // Récupération de l'élément champ par son testId
      const fieldElement = screen.getByTestId("field-testid");

      // Vérification que le type de l'élément champ est égal à "text"
      expect(fieldElement.type).toEqual("text");
    });
  });
});
