
import { useContext, useState, useLayoutEffect } from 'react';

import ErrorOverlay from '../../components/ui/ErrorOverlay';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { sortByLatest, sortByOldest } from '../../util/sorting';
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { fetchExpenses } from '../../util/http';

function AllExpenses() {
  
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  /*
    To use the context app-wide, we must provide it using 'useContext()' hook.
  */
  const expensesCtx = useContext(ExpensesContext);

  const [allExpenses, setAllExpenses] = useState([]);

  useLayoutEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
 
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
        setAllExpenses(sortByLatest(expenses));
      }
      catch(error) {
        setError('Could not fetch expenses!');
      }

      setIsFetching(false);
    }

    getExpenses();
  }, []);

  const [sortingUp, setSortingUp] = useState(true);


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

  /*************************************/
  /**************** GUI ****************/
  /*************************************/

  if(error && !isFetching) {
    return <ErrorOverlay message={error}/>
  }

  if(isFetching) {
    return <LoadingOverlay />
  }

  return (
    <ExpensesOutput expenses={allExpenses} sorting={sortingUp} expensesPeriod="Total" fallbackText="No expenses found" onPress={sortExpenses}/>
  )
}

export default AllExpenses;
