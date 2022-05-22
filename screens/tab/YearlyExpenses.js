
import { StyleSheet } from 'react-native';
import { useContext, useLayoutEffect } from 'react'
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../util/date';

function YearlyExpenses({navigation}) {

    const expensesCtx = useContext(ExpensesContext); 
    
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const dateMonthAgo = getDateMinusDays(today, 365);

        return expense.date > dateMonthAgo;
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Year',
        })
    }, [navigation]);

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