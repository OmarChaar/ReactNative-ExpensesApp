
import { StyleSheet, Text, View } from 'react-native';
import { useContext, useLayoutEffect } from 'react'
import ExpensesOutput from '../../components/expenses/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../util/date';


function RecentExpenses({navigation}) {

    const expensesCtx = useContext(ExpensesContext); 
    
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Recent Expenses',
        })
    }, [navigation]);

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the past 7 days."/>
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});