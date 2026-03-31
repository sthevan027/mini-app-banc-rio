import { create } from "zustand";
import type { AccountOverview, TransferResult } from "./types";

type BankState = AccountOverview & {
  hydrated: boolean;
  setSnapshot: (snapshot: AccountOverview) => void;
  applyTransfer: (result: TransferResult) => void;
  reset: () => void;
};

const initialState: AccountOverview = {
  balance: 0,
  transactions: [],
};

export const useBankStore = create<BankState>((set) => ({
  ...initialState,
  hydrated: false,
  setSnapshot: (snapshot) =>
    set((state) =>
      state.hydrated &&
      state.balance === snapshot.balance &&
      state.transactions.length === snapshot.transactions.length
        ? state
        : {
            ...snapshot,
            hydrated: true,
          },
    ),
  applyTransfer: ({ balance, transaction }) =>
    set((state) => ({
      balance,
      hydrated: true,
      transactions: [transaction, ...state.transactions],
    })),
  reset: () =>
    set({
      ...initialState,
      hydrated: false,
    }),
}));
