import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

jest.setTimeout(10000);  // Increase the timeout value

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await waitFor(() => screen.findByText("Envoyer"), { timeout: 8000 }),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => screen.findByText("Message envoyé !"), { timeout: 8000 });
    });
  });
});
