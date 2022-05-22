
import { useContext, useState, useLayoutEffect } from 'react';

import { sortByLatest, sortByOldest } from '../../util/sorting';

import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';

function AllExpenses() {
  
  /*
    To use the context app-wide, we must provide it using 'useContext()' hook.
  */
  const expensesCtx = useContext(ExpensesContext);

  const [sortingUp, setSortingUp] = useState(true);

  const [displayed, setDisplayed] = useState(sortByLatest(expensesCtx.expenses));

  function sortExpenses() {
    if(sortingUp) {
      setDisplayed(sortByOldest(expensesCtx.expenses));
      setSortingUp(false);
    }
    else {
      setDisplayed(sortByLatest(expensesCtx.expenses));
      setSortingUp(true);
    }
  }

  return (
    <ExpensesOutput expenses={displayed} sorting={sortingUp} expensesPeriod="Total" fallbackText="No expenses found" onPress={sortExpenses}/>
  )
}

export default AllExpenses;
