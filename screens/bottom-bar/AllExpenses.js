
import { useContext } from 'react';

import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';

function AllExpenses() {
  
  /*
    To use the context app-wide, we must provide it using 'useContext()' hook.
  */
  const expensesCtx = useContext(ExpensesContext);

  return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No expenses found"/>
}

export default AllExpenses;
