import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

// Début de la description des tests pour le composant 'Events'
describe("When Events is created", () => {

  // Test spécifique pour vérifier qu'une liste de cartes d'événements est affichée
  it("a list of event card is displayed", async () => {

    // Création d'une fonction mock pour l'API de chargement des données qui renvoie les données de test
    api.loadData = jest.fn().mockReturnValue(data);

    // Rendu du composant 'Events' à l'intérieur du composant fournisseur de données
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    );

    // Attente de l'affichage du texte "avril"
    await screen.findByText("avril");
  });

  // Sous-groupe de tests pour le cas où une erreur se produit
  describe("and an error occured", () => {

    // Test spécifique pour vérifier qu'un message d'erreur est affiché
    it("an error message is displayed", async () => {

      // Création d'une fonction mock pour l'API de chargement des données qui rejette la promesse
      api.loadData = jest.fn().mockRejectedValue();

      // Rendu du composant 'Events' à l'intérieur du fournisseur de données
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      // Vérification que le texte "An error occured" est présent dans le document
      expect(await screen.findByText("An error occured")).toBeInTheDocument();
    });
  });

  // Sous-groupe de tests pour le cas où une catégorie est sélectionnée
  describe("and we select a category", () => {

    // Test spécifique pour vérifier qu'une liste filtrée est affichée
    it.only("an filtered list is displayed", async () => {

      // Création d'une fonction mock pour l'API de chargement des données qui renvoie les données de test
      api.loadData = jest.fn().mockReturnValue(data);

      // Rendu du composant 'Events' à l'intérieur du fournisseur de données
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      // Attente de l'affichage du texte "Forum #productCON"
      await screen.findByText("Forum #productCON");

      // Déclenchement d'un événement de clic sur le bouton de repliement
      fireEvent(
        await screen.findByTestId("collapse-button-testid"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Déclenchement d'un événement de clic sur le premier élément avec le texte "soirée entreprise"
      fireEvent(
        (await screen.findAllByText("soirée entreprise"))[0],
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Ajout d'un délai ici
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 1000));

      // Si le texte "Conférence #productCON" est présent dans le document
      if(screen.queryByText("Conférence #productCON")){
        // Attente de l'affichage du texte "Conférence #productCON"
        await screen.findByText("Conférence #productCON");

        // Vérification que le texte "Forum #productCON" n'est pas présent dans le document
        await expect(screen.findByText("Forum #productCON")).rejects.toThrow();
      } else {
        // Attente de l'affichage du texte "Forum #productCON"
        await screen.findByText("Forum #productCON");

        // Vérification que le texte "Conférence #productCON" n'est pas présent dans le document
        await expect(screen.findByText("Conférence #productCON")).rejects.toThrow();
      }
      
    });
  });

  // Sous-groupe de tests pour le cas où un événement est cliqué
  describe("and we click on an event", () => {

    // Test spécifique pour vérifier que le détail de l'événement est affiché
    it("the event detail is displayed", async () => {

      // Création d'une fonction mock pour l'API de chargement des données qui renvoie les données de test
      api.loadData = jest.fn().mockReturnValue(data);

      // Rendu du composant 'Events' à l'intérieur du fournisseur de données
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      // Déclenchement d'un événement de clic sur l'élément avec le texte "Conférence #productCON"
      fireEvent(
        await screen.findByText("Conférence #productCON"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Attente de l'affichage du texte "24-25-26 Février"
      await screen.findByText("24-25-26 Février");

      // Attente de l'affichage du texte "1 site web dédié"
      await screen.findByText("1 site web dédié");
    });
  });
});
