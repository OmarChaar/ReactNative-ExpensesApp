
import { useContext, useLayoutEffect, useState } from 'react'
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../util/date';
import { fetchExpenses } from '../../util/http';

function RecentExpenses({navigation}) {

    const [isFetching, setIsFetching] = useState(true);

    const expensesCtx = useContext(ExpensesContext); 
    
    useLayoutEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            const expenses = await fetchExpenses();
            setIsFetching(false);
            expensesCtx.setExpenses(expenses);
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

    if(isFetching) {
        return <LoadingOverlay />
    }

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the past 7 days."/>
    )
}

export default RecentExpenses;

