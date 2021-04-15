import { ReactNode, useEffect, useReducer } from "react";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import Actions from "../contextActions";
import {
  Transaction,
  TransactionsService,
} from "../../services/TransactionsService";

interface IProps {
  initAppState: IAppState;
  children: ReactNode;
}

export interface IAppState {
  currentAccount: string;
  accountBalance: number;
  transactions: Array<Transaction>;
  ethPrice: number;
}

const transactionService = new TransactionsService();

const AppState = (props: IProps) => {
  const [state, dispatch] = useReducer(AppReducer, props.initAppState);

  useEffect(() => {
    transactionService.init({ transactions: props.initAppState.transactions });
  }, [props.initAppState]);

  // Set app state
  const setState = (newState: IAppState) => {
    dispatch({
      type: Actions.SET_STATE,
      payload: newState,
    });
  };

  // TODO: Complete the addTransaction method
  const addTransaction = async (transaction: Transaction) => {
    const balance = state.accountBalance - transaction.value;
    setState({
      ...state,
      accountBalance: balance,
      transactions: [transaction, ...state.transactions],
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        addTransaction,
        transactionService,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
