
import { useContext } from 'react';

import ExpensesOutput from '../../components/expenses/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';

function AllExpenses() {
  
  /*
    To use the context app-wide, we must provide it using 'useContext()' hook.
  */
  const expensesCtx = useContext(ExpensesContext);

  console.log("AllExpenses expensesContext", expensesCtx.expenses.length);

  return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No expenses found"/>
}

export default AllExpenses;
