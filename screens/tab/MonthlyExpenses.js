
import { StyleSheet } from 'react-native';
import { useContext, useLayoutEffect } from 'react'
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../util/date';

function MonthlyExpenses({navigation}) {

    const expensesCtx = useContext(ExpensesContext); 
    
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const dateMonthAgo = getDateMinusDays(today, 30);

        return expense.date > dateMonthAgo;
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Month',
        })
    }, [navigation]);

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