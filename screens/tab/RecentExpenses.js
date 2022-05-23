
import { useContext, useLayoutEffect, useState, useEffect } from 'react'
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import ErrorOverlay from '../../components/ui/ErrorOverlay';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../util/date';
import { fetchExpenses } from '../../util/http';

function RecentExpenses({navigation, route}) {

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext); 

    useLayoutEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            // Using try/catch to handle any errors in http requests.
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
            title: 'Week',
        })
    }, [navigation]);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    });

    function errorHandler() {
        setError(null);
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
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the past 7 days."/>        
    )
}

export default RecentExpenses;

