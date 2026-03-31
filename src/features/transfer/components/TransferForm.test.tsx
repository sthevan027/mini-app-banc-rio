import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TransferForm } from "./TransferForm";
import { resetMockDatabase } from "../../../services/api";
import { useBankStore } from "../../../store/bank-store";
import { renderWithProviders } from "../../../test/render";

describe("TransferForm", () => {
  beforeEach(() => {
    resetMockDatabase();
    useBankStore.setState({
      balance: 12450.9,
      transactions: [
        {
          id: "txn-003",
          title: "Pagamento de conta",
          counterparty: "Concessionaria Rio Energia",
          amount: 320.45,
          type: "debit",
          createdAt: "2026-03-31T17:15:00.000Z",
        },
      ],
      hydrated: true,
    });
  });

  it("submits a transfer and updates the displayed balance", async () => {
    const user = userEvent.setup();

    renderWithProviders(<TransferForm />);

    await user.type(screen.getByLabelText("Destinatario"), "Marina Costa");
    await user.type(screen.getByLabelText("Valor"), "150");
    await user.type(screen.getByLabelText("Descricao"), "Reserva de viagem");
    await user.click(screen.getByRole("button", { name: "Transferir agora" }));

    expect(
      await screen.findByText(
        /Transferencia de R\$ 150,00 enviada para Marina Costa./i,
      ),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/12\.300,90/)).toBeInTheDocument();
    });
  });
});
