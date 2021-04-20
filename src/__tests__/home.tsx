import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AppState, { IAppState } from "../context/background/AppState";
import Home from "../pages/home";

const baseAppState: IAppState = {
  accountBalance: 1000,
  currentAccount: "loooongaddressssss",
  ethPrice: 2,
  transactions: [
    {
      id: 1,
      to: "test",
      from: "test",
      value: 1,
      date: new Date("2021-01-01 00:00"),
    },
    {
      id: 2,
      to: "test",
      from: "loooongaddressssss",
      value: 2,
      date: new Date("2021-01-01 00:01"),
    },
  ],
};

function renderHome(appState?: Partial<IAppState>) {
  return render(
    <AppState initAppState={{ ...baseAppState, ...appState }}>
      <Home />
    </AppState>
  );
}

/**
 * Integration tests of the complete flow
 */
it("can send a new transaction", async () => {
  renderHome();

  // click on Send
  fireEvent.click(screen.getByTestId(/send-button/));

  await waitFor(() => screen.getByRole("dialog"));

  // Fill the required fields
  const toInput = screen.getByLabelText(/add recipient/i);
  await waitFor(() => {
    fireEvent.change(toInput, {
      target: { value: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    });
  });

  const amountInput = screen.getByLabelText(/amount to transfer/i);
  await waitFor(() => {
    fireEvent.change(amountInput, { target: { value: "30" } });
  });

  // click on Next
  await waitFor(() => {
    fireEvent.click(screen.getByTestId(/next-button/i));
  });

  await screen.findByText(/done/i);

  // close the modal
  fireEvent.click(screen.getByText(/done/i));

  // finally, lets check if there is a new transaction on the list
  expect(screen.getByText("-30 ETH")).toBeInTheDocument();

  // ...and that the balance is correct
  expect(screen.getByText("970 ETH")).toBeInTheDocument();
});
