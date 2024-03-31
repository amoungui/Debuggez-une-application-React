/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
// Importation des fonctions 'fireEvent', 'render' et 'screen' depuis la bibliothèque '@testing-library/react'
import { fireEvent, render, screen } from "@testing-library/react";

// Importation du composant 'Modal' depuis le répertoire courant
import Modal from "./index";

// Début de la description des tests pour le composant 'Modal'
describe("When Modal data is created", () => {

  // Test spécifique pour vérifier qu'un contenu modal est affiché
  it("a modal content is display", () => {

    // Rendu du composant 'Modal' avec un contenu spécifique et ouvert
    render(
      <Modal opened Content={<div>modal content</div>}>
        {() => null}
      </Modal>
    );

    // Vérification que le texte "modal content" est présent dans le document
    expect(screen.getByText("modal content")).toBeInTheDocument();
  });

  // Sous-groupe de tests pour le cas où un clic est déclenché pour afficher le modal
  describe("and a click is triggered to display the modal", () => {

    // Test spécifique pour vérifier que le contenu du modal est affiché
    it("the content of modal is displayed", async () => {

      // Rendu du composant 'Modal' avec un contenu spécifique et un bouton pour ouvrir le modal
      render(
        <Modal Content={<div>modal content</div>}>
          {() => <button data-testid="open-modal" />}
        </Modal>
      );

      // Vérification que le texte "modal content" n'est pas présent dans le document
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();

      // Déclenchement d'un événement de clic sur le bouton pour ouvrir le modal
      fireEvent(
        screen.getByTestId("open-modal"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
    });
  });

  // Sous-groupe de tests pour le cas où un clic est déclenché sur le bouton de fermeture du modal
  describe("and a click is triggered to the close button modal", () => {

    // Test spécifique pour vérifier que le contenu du modal est caché
    it("the content of the modal is hide", async () => {

      // Rendu du composant 'Modal' avec un contenu spécifique et ouvert
      render(
        <Modal opened Content={<div>modal content</div>}>
          {() => null}
        </Modal>
      );

      // Vérification que le texte "modal content" est présent dans le document
      expect(screen.getByText("modal content")).toBeInTheDocument();

      // Déclenchement d'un événement de clic sur le bouton de fermeture du modal
      fireEvent(
        screen.getByTestId("close-modal"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Vérification que le texte "modal content" n'est pas présent dans le document
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
    });
  });
});
