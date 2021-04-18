import { ChakraProvider } from "@chakra-ui/react";
import AppState, { IAppState } from "./context/background/AppState";
import constants from "./utils/constants";
import Home from "./pages/home";
import { Transaction } from "./services/TransactionsService";

// This is just mock data for the demo
function getInitialTransactions(): Array<Transaction> {
  return Object.keys(constants.pastTransactions).map<Transaction>(
    (key: string) => {
      const transaction = constants.pastTransactions[key];

      return {
        id: parseInt(key),
        to: transaction.recipient,
        from: constants.publicAddress,
        value: parseFloat(transaction.amount),
        date: new Date(transaction.date),
      };
    }
  );
}

export const initAppState: IAppState = {
  currentAccount: constants.publicAddress,
  accountBalance: constants.accountBalance,
  transactions: getInitialTransactions(),
  ethPrice: constants.ethPrice,
};

const App = () => {
  return (
    <ChakraProvider>
      <AppState initAppState={initAppState}>
        <Home />
      </AppState>
    </ChakraProvider>
  );
};

export default App;
