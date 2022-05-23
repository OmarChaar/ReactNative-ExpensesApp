
import { useContext, useState, useLayoutEffect, useLayout } from 'react';

import ErrorOverlay from '../../components/ui/ErrorOverlay';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { sortByLatest, sortByOldest } from '../../util/sorting';
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { fetchExpenses } from '../../util/http';
import IconButton from '../../components/ui/IconButton';
import { GlobalStyles } from '../../contants/styles';

function AllExpenses({navigation}) {
  
  const [isFetching, setIsFetching] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const [error, setError] = useState();

  const [isSearching, setIsSearching] = useState(false);

  /*
    To use the context app-wide, we must provide it using 'useContext()' hook.
  */
  const expensesCtx = useContext(ExpensesContext);

  const [allExpenses, setAllExpenses] = useState([]);

  useLayoutEffect(() => {
    if(!hasFetched) {
      async function getExpenses() {
        setIsFetching(true);
        try {
          const expenses = await fetchExpenses();
          setHasFetched(true);
          expensesCtx.setExpenses(expenses);
          setAllExpenses(sortByLatest(expenses));
        }
        catch(error) {
          setError('Could not fetch expenses!');
        }
        setIsFetching(false);
      }
      getExpenses();
    }


  navigation.setOptions({
    headerLeft: ({tintColor}) => <IconButton name="search"  size={20} color={isSearching ? GlobalStyles.colors.error500 : tintColor} onPress={setSearching}/>
  })

  }, [isSearching]); // 'isSearching' is added here to trigger a layout change when the value is changed.


  function setSearching() {
    setIsSearching(!isSearching)
  }

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
    <ExpensesOutput expenses={allExpenses} sorting={sortingUp} searching={isSearching} expensesPeriod="Total" fallbackText="No expenses found" onPress={sortExpenses}/>
  )
}

export default AllExpenses;
