
import { StyleSheet } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react';
import ErrorOverlay from '../../components/ui/ErrorOverlay';

import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../util/date';
import { sortByLatest } from '../../util/sorting';
import { fetchExpenses } from '../../util/http';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

function YearlyExpenses({navigation}) {

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext); 
    
    useLayoutEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            }
            catch(error) {
                setError('Could not fetch expenses!');
            }
          
            setIsFetching(false);
        }

        getExpenses();

        navigation.setOptions({
            title: 'Year',
        })
    }, [navigation]);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const dateMonthAgo = getDateMinusDays(today, 365);

        return expense.date > dateMonthAgo;
    });

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
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last Year" fallbackText="No expenses registered for the past year."/>
    )
}

export default YearlyExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});