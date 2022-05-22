
import { StyleSheet } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react'
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../util/date';
import { sortByLatest } from '../../util/sorting';

function RecentExpenses({navigation}) {

    const expensesCtx = useContext(ExpensesContext); 
    
    let recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    })

    const [displayed, setDisplayed] = useState(sortByLatest(recentExpenses));

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Week',
        })
    }, [navigation]);

    return (
        <ExpensesOutput expenses={displayed} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the past 7 days."/>
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});