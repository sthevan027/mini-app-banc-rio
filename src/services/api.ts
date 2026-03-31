import axios from "axios";
import type {
  AccountOverview,
  LoginPayload,
  TransferPayload,
  TransferResult,
  UserSession,
} from "../store/types";

const apiClient = axios.create({
  baseURL: "/mock-api",
  timeout: 1_000,
});

let mockDatabase: AccountOverview = {
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
    {
      id: "txn-002",
      title: "Transferencia recebida",
      counterparty: "Lucas Almeida",
      amount: 880,
      type: "credit",
      createdAt: "2026-03-30T13:20:00.000Z",
    },
    {
      id: "txn-001",
      title: "Compra no cartao",
      counterparty: "Mercado Centro",
      amount: 142.87,
      type: "debit",
      createdAt: "2026-03-29T09:12:00.000Z",
    },
  ],
};

function simulateRequest<T>(payload: T, delay = 650): Promise<T> {
  void apiClient.defaults.baseURL;

  return new Promise((resolve) => {
    window.setTimeout(() => resolve(structuredClone(payload)), delay);
  });
}

export async function loginRequest(
  payload: LoginPayload,
): Promise<UserSession> {
  const trimmedName = payload.name.trim();
  const trimmedEmail = payload.email.trim();

  if (!trimmedName || !trimmedEmail) {
    throw new Error("Preencha nome e email para continuar.");
  }

  return simulateRequest({
    id: "usr-banc-rio",
    name: trimmedName,
    email: trimmedEmail,
  });
}

export function fetchAccountOverview() {
  return simulateRequest(mockDatabase);
}

export async function transferFunds(
  payload: TransferPayload,
): Promise<TransferResult> {
  const amount = Number(payload.amount);

  if (amount > mockDatabase.balance) {
    throw new Error("Saldo insuficiente para concluir a transferencia.");
  }

  const transaction = {
    id: `txn-${Date.now()}`,
    title: payload.description,
    counterparty: payload.to.trim(),
    amount,
    type: "debit" as const,
    createdAt: new Date().toISOString(),
  };

  mockDatabase = {
    balance: Number((mockDatabase.balance - amount).toFixed(2)),
    transactions: [transaction, ...mockDatabase.transactions],
  };

  return simulateRequest(
    {
      balance: mockDatabase.balance,
      transaction,
    },
    900,
  );
}

export function resetMockDatabase() {
  mockDatabase = {
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
      {
        id: "txn-002",
        title: "Transferencia recebida",
        counterparty: "Lucas Almeida",
        amount: 880,
        type: "credit",
        createdAt: "2026-03-30T13:20:00.000Z",
      },
      {
        id: "txn-001",
        title: "Compra no cartao",
        counterparty: "Mercado Centro",
        amount: 142.87,
        type: "debit",
        createdAt: "2026-03-29T09:12:00.000Z",
      },
    ],
  };
}
