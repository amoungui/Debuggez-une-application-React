// Importation des fonctions 'fireEvent', 'render', 'screen' et 'waitFor' depuis la bibliothèque '@testing-library/react'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Importation du composant 'Home' depuis le répertoire courant
import Home from "./index";

// Augmentation de la valeur du délai d'expiration pour Jest
jest.setTimeout(10000);

// Début de la description des tests pour le composant 'Form'
describe("When Form is created", () => {

  // Test spécifique pour vérifier qu'une liste de champs de carte est affichée
  it("a list of fields card is displayed", async () => {

    // Rendu du composant 'Home'
    render(<Home />);

    // Attente de l'affichage des textes "Email", "Nom", "Prénom" et "Personel / Entreprise"
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  // Sous-groupe de tests pour le cas où un clic est déclenché sur le bouton de soumission
  describe("and a click is triggered on the submit button", () => {

    // Test spécifique pour vérifier que le message de succès est affiché
    it("the success message is displayed", async () => {

      // Rendu du composant 'Home'
      render(<Home />);

      // Déclenchement d'un événement de clic sur le bouton de soumission
      fireEvent(
        await waitFor(() => screen.findByText("Envoyer"), { timeout: 8000 }),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Attente de l'affichage du texte "En cours"
      await screen.findByText("En cours");

      // Attente de l'affichage du texte "Message envoyé !" avec un délai d'expiration de 8000 ms
      await waitFor(() => screen.findByText("Message envoyé !"), { timeout: 8000 });
    });
  });
});
