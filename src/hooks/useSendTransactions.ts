import { useContext, useState } from "react";
import AppContext from "../context/background/AppContext";
import { Transaction } from "../services/TransactionsService";
import { formatDate } from "../utils/date";

function useSendTransactions() {
  const { state, addTransaction, transactionService } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  async function sendTransaction(to: string, value: number): Promise<Transaction> {
    setLoading(true);
    const newTransaction: Transaction = {
      id: state.transactions.length,
      value,
      to,
      from: state.currentAccount,
      date: new Date(),
    }
    await transactionService.addTransaction(newTransaction);
    addTransaction(newTransaction)
    setLoading(false);

    return newTransaction
  }

  return { loading, sendTransaction };
}

export default useSendTransactions;
