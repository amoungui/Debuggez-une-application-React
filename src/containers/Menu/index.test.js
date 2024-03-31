// Importation des fonctions 'fireEvent', 'render' et 'screen' depuis la bibliothèque '@testing-library/react'
import { fireEvent, render, screen } from "@testing-library/react";

// Importation du composant 'Menu' depuis le répertoire courant
import Menu from "./index";

// Début de la description des tests pour le composant 'Menu'
describe("When Menu is created", () => {

  // Test spécifique pour vérifier qu'une liste de liens obligatoires et le logo sont affichés
  it("a list of mandatories links and the logo are displayed", async () => {

    // Rendu du composant 'Menu'
    render(<Menu />);

    // Attente de l'affichage des textes "Nos services", "Nos réalisations", "Notre équipe" et "Contact"
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  // Sous-groupe de tests pour le cas où un clic est déclenché sur le bouton de contact
  describe("and a click is triggered on contact button", () => {

    // Test spécifique pour vérifier que l'emplacement du document change
    it("document location  href change", async () => {

      // Rendu du composant 'Menu'
      render(<Menu />);

      // Déclenchement d'un événement de clic sur l'élément avec le texte "Contact"
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Vérification que l'emplacement du document est égal à "#contact"
      expect(window.document.location.hash).toEqual("#contact");
    });
  });
});
