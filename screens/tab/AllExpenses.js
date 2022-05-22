
import { useContext, useState, useLayoutEffect } from 'react';

import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { sortByLatest, sortByOldest } from '../../util/sorting';
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { fetchExpenses } from '../../util/http';

function AllExpenses() {
  
  const [isFetching, setIsFetching] = useState(true);

  /*
    To use the context app-wide, we must provide it using 'useContext()' hook.
  */
  const expensesCtx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
      setAllExpenses(expensesCtx.expenses);
    }

    getExpenses();
  }, []);

  const [sortingUp, setSortingUp] = useState(true);

  const [allExpenses, setAllExpenses] = useState([])

  function sortExpenses() {
    if(sortingUp) {
      setAllExpenses(sortByOldest(expensesCtx.expenses));
      setSortingUp(false);
    }
    else {
      setAllExpenses(sortByLatest(expensesCtx.expenses));
      setSortingUp(true);
    }
  }

  if(isFetching) {
    return <LoadingOverlay />
  }

  return (
    <ExpensesOutput expenses={allExpenses} sorting={sortingUp} expensesPeriod="Total" fallbackText="No expenses found" onPress={sortExpenses}/>
  )
}

export default AllExpenses;
