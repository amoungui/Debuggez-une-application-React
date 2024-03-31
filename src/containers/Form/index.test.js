// Importation des fonctions 'fireEvent', 'render', 'screen' et 'waitFor' depuis la bibliothèque '@testing-library/react'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Importation du composant 'Form' depuis le répertoire courant
import Form from "./index";

// Augmentation de la valeur du délai d'expiration pour Jest
jest.setTimeout(10000);

// Début de la description des tests pour le composant 'Form'
describe("When Events is created", () => {

  // Test spécifique pour vérifier qu'une liste de cartes d'événements est affichée
  it("a list of event card is displayed", async () => {

    // Rendu du composant 'Form'
    render(<Form />);

    // Attente de l'affichage des textes "Email", "Nom", "Prénom" et "Personel / Entreprise"
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  // Sous-groupe de tests pour le cas où un clic est déclenché sur le bouton de soumission
  describe("and a click is triggered on the submit button", () => {

    // Test spécifique pour vérifier qu'une action de succès est appelée
    it("the success action is called", async () => {

      // Création d'une fonction mock pour l'événement onSuccess
      const onSuccess = jest.fn();

      // Rendu du composant 'Form' avec l'événement onSuccess spécifique
      render(<Form onSuccess={onSuccess} />);

      // Déclenchement d'un événement de clic sur le bouton de soumission
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Attente de l'affichage du texte "En cours"
      await screen.findByText("En cours");

      // Attente de l'affichage du texte "Envoyer" avec un délai d'expiration de 8000 ms
      await waitFor(() => screen.findByText("Envoyer"), { timeout: 8000 });

      // Attente que l'événement onSuccess ait été appelé avec un délai d'expiration de 8000 ms
      await waitFor(() => expect(onSuccess).toHaveBeenCalled(), { timeout: 8000 });
    });
  });
});
