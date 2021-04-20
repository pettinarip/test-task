import { ChakraProvider } from "@chakra-ui/react";
import AppState, { IAppState } from "./context/background/AppState";
import constants, { IConstants } from "./utils/constants";
import Home from "./pages/home";
import { Transaction } from "./services/TransactionsService";
import theme from "./styles/theme";
import { fromString } from "./utils/date";

// This is just mock data for the demo
export function getInitialTransactions(
  constants: IConstants
): Array<Transaction> {
  return Object.keys(constants.pastTransactions).map<Transaction>(
    (key: string) => {
      const transaction = constants.pastTransactions[key];

      return {
        id: parseInt(key),
        to: transaction.recipient,
        from: constants.publicAddress,
        value: parseFloat(transaction.amount),
        date: fromString(transaction.date),
      };
    }
  );
}

export const initAppState: IAppState = {
  currentAccount: constants.publicAddress,
  accountBalance: constants.accountBalance,
  transactions: getInitialTransactions(constants),
  ethPrice: constants.ethPrice,
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AppState initAppState={initAppState}>
        <Home />
      </AppState>
    </ChakraProvider>
  );
};

export default App;
