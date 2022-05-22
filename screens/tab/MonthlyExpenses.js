
import { StyleSheet } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react'
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../util/date';
import { sortByLatest } from '../../util/sorting';

function MonthlyExpenses({navigation}) {

    const expensesCtx = useContext(ExpensesContext); 
    
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const dateMonthAgo = getDateMinusDays(today, 30);

        return expense.date > dateMonthAgo;
    })

    const [displayed, setDisplayed] = useState(sortByLatest(recentExpenses));

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Month',
        })
    }, [navigation]);

    return (
        <ExpensesOutput expenses={displayed} expensesPeriod="Last Month" fallbackText="No expenses registered for the past month."/>
    )
}

export default MonthlyExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});