import { createContext } from "react";
import {
  Transaction,
  TransactionsService,
} from "../../services/TransactionsService";
import { IAppState } from "./AppState";

type ContextType = {
  state: IAppState;
  addTransaction: (transaction: Transaction) => void;
  setState: (state: IAppState) => void;
  transactionService: TransactionsService;
};

const AppContext: React.Context<ContextType> = createContext<ContextType>({
  state: {
    accountBalance: 0,
    currentAccount: "",
    ethPrice: 0,
    transactions: [],
  },
  addTransaction: () => {},
  setState: () => {},
  transactionService: new TransactionsService({ transactions: [] }),
});

export default AppContext;
