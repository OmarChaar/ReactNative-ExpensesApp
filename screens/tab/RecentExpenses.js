
import { StyleSheet } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react'
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../util/date';
import { sortByLatest } from '../../util/sorting';
import { fetchExpenses } from '../../util/http';

function RecentExpenses({navigation}) {

    const expensesCtx = useContext(ExpensesContext); 
    
    useLayoutEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpenses();
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
    })

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the past 7 days."/>
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});