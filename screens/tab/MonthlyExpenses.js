
import { StyleSheet } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react'

import LoadingOverlay from '../../components/ui/LoadingOverlay';
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../util/date';
import { fetchExpenses } from '../../util/http';

function MonthlyExpenses({navigation}) {

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
            title: 'Month',
        })
    }, [navigation]);
    
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const dateMonthAgo = getDateMinusDays(today, 30);

        return expense.date > dateMonthAgo;
    });

    if(isFetching) {
        return <LoadingOverlay />
    }

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last Month" fallbackText="No expenses registered for the past month."/>
    )
}

export default MonthlyExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});