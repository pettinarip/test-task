import { useContext, useEffect, useState } from "react";
import AppContext from "../context/background/AppContext";

function useGetTransactions() {
  const [loading, setLoading] = useState(false)
  const { state, setState, transactionService } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
      
    (async function () {
      const transactions = await transactionService.getListOfTransactions();
      setLoading(false)
      setState({ ...state, transactions });
    })();
  }, []);

  return {
    loading,
    transactions: state.transactions
  }
}

export default useGetTransactions;